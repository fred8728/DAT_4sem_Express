export default interface IPost{
    _id: string, //We assume the name of the post is unique, enforce this using a unique-index
    task: {text:string, isUrl: boolean}
    taskSolution: string,
    location: {
        type: string,
        coordinates : Array<number>
    }
 }
 
 