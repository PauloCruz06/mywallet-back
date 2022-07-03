import db from "../db.js";
import { validationTransaction } from "../schemaValidations/validation.js";
import { stripHtml } from "string-strip-html";
import dayjs from "dayjs"
import "dayjs/locale/pt-br.js";

export async function getTransactions(_, res){
    const { user } = res.locals;
    
    try{
        const sendTransactions = [];
        const userTransactions = await db.collection("usertransactions").find({ email: user.email }).toArray();

        userTransactions.forEach((transaction, index) => {
            sendTransactions.push({...transaction, id: transaction._id.toString()});
            delete sendTransactions[index]._id;
        });

        res.status(200).send(sendTransactions);
    } catch(e){
        res.status(500).send(e);
    }
}

export async function setTransactions(req, res){
    dayjs.locale("pt-br");

    const { user } = res.locals;
    
    try {
        const body = {
            description: stripHtml(req.body.description).result.trim(),
            amount: req.body.amount,
            isPayment: req.body.isPayment
        }
        const value = await validationTransaction(body);
        if(value.error) return res.sendStatus(422);

        const userTransaction = {
            email: user.email,
            ...body,
            day: dayjs().format('DD/MM')
        };

        await db.collection("usertransactions").insertOne(userTransaction);
        res.sendStatus(201);
    } catch(e) {
        res.status(500).send(e);
    }
}