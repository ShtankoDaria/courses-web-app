"use strict";

const fs = require("fs");
const path = require("path");
const Joi = require("joi");

const config = require("../config");
const DATA_DIR = path.join(__dirname, "/..", config.DATA_DIR, "/courses.json");

const controllers = {
  hello: (req, res) => {
    res.json({ api: "courses!" });
  },

  getCourses: async (req, res) => {
    try {
      res.send(courses);
    } catch (error) {
      console.log(err);
    }
  },

  postCourse: async (req, res) => {
    try {
      const course = {
        id: courses.length + 1,
        name: req.body.name,
      };
      courses.push(course);
      res.send(course);
    } catch (error) {
      const { error } = validateCourse(req.body); //result.error
      if (error) return res.status(400).send(error.details[0].message);
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
    } catch (error) {
      // look up the course
      //if not return 404
      const course = courses.find((c) => c.id === parseInt(req.params.id));
      if (!course)
        return res
          .status(404)
          .send("The course with the given ID was not found");
      res.send(course);
      console.error(error);
      //validate
      //if invalid, return 400
      const { error } = validateCourse(req.body); //result.error
      if (error) return res.status(400).send(error.details[0].message);
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
