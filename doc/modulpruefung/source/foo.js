var range = [];
for (var i = 1; i < 4000000; i++){
  range.push(i);
}


var fib_cache = { 0 : 0, 1 : 1 }
function fib(n) {
  if (fib_cache[n] == undefined) {
    fib_cache[n] = fib(n-1) + fib(n-2);
  }
  return fib_cache[n]
}

var fib_sum = 0
for(var val in range) {
  if(fib(val) >= 4000000)
    break;
  if((fib(val) % 2) == 0)
    fib_sum += fib(val)
}

console.log(fib_sum)
