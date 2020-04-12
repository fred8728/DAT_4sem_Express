require('dotenv').config();
import express from "express";
import path from "path";
const app = express();
import { UserFacade , users } from './facades/myFacade'
const debug = require("debug")("game-case")
//debug(SOMETHING) <<----- instead of console.log

//app.use(express.static('public'))
app.use(express.static(path.join(process.cwd() , 'public')))
//add security middleware

const PORT = process.env.PORT || 3333;
const server = app.listen(PORT)
console.log(`Server started, listening on port: ${PORT}`)
module.exports.server = server;

app.get("/api/dummy", (req, res) => {
  res.json({ msg: "Hello" })
})

//GET 
//Virker
app.get("/api/users", (request, response) => {
  response.send(UserFacade.getAllUsers())
});

app.get("/api/users/:id", (request, response) => {
  response.send(UserFacade.getUser(request.body.userName));
});

//POST
app.post("/api/user", (request, response) => {
  const user = {
    name: request.body.name,
    userName: request.body.userName,
    password: request.body.password,
    role: request.body.role
  }

  response.send(UserFacade.addUser(user));
});

//DELETE:
app.delete("/api/user/:id", (request, response) => {
  response.send(UserFacade.deleteUser(request.body.userName));
});
