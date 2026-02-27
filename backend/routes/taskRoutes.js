const express = require("express");
const router = express.Router();
const controller = require("../controllers/taskController");
const { checkAdmin } = require("../middleware/roleMiddleware");

router.post("/tasks", checkAdmin, controller.createTask);
router.get("/tasks", controller.getTasks);
router.put("/tasks/:id", checkAdmin, controller.updateTask);
router.delete("/tasks/:id", checkAdmin, controller.deleteTask);

module.exports = router;