import db from "../db.js";

export default async function tokenValidation(req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if(token && typeof token === "string"){
        try{
            const userSession = await db.collection("sessions").findOne({ token });
            if(!userSession) return res.sendStatus(401);

            const user = await db.collection("users").findOne({ _id: userSession.userId });
            if(!user) return res.sendStatus(404);

            res.locals.user = user;
            next();
        }catch(e){
            res.status(500).send(e);
        }
    }else{
        res.sendStatus(401);
    }
}