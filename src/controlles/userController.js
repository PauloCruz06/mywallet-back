import db from "../db.js";

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