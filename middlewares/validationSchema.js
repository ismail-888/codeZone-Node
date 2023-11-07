const { body } = require("express-validator");

const validationSchema = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("title is require")
      .isLength({ min: 2 })
      .withMessage("title at least is 2 digits"),
    body("price")
      .notEmpty()
      .withMessage("price is require")
      .isLength({ min: 3 })
      .withMessage("price at least is 3 digits"),
  ];
};

module.exports = {
  validationSchema,
};
