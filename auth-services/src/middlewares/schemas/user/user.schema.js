import Joi from "joi";
const connection = Joi.boolean();
export const userConnected = Joi.object({
    connection: connection.required()
});