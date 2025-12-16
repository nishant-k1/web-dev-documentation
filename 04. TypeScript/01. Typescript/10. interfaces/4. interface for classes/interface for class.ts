interface PersonInterface {
    id: number
    name: string 
    register(): string
}

class Someperson implements PersonInterface {
    id:number
    name:string
    constructor(id:number, name: string){
        this.id = id 
        this.name = name
    }
    register = () => `${this.name} is now registered.`
}


// interface for subclass 
    class Employee extends Someperson {
        position: string
        constructor(id: number, name: string, position: string){
            // here id and name are alreay in the Someperon class that we're extending so we don't have to this again like -- this.id, this.name, we can call super instead and pass in id and name.
            super(id, name)
            this.position = position
        }
    }

    const emp = new Employee(3, 'Shawn', 'Developer')
    console.log(emp.register())