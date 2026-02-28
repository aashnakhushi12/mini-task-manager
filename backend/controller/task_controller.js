import task_model from "../model/task_model.js";


export const taskController = async(req, res) => {
    try {
        const {title, description, status, createdAt} = req.body
        //validations
        if(!title){
            return res.send({error: 'Title is Required'})
        }
        if(!description){
            return res.send({error: 'Description is Required'})
        }  
     
        //save
        const task = await new task_model({title, description, status, createdAt}).save()
        res.status(201).send({
            success: true,
            message: 'Task Created Successfully',
            task
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Task Creation',
            error: error.message
        })
    }
};


export const getAllTasksController = async (req, res) => {
  try {
    const tasks = await task_model.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      message: "All tasks fetched successfully",
      tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while fetching tasks",
      error: error.message,
    });
  }
};



export const updateTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    // validation
    if (!title && !description && !status) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required to update",
      });
    }

    // update task
    const updatedTask = await task_model.findByIdAndUpdate(
      id,
      {
        ...(title && { title }),
        ...(description && { description }),
        ...(status && { status }),
      },
      {
        new: true,          // return updated document
        runValidators: true // apply schema validation
      }
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while updating task",
      error: error.message,
    });
  }
};


export const deleteTaskController = async (req, res) => {
  try {
    const { id } = req.params;

    // validate id
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Task ID is required",
      });
    }

    // delete task
    const deletedTask = await task_model.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      task: deletedTask,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while deleting task",
      error: error.message,
    });
  }
};