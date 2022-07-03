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

export async function validationTransaction(body){
    const schemaUserTransaction = Joi.object({
        description: Joi.string().required(),
        amount: Joi.number().required(),
        isPayment: Joi.boolean().required()
    });

    const value = schemaUserTransaction.validate({
        description: body.description,
        amount: body.amount,
        isPayment: body.isPayment
    });

    return value;
}