import Joi from "joi";

const categorySchema = Joi.object({
  name: Joi.string().required(),
  amountPkr: Joi.number().optional(),
});

const singlePackageDetailSchema = Joi.object({
  dayNumber: Joi.number().required(),
  dateAD: Joi.string().required(),
  dateHijri: Joi.string().required(),
  transferTo: Joi.string().required(),
  city: Joi.string().required(),
  hotelName: Joi.string().required(),
});

const extraPaymentsSchema = Joi.object({
  label: Joi.string().required(),
  amount: Joi.string().required(),
});

export function validateCreatePackage(body) {
  const schema = Joi.object({
    name: Joi.string().required(),
    startDate: Joi.date().optional(),
    endDate: Joi.date().optional(),
    category: Joi.array().items(categorySchema).required(),
    singlePackageDetails: Joi.array()
      .items(singlePackageDetailSchema)
      .required(),
    extraPayments: Joi.array().items(extraPaymentsSchema).required(),
    extraNotes: Joi.array()
      .items(
        Joi.object({
          notes: Joi.string().required(),
        })
      )
      .optional(),
    pkrToSrExchangeRate: Joi.string().required(),
  });
  return schema.validate(body);
}
