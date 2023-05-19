import Joi from "joi";

export function validateCreateHaji(body) {
  const schema = Joi.object({
    fullName: Joi.string().required(),
    passportNumber: Joi.string().required(),
    gender: Joi.string().valid("male", "female", "other"),
    totalPayableAmount: Joi.number(),
    amountPaid: Joi.number()
      .less(Joi.ref("totalPayableAmount"))
      .message("Amount paid cannot be greater than total payable amount."),
    image: Joi.string(),
    packageId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required(),
    contactNumber: Joi.string()
      .regex(/^03[0-9]{9}$/)
      .required()
      .messages({
        "string.base": `Contact number should be a string`,
        "string.empty": `Contact number cannot be empty`,
        "string.pattern.base": `Contact number should be a valid Pakistani mobile number, i.e. 03XXXXXXXXX`,
        "any.required": `Contact number is a required field`,
      }),
  });
  return schema.validate(body);
}

export function validatePayment(body) {
  const schema = Joi.object({
    payment: Joi.string().required(),
  });
  return schema.validate(body);
}

export function validateEditHajiInfo(body) {
  const schema = Joi.object({
    fullName: Joi.string(),
    passportNumber: Joi.string(),
    contactNumber: Joi.string()
      .regex(/^03[0-9]{9}$/)
      .message(
        "Contact number should be a valid Pakistani mobile number, i.e. 03XXXXXXXXX"
      ),
    gender: Joi.string().valid("male", "female", "other"),
  });
  return schema.validate(body);
}
