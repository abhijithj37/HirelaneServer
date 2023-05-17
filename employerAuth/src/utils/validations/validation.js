
const {validationResult}=require('express-validator')

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorObject = {};
      errors.array().forEach((error) => {
        errorObject[error.param] = error.msg;
      });
      return res.status(422).json({ errors: errorObject });
    }
    next();
  };

  module.exports={validate}