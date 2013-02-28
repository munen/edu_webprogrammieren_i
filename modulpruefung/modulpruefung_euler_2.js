fib_cache = []

function fib(n) {
  return (n<2) ? n : fib(n-1) + fib(n-2);
}


range = [];
for(i=0; i<20 ;i++) { range.push(i); }

sum = 0;
for(val in range) {
  if (val % 2 == 0) {
    sum += val;
  }
}

console.log(sum);
