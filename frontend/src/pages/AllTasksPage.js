import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../context/auth";

const AllTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [auth] = useAuth(); // 👈 get user + role

  const getAllTasks = async () => {
    try {
      const res = await axios.get("/tasks");
      if (res.data.success) {
        setTasks(res.data.tasks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  // DELETE TASK
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`, {
        headers: {
          Authorization: auth?.token, // ✅ NO "Bearer"
        },
      });
      getAllTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT TASK
  const handleEdit = async (task) => {
    const newTitle = prompt("Enter new title", task.title);
    const newDescription = prompt("Enter new description", task.description);

    const newStatus = prompt(
      "Enter status (pending / in-progress / completed)",
      task.status,
    )?.toLowerCase();

    // ❌ cancel or empty
    if (!newTitle || !newDescription || !newStatus) return;

    // ❌ invalid status
    const allowedStatus = ["pending", "in-progress", "completed"];
    if (!allowedStatus.includes(newStatus)) {
      alert("Status must be: pending, in-progress, or completed");
      return;
    }

    try {
      await axios.put(
        `/tasks/${task._id}`,
        {
          title: newTitle,
          description: newDescription,
          status: newStatus,
        },
        {
          headers: {
            Authorization: auth?.token, // ✅ matches your middleware
          },
        },
      );

      getAllTasks(); // refresh list
    } catch (error) {
      console.log(error);
    }
  };

  // ADD NEW TASK
  const handleAddTask = async () => {
    const title = prompt("Enter task title");
    const description = prompt("Enter task description");
    const status = prompt(
      "Enter status (pending / in-progress / completed)",
      "pending",
    )?.toLowerCase();

    // ❌ cancel or empty
    if (!title || !description || !status) return;

    // ❌ invalid status
    const allowedStatus = ["pending", "in-progress", "completed"];
    if (!allowedStatus.includes(status)) {
      alert("Status must be: pending, in-progress, or completed");
      return;
    }

    try {
      await axios.post(
        "/tasks",
        {
          title,
          description,
          status,
        },
        {
          headers: {
            Authorization: auth?.token, // ✅ matches your middleware
          },
        },
      );

      getAllTasks(); // refresh list
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="All Tasks">
      <div className="tasks-container">
        <h1>All Tasks</h1>

        {/* ✅ ADMIN ONLY: ADD TASK BUTTON */}
        {auth?.user?.role === 1 && (
          <button className="add-task-btn" onClick={handleAddTask}>
            + Add New Task
          </button>
        )}

        <div className="tasks-grid">
          {tasks.map((task) => (
            <div className="task-card" key={task._id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>

              <span className={`status ${task.status}`}>{task.status}</span>

              {/* ✅ ADMIN ONLY: EDIT & DELETE */}
              {auth?.user?.role === 1 && (
                <div className="task-actions">
                  <button className="edit-btn" onClick={() => handleEdit(task)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AllTasksPage;
