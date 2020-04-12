import { request } from "http";
const bcrypt = require("bcrypt");

interface IGameUser {
  name: string;
  userName: string;
  password: string;
  role: string;
}

const p = { name:'fred', userName: 'fred8728', password: '1234', role: 'student'}

export const users: Array<IGameUser> = [];
users.push(p)

export class UserFacade {
  static addUser(user: IGameUser): boolean {
      let hashPW = bcrypt.hashSync(user.password, 10)
      if(hashPW){
        user.password = hashPW
        users.push(user)
      }else 
      return false
      throw new Error('User is not added')
  }

  static deleteUser(userName: string): boolean {
    const user = users.find(user => user.userName === userName)

    if(user){
    const index = users.indexOf(user)
    users.splice(index,1)
    return true
    }
    else {
      return false
    }
  }

  static getAllUsers(): Array<IGameUser> {
    return users;
  }

  static getUser(userName: string): IGameUser {
        const user = users.find(user => user.userName === userName)
        if(user){ return user}
        else {
            throw new Error("User with given username doesnt exist");
        }
  }
  
static checkUser(userName: string, password: string): boolean {
  /*Use bcrypts compare method */
  const user = users.find(user => user.userName === userName)
  const match =  bcrypt.compare(user?.password, password)
  if(user){
    if(match)
    return true;
  }else 
    return false
    throw new Error("Not yet implemented")
}

}
