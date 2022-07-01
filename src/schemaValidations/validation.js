import Joi from "joi";

export async function validationSignUp(body){
    const schemaUserSignUp = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(/^[a-zA-Z0-9]{5,20}$/).required(),
        passwordconfirm: Joi.ref('password')
    });
    
    const value = schemaUserSignUp.validate({
        name: body.name,
        email: body.email,
        password: body.password,
        passwordconfirm: body.passwordconfirm
    });

    return value;
}