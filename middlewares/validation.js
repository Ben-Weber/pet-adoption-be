const Ajv = require("ajv").default;
const ajv = new Ajv();
const S = require("fluent-json-schema");

const validationMid = (schema) => {
  return (req, res, next) => {
    try {
      const validate = ajv.compile(schema);
      const valid = validate(req.body);
      if (!valid) {
        throw new Error("schema - invalid input");
      }
      next();
    } catch (error) {
      console.log("error here");
      res.status(400).send(error.message);
    }
  };
};
exports.validationMid = validationMid;

const usersSchemaLogin = S.object()
  .prop("email", S.string().required())
  .prop("password", S.string().minLength(6).maxLength(20).required())
  .valueOf();
exports.usersSchemaLogin = usersSchemaLogin;

const usersSchemaSignUp = S.object()
  .prop("firstName", S.string().required())
  .prop("lastName", S.string().required())
  .prop("email", S.string().required())
  .prop("password", S.string().minLength(6).maxLength(20).required())
  .prop("phone", S.number())
  .valueOf();
exports.usersSchemaSignUp = usersSchemaSignUp;