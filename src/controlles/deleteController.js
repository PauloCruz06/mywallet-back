import { ObjectId } from "mongodb";
import db from "../db.js";

export async function deleteTransactions(req, res){
    const { id } = req.params;
    
    if(id){
        try{
            const transactionFinder  = await db.collection("usertransactions").findOne({ _id: ObjectId(id) });
            if(!transactionFinder) return res.sendStatus(404);

            await db.collection("usertransactions").deleteOne({ _id: ObjectId(id) });
            res.sendStatus(200);
        } catch(e){
            res.sendStatus(500);
        }
    } else{
        res.sendStatus(422);
    }
}