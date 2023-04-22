const express = require("express");
const Todo = require("./models/Todo");
const router = express.Router();

function success(res, payload) {
  return res.status(200).json(payload);
}

//getting all todos
router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find({});
    return success(res, todos);
  } catch (err) {
    console.error(err);
    next({ status: 400, message: "failed to get todos" });
  }
});

//adding a new todo
router.post("/todos", async (req, res, next) => {
  try {
    const todo = await Todo.create(req.body);
    return success(res, todo);
  } catch (err) {
    console.error(err);
    next({ status: 400, message: "failed to create todo" });
  }
});

//updating a todo with the matching id
router.put("/todos/:id", async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return success(res, todo);
  } catch (err) {
    console.error(err);
    next({ status: 400, message: "failed to update todo" });
  }
});

//deleting a todo with matching id
router.delete("/todos/:id", async (req, res, next) => {
  try {
    await Todo.findByIdAndRemove(req.params.id);
    return success(res, "todo deleted!");
  } catch (err) {
    console.error(err);
    next({ status: 400, message: "failed to delete todo" });
  }
});

module.exports = router;
