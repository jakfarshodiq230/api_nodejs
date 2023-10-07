const router = require('express').Router();
const activity = require('../controller/article-controller');
const todos = require('../controller/todos-controller');


router.get("/activity-groups", activity.getActivity ); //sudah ok
router.post("/activity-groups", activity.addActivity ); // sudah ok
router.patch("/activity-groups/:id", activity.updateActivity ); //sudah ok
router.get("/activity-groups/:id", activity.getActivityByID ); //sudah ok
router.delete("/activity-groups/:id", activity.deleteActivity ); // sudah ok

// todos
router.get("/todo-items", todos.getTodos ); //sudah ok
router.post("/todo-groups", todos.addTodos ); // sudah ok
router.patch("/todo-groups/:id", todos.updateTodos ); //sudah ok
router.get("/todo-groups/:id", todos.getTodosByID ); //sudah ok
router.delete("/todo-groups/:id", todos.deleteTodos ); // sudah ok

module.exports = router;