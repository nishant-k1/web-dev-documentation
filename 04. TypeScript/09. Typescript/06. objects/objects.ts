//OBJECTS 
const user: {
    id: number
    name: string
} = {
    id: 1,
    name: 'John'
}

// Or, using type
type Users = {
    id:number
    name:string
}

const users1:Users = {
    id: 1,
    name: 'John'
}