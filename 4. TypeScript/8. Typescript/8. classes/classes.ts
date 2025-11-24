// CLASSES
class Person {
    id:number = 5
    name:string = 'brad'
    constructor(id: number, name: string){
        this.id = id 
        this.name = name
        console.log(this.id, this.name)
    }
    register = () => `${this.name} is now registered with ${this.id}`
}

const Nishant = new Person(23, 'larry')
console.log(Nishant.register())