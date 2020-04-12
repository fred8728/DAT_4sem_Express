import express from "express";
import userFacade from "../facades/userFacadeWithDB";
import basicAuth from "../middlewares/basic-auth"
const router = express.Router();
import { ApiError } from "../errors/apiError"
import authMiddleware from "../middlewares/basic-auth";
import * as mongo from "mongodb"
import setup from "../config/setupDB"
const MongoClient = mongo.MongoClient;


const USE_AUTHENTICATION = false;

(async function setupDB() {
    const client = await setup()
    userFacade.setDatabase(client)
})()


router.post('/', async function (req, res, next) {
    try {
        let newUser = req.body;
        newUser.role = "user";  //Even if a hacker tried to "sneak" in his own role, this is what you get
        const status = await userFacade.addUser(newUser)
        res.json({ status })
    } catch (err) {
        next(err);
    }
})

if (USE_AUTHENTICATION) {
    router.use(authMiddleware)
}
router.get('/:userName', async function (req: any, res, next) {
    try {
        if (USE_AUTHENTICATION) {
            const role = req.role;
            if (role != "admin") {
                throw new ApiError("Not Authorized", 403)
            }
        }
        const user_Name = req.params.userName;
        const user = await userFacade.getUser(user_Name);
        const { name, userName } = user;
        const userDTO = { name, userName }
        res.json(userDTO);
    } catch (err) {
        next(err)
    }
});

if (USE_AUTHENTICATION) {
    router.get('/user/me', async function (req: any, res, next) {
        try {
            const user_Name = req.userName;
            const user = await userFacade.getUser(user_Name);
            const { name, userName } = user;
            const userDTO = { name, userName }
            res.json(userDTO);
        } catch (err) {
            next(err)
        }
    });
}


router.get('/', async function (req: any, res, next) {
    try {
        if (USE_AUTHENTICATION) {
            const role = req.role;
            if (role != "admin") {
                throw new ApiError("Not Authorized", 403)
            }
        }
        const users = await userFacade.getAllUsers();
        const usersDTO = users.map((user) => {
            const { name, userName } = user;
            return { name, userName }
        })
        res.json(usersDTO);
    } catch (err) {
        next(err)
    }
});

router.delete('/:userName', async function (req: any, res, next) {
    try {
        if (USE_AUTHENTICATION) {
            const role = req.role;
            if (role != "admin") {
                throw new ApiError("Not Authorized", 403)
            }
        }
        const user_name = req.params.userName;
        const status = await userFacade.deleteUser(user_name)
        res.json({ status })
    } catch (err) {
        next(err);
    }
})

module.exports = router;