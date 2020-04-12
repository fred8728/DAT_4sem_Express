import {Response} from 'express'

const myCors = (request: any, response:Response, next:Function) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
}

export default myCors;