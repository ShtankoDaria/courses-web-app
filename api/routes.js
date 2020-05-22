const controllers = require("./controllers.js");
const express = require("express");

const router = express.Router();

router.get("/", controllers.hello);

// write your routes
router.get("/courses", controllers.getCourses);

router.get("/courses/:id", controllers.getCourse);

router.post("/courses", controllers.postCourse);

router.put("/courses/:id", controllers.changeCourse);

router.delete("/courses/:id", controllers.deleteCourse);

module.exports = router;
