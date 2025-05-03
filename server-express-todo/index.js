const express = require('express');
const app = express();
const cors = require('cors');

// роуты для задач
const getTasksRouter = require('./routes-for-tasks/getTasks');
const addTasksRouter = require('./routes-for-tasks/addTask');
const editTaskRouter = require('./routes-for-tasks/editTask');
const isdoneTaskRouter = require('./routes-for-tasks/isdoneTask');
const delTaskRouter = require('./routes-for-tasks/delTask');

// роуты для юзеров
const getUsersRouter = require('./routes-for-users/getUsers');
const signUpRouter = require('./routes-for-users/signUp');
const signInRouter = require('./routes-for-users/signIn');
const delUsersRouter = require('./routes-for-users/delUsers');

app.use(cors());

//Users
//получить всех users
app.use('/', getUsersRouter)
// добавит юзера при регистрации
app.use('/', signUpRouter);
// Проверка юзера при входе
app.use('/', signInRouter);
// Удалить всех юзеров
app.use('/', delUsersRouter);

//Tasks
// получить все записи по id
app.use('/', getTasksRouter);
// добавить задачу
app.use('/', addTasksRouter);
// редактировать текст задачи по id
app.use('/', editTaskRouter);
// отметить задачу выполненной по id
app.use('/', isdoneTaskRouter);
// удалить задачу по id
app.use('/', delTaskRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server has started on PORT: ${PORT}`)
});