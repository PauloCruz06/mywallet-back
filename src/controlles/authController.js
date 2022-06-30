import bcrypt from "bcrypt";
import db from "../db.js";
import { v4 as uuid } from "uuid";
import { stripHtml } from "string-strip-html";
import { validationSignUp } from "../validation.js";

export async function signUp (req, res){
    const userData = {
        name: stripHtml(req.body.name).result.trim(),
        email: stripHtml(req.body.email).result.trim(),
        password: req.body.password,
        passwordconfirm: req.body.passwordconfirm
    };
    
    const value = await validationSignUp(userData);
    
    if(value.error){
        res.sendStatus(422);
    }else{
        const passwordHash = bcrypt.hashSync(userData.password, 10);
        delete userData.passwordconfirm;
        await db.collection("users").insertOne({
            ...userData,
            password: passwordHash
        });
        res.sendStatus(201);
    }
}