import {Response} from 'express'

/**
 * Create a simple middleware, which for ALL incoming API-request will log (console.log in this first version) the following details:
 * Time, The method (GET, PUT, POST or DELETE), the URL
 */

const myLogger = (request: any, response: Response, next:Function) => {
    console.log(`Time: ${Date.now} Request Type: ${request.method} Request URL: ${request.originalUrl}`);
    next()
}

export default myLogger;