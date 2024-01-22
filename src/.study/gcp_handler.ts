// import { Request, Response} from 'express'
import { google } from "googleapis"
// const google = require('googleapis')
import dotenv from "dotenv"
dotenv.config()
// const dotenv = require('dotenv')
class GoogleHandler {
    googleApiKey = process.env.GOOGLE_API_KEY || ''
    googleAuthClient = google.auth.fromAPIKey(this.googleApiKey)
    
    googleContext = google.vision({
        version: 'v1',
        auth: this.googleAuthClient
    })
    
    async googleHelloFunc(_req: any, res: any) {
        const response = await this.googleContext.context
        console.log({ response })
        res.send(response)
    }
}

new GoogleHandler().googleHelloFunc
