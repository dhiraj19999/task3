import Project from "../models/projectModel.js";

const createProject = async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }

    try {
        const project = new Project({
            user: req.user._id,
            name,
            description,
        });

        const createdProject = await project.save();

        res.status(201).json(createdProject);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ user: req.user._id }).populate("user", "name email");

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

const getProjectById = async (req, res) => {

    const { id } = req.params;

    try {

        const project = await Project.findById(id)

          

            .populate("user", "name email");

        if (!project) {

            return res.status(404).json({ message: "Project not found" });

        }

       
        res.status(200).json(project);


    } catch (error) {


        res.status(500).json({ message: "Server error" });


    }


}



export  { createProject, getProjects, getProjectById};