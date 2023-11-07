const express = require("express");

const router = express.Router();

const courseController = require("../controllers/courses_controller");

const { validationSchema } = require("../middlewares/validationSchema");

const verifyToken =require('../middlewares/verifyToken');
const userRoles = require("../utils/userRoles");
const allowedTo = require("../middlewares/allowedTo");


router
  .route("/")
  .get(courseController.getAllCourses)
  .post(verifyToken,allowedTo(userRoles.MANGER),validationSchema(), courseController.addCourse);

router
  .route("/:courseId")
  .get(courseController.getSingleCourse)
  .patch(courseController.updateCourse)
  .delete(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANGER), courseController.deleteCourse);

module.exports = router;
