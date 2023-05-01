import joi from "joi";
import { Types } from "mongoose";
const checkObjectId = (value, helper) => {
  return Types.ObjectId.isValid(value)
    ? true
    : helper.message("Invalid ObjectId");
};
export const generalFields = {
  name: joi.string().required(),
  description: joi.string().required(),
  id: joi.string().custom(checkObjectId).required(),
  gender:joi.string().valid('male','female'),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: joi
    .string()
    .pattern(/^\w{8,}$/)
    .messages({ "string.pattern.base": "Password length should be atleast 8" })
    .required(),
  confirmPassword: joi
    .string()
    .required()
    .messages({ "any.only": "confirm password not matching new password" }),
  age: joi.number().integer().required(),
  phone: joi
    .string()
    .pattern(/^(\+2)?01[0125][0-9]{8}$/)
    .messages({ "string.pattern.base": "please Enter a valid phone Number" }),
  token: joi
    .string()
    .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
    .required()
    .messages({ "string.pattern.base": "Invalid Token" }),
  otp: joi
    .string()
    .alphanum()
    .length(8)
    .required()
    .messages({ "string.length": "Invalid OTP code" }),
  file: joi.object({
    fieldname:joi.string().alphanum().required(),
    originalname:joi.string().regex(/^[^\\\/:*?"<>|]+$/).required(),
    encoding:joi.string().required(),
    mimetype:joi.string().required(),
    destination:joi.string().required(),
    filename:joi.string().required(),
    path:joi.string().required(),
    size:joi.number().required()
  }),
};
