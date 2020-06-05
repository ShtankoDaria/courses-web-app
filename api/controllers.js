"use strict";

const fs = require("fs");
const path = require("path");
const Joi = require("joi");

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);
const contents = await readFilePromise(DATA_DIR, "utf8");
const courses = JSON.parse(contents);

const config = require("../config");
const DATA_DIR = path.join(__dirname, "/..", config.DATA_DIR, "/courses.json");

const controllers = {
  hello: (req, res) => {
    res.json({ api: "courses!" });
  },

  getCourses: (req, res) => {
    res.send(courses);
  },

  postCourse: async (req, res) => {
    try {
      const course = {
        id: courses.length + 1,
        name: req.body.name,
      };
      courses.push(course);
      res.send(course);
    } catch (err) {
      // const { error } = validateCourse(req.body); //result.error
      if (err) return res.status(400).send(err.details[0].message);
    }
  },
  getCourse: async (req, res) => {
    try {
      const course = courses.find((c) => c.id === parseInt(req.params.id));
      res.send(course);
    } catch (err) {
      if (!course)
        return res
          .status(404)
          .send("The course with the given ID was not found");
      console.error(err);
    }
  },

  changeCourse: async (req, res) => {
    try {
      //update course
      course.name = req.body.name;
      //return the updated course
      res.send(course);
    } catch (err) {
      // look up the course
      //if not return 404
      const course = courses.find((c) => c.id === parseInt(req.params.id));
      if (!course)
        return res
          .status(404)
          .send("The course with the given ID was not found");
      res.send(course);
      console.error(err);
      //validate
      //if invalid, return 400
      // const { error } = validateCourse(req.body); //result.error
      if (err) return res.status(400).send(err.details[0].message);
    }
    console.error(error);
  },
  deleteCourse: async (req, res) => {
    try {
      const course = courses.find((c) => c.id === parseInt(req.params.id));
      const index = courses.indexOf(course);
      courses.splice(index, 1);

      res.send(courses);
    } catch (error) {
      if (!course)
        return res
          .status(404)
          .send("The course with the given ID was not found");
      res.send(course);
    }
  },
};

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
}

module.exports = controllers;
