// let { courses } = require("../data/courses");
const { validationResult } = require("express-validator");
const Course = require("../models/course_model");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");


const getAllCourses =asyncWrapper( async (req, res) => {
  const query = req.query;
  // console.log("query", query) // => (limit=??,page=??)
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  // get all courses from DB using course Model
  const courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: { courses } });
})

const getSingleCourse = asyncWrapper(async (req, res, next) => {
  // const courseId = +req.params.courseId;
  // const course = courses.find((course) => course.id === courseId);

  const course = await Course.findById(req.params.courseId);
  if (!course) {
    const error = appError.create("not found course", 404, httpStatusText.FAIL);
    return next(error);
    // return res.status(404).json({status:httpStatusText.FAIL,data:{course:null}});
  }
  res.json({ status: httpStatusText.SUCCESS, data: { course } });

  // try {
  //   const course = await Course.findById(req.params.courseId);
  //   if (!course) {
  //     return res.status(404).json({status:httpStatusText.FAIL,data:{course:null}});
  //   }
  //   res.json({status:httpStatusText.SUCCESS,data:{course}});
  // } catch (err) {
  //   return res.status(400).json({status:httpStatusText.ERROR,data:null,message:err.message,code :400});
  // }
});

const addCourse = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
  const error=appError.create(errors.array(),400,httpStatusText.FAIL)
    return next(error);
    // return res
    //   .status(400)
    //   .json({ status: httpStatusText.FAIL, data: errors.array() });
  }

  // console.log("errors", errors);

  // if(!req.body.title){
  //     return res.status(400).json({error:'title not provided'})
  // }
  // if(!req.body.price){
  //     return res.status(400).json({error:'price not provided'})
  // }

  // courses.push({ id: courses.length + 1, ...req.body });

  // const course = { id: courses.length + 1, ...req.body };
  // courses.push(course);

  const newCourse = new Course(req.body);

  await newCourse.save();

  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { course: newCourse } });
});

const updateCourse = asyncWrapper(async (req, res) => {
  const courseId = req.params.courseId;
  // let course = courses.find((course) => course.id === courseId);
  const updateCourse = await Course.findByIdAndUpdate(courseId, {$set: { ...req.body }});
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { course: updateCourse } })
 
    // try {
  //   const updateCourse = await Course.findByIdAndUpdate(courseId, {
  //     $set: { ...req.body },
  //   });
  //   return res
  //     .status(200)
  //     .json({ status: httpStatusText.SUCCESS, data: { course: updateCourse } });
  // } catch (e) {
  //   return res
  //     .status(400)
  //     .json({ status: httpStatusText.ERROR, message: e.message });
  // }
  
  // if (!course) {
  //   return res.status(404).json({ msg: "course not found" });
  // }
  // course = { ...course, ...req.body };
})

const deleteCourse =asyncWrapper( async (req, res) => {
  // const courseId = +req.params.courseId;

  // courses = courses.filter((course) => course.id !== courseId);

  await Course.deleteOne({ _id: req.params.courseId });

  res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
})

module.exports = {
  getAllCourses,
  getSingleCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
