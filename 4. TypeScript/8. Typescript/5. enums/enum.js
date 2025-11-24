"use strict";
//ENUM 
var Direction1;
(function (Direction1) {
    Direction1[Direction1["up"] = 0] = "up";
    Direction1[Direction1["down"] = 1] = "down";
    Direction1[Direction1["left"] = 2] = "left";
    Direction1[Direction1["right"] = 3] = "right";
})(Direction1 || (Direction1 = {}));
// by default enum start from 0 but if we assign first element 1 then enum will start from 1
var Direction2;
(function (Direction2) {
    Direction2[Direction2["Up"] = 5] = "Up";
    Direction2[Direction2["Down"] = 6] = "Down";
    Direction2[Direction2["Left"] = 7] = "Left";
    Direction2[Direction2["Right"] = 8] = "Right";
})(Direction2 || (Direction2 = {}));
// we can also assign strings to enums
(function (Direction2) {
    Direction2["Up1"] = "Up";
    Direction2["Down1"] = "Down";
    Direction2["Left1"] = "Left";
    Direction2["Right1"] = "Right";
})(Direction2 || (Direction2 = {}));
console.log(Direction2.Right);
