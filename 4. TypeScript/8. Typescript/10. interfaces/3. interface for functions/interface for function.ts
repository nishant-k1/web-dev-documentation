// INTERFACE WITH FUNCTIONS
interface MathFunc{
    (x:number, y:number): number
}

const add: MathFunc = (x:number, y:number): number => x + y
const sub: MathFunc = (x:number, y:number): number => x - y 