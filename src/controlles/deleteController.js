import { ObjectId } from "mongodb";
import db from "../db.js";

export async function deleteTransactions(req, res){
    if(req.body.id){
        console.log(req.body.id);
        try{
            const transactionFinder  = await db.collection("usertransactions").findOne({ _id: ObjectId(req.body.id) });
            if(!transactionFinder) return res.sendStatus(404);

            await db.collection("usertransactions").deleteOne({ _id: ObjectId(req.body.id) });
            res.sendStatus(200);
        } catch(e){
            res.sendStatus(500);
        }
    } else{
        res.sendStatus(422);
    }
}