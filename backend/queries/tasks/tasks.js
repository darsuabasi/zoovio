const db = require("../../database/index");
const { error } = require("console");

const getAllTasksByPet = async (req, res, next) => {
  try {
    const { id } = req.params;
    let tasks = await db.any(
      `SELECT tasks.*, pets.* FROM tasks LEFT JOIN pets ON tasks.pet_id = pets.id`,
      [id]
    );
    res.status(200).json({
      status: "Success",
      message: "Selected All Tasks for Pet",
      payload: {
        pet: id,
        tasks,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: "Did not select all tasks for pet",
    });
    next(err);
  }
};

const createNewTask = async (req, res, next) => {
  const { pet_id, task, due_date, due_time, dueTime } = req.body;

  try {
    let newTask = await db.none(
      `INSERT INTO tasks(pet_id, task, due_date, due_time,dueTime) VALUES($1, $2, $3, $4, $5)`,
      [pet_id, task, due_date, due_time, dueTime]
    );
    res.status(200).json({
      status: "Success",
      message: "Created new task",
      payload: {
        newTask,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Error",
      message: "Did not create new task",
    });
  }
};

const getAllTasksByUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    let tasks = await db.any(
      `SELECT tasks.*, pets.pet_name, users.* 
      FROM tasks
      LEFT JOIN pets 
      ON  pets.id = tasks.pet_id
      LEFT JOIN users
      ON users.user_id = owner
      WHERE users.user_id =$1
      ORDER BY due_time asc`,
      [id]
    );
    res.status(200).json({
      status: "Success",
      message: "Selected All Tasks by User",
      payload: {
        tasks,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: "Did not select all tasks by user",
    });
    next(error);
  }
};

const getAllTasksByMonth = async (req, res, next) => {
  try {
    const { month } = req.params;
    const { user, year } = req.query;

    let tasks = await db.any(
      `SELECT tasks.*, pets.pet_name, users.* 
      FROM tasks
      LEFT JOIN pets 
      ON  pets.id = tasks.pet_id
      LEFT JOIN users
      ON users.user_id = owner
      WHERE EXTRACT(MONTH FROM due_date) = $1 AND owner = $2 AND EXTRACT(YEAR FROM due_date) = $3`,
      [month, user, year]
    );
    res.status(200).json({
      status: "Success",
      message: "Selected All Tasks For this Month",
      tasks,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: "Did not select all tasks for this month",
    });
    console.log(error);
  }
};

const getAllTasksByDay = async (req, res, next) => {
  try {
    const { day } = req.params;
    const { user, month, year } = req.query;

    let tasks = await db.any(
      `SELECT tasks.*, pets.pet_name, users.* 
      FROM tasks
      LEFT JOIN pets 
      ON  pets.id = tasks.pet_id
      LEFT JOIN users
      ON users.user_id = owner WHERE EXTRACT(DAY FROM due_date) = $1 AND owner = $2 AND EXTRACT(MONTH FROM due_date) = $3 AND EXTRACT(YEAR FROM due_date) = $4
      ORDER BY due_time asc `,
      [day, user, month, year]
    );
    res.status(200).json({
      status: "Success",
      message: "Selected All Tasks For this Day",
      tasks,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: "Did not select all tasks for this day",
    });
    console.log(error);
  }
};

module.exports = {
  getAllTasksByPet,
  createNewTask,
  getAllTasksByUser,
  getAllTasksByMonth,
  getAllTasksByDay,
};
