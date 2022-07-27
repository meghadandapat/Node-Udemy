require("../src/db/mongoose");
const Task = require("../src/models/task");

Task.findByIdAndDelete("61f683d377de4a372ebb265b")
  .then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });

const deleteAndCount = async (id, completed) => {
  await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed });
  return count;
};
deleteAndCount("61f683d377de4a372ebb265b", true)
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
