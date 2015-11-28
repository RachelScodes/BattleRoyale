///// helpers ////////////////////////////////////////////////////
'use strict'

let timeNow = function(){
   return parseInt(Date.now())
}
// what time is it?

function timesUp(clickThis){
   // new round starting
   clickButt(clickThis)
}
// clock ran out.

function clickButt(thisThing){
   thisThing.click()
}
// click!

let calculator = function(d){
   if (d <= 2){
      return 10000
   } else if (d <= 3){
      return 6000
   } else if (d <= 4) {
      return 3000
   } else if (d <=5) {
      return 1000
   } else {
      return 0
   }
}
// all the maths for raw scoring
