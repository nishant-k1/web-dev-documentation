// INTERFACE WITH OBJECTS
interface UserInterface {
    id:number
    name:string
}

const john:UserInterface = {
    id: 1,
    name: 'John'
}


    //  readonlyu and ?
    interface newUserInterface {
        id:number
        readonly name:string // name property can't be reassigned
        age?:number  // optional property
    }

    const user3:newUserInterface = {
        id: 1,
        name: 'John'
    }