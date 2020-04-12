import winston from "winston";
import * as expressWinston from "express-winston";
import path from "path"

let requestLoggerTransports:Array<any> =[
    new winston.transports.File({filename:path.join(process.cwd(),"logs","request.log")})
]
let errorLoggerTransports:Array<any> =[
    new winston.transports.File({filename:path.join(process.cwd(),"logs","error.log")})
]
if (process.env.NODE_ENV !== 'production') {
  requestLoggerTransports.push(new winston.transports.Console());
  errorLoggerTransports.push(new winston.transports.Console());
}
let requestLogger = expressWinston.logger({
    transports: requestLoggerTransports,
    format: winston.format.combine(
      winston.format.colorize(),winston.format.json()
    ),
    expressFormat:true,
    colorize: false
  })

let errorLogger = expressWinston.errorLogger({
    transports: errorLoggerTransports,
    format: winston.format.combine(
      winston.format.colorize(),winston.format.json()
    )
  })

 export {requestLogger,errorLogger};
  