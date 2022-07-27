const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
router.get("/tasks", (req, res) => {
  Task.find({})
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((e) => {
      res.status(500).send();
    }); //fetch all tasks in database
});

router.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;
  Task.findById(_id)
    .then((task) => {
      if (!task) {
        return res.status(404).send();
      }
      res.send(task);
    })
    .catch((e) => {
      res.status(500).send();
    });
});

router.post("/tasks", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then(() => {
      res.status(201).send(task);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates!" });
  }
  try {
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   runValidators: true,
    //   new: true,
    // });
    const task = await Task.findById(req.params.id);
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    if (!task) {
      return res.status(404).send(); //when task with that id does not exist hence cannot be deleted
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    return res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});
module.exports = router;
