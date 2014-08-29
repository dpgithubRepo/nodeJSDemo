//@ Durga Prasad

var pi=3.18

function getPiValue(){
return pi;
}

exports.circleArea=function getCircleArea(radius){
return pi*radius*radius;
}


exports.circlePerimeter=function getPerimeter(radius){
return 2*pi*radius;
}
