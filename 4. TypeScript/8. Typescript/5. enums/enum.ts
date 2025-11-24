//ENUM 
enum Direction1 {
    up,
    down,
    left,
    right
}

// by default enum start from 0 but if we assign first element 1 then enum will start from 1
enum Direction2 {
    Up = 5,
    Down,
    Left,
    Right
}
// we can also assign strings to enums
enum Direction2 {
    Up1 = 'Up',
    Down1 = 'Down',
    Left1 = 'Left',
    Right1 = 'Right'
}

console.log(Direction2.Right)