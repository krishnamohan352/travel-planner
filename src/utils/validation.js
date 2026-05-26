import * as Yup from "yup";

export const travelSchema = Yup.object({
    city: Yup.string().required("City is required"),

    days: Yup.number()
        .typeError("Days must be a number")
        .required("Days is required")
        .min(1, "Minimum 1 day required")
        .max(30, "Maximum 30 days allowed"),

    budget: Yup.string().required("Please select a budget"),

    travelers: Yup.string().required("Please select travelers"),
});