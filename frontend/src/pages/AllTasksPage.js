import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";

const AllTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch all tasks
  const getAllTasks = async () => {
    try {
      const res = await axios.get("/tasks"); // backend route
      if (res.data.success) {
        setTasks(res.data.tasks);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <Layout title="All Tasks">
      <div className="tasks-container">
        <h1 className="tasks-title">All Tasks</h1>

        {loading ? (
          <p className="loading">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="no-task">No tasks found</p>
        ) : (
          <div className="tasks-grid">
            {tasks.map((task) => (
              <div className="task-card" key={task._id}>
                <h3 className="task-title">{task.title}</h3>
                <p className="task-desc">{task.description}</p>

                <span
                  className={`task-status ${
                    task.status === "completed"
                      ? "completed"
                      : task.status === "in-progress"
                        ? "progress"
                        : "pending"
                  }`}
                >
                  {task.status}
                </span>

                <p className="task-date">
                  {new Date(task.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AllTasksPage;
