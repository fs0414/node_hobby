// import { LambdaController } from "../../api/controller/LambdaController";
import express from "express";
const apiRouter = express.Router();

// const lambdaContext = new LambdaController();

// apiRouter.get("/lambda-test", lambdaContext.lambdaTestFunc);
apiRouter.get("/lambda-test", );
(res: any) => {
    return  res.status(200).send("testtesttest11")
}

module.exports = apiRouter;