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
        const userDoc = await db.collection("users").findOne({ email: userData.email });
        if(userDoc) return res.sendStatus(409);

        const passwordHash = bcrypt.hashSync(userData.password, 10);
        delete userData.passwordconfirm;
        await db.collection("users").insertOne({
            ...userData,
            password: passwordHash
        });
        res.sendStatus(201);
    }
}

export async function signIn (req, res){
    const { email, password} = req.body;
    if(!email || !password) return res.sendStatus(422);

    const user = await db.collection("users").findOne({
        email: stripHtml(email).result.trim()
    });
    if(user && bcrypt.compareSync(password, user.password)){
        const token = uuid();
        await db.collection("sessions").insertOne({ userId: user._id, token });
        delete user.password
        const re = { ...user, token }
        res.status(200).send(re);
    }else{
        res.sendStatus(401);
    }
}