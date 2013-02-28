a = 0
b = 1
i = 0
x = 4000000
c = 0


while(i<x) {
  a = a+b
  b = a-b
  i++
  if(a%2 == 0) {
    c = a + c
    console.log("zwischenergebnis" + c)

  }

}
console.log("ergebnis: " + c)
