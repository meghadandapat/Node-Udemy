const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 3000);
  });
};

//when 2 async operations that are dependent on each other use promise chaning for eg the sum which is returned is again making an asyc operation
//not clean code -> 2 level nested and duplicate code
// add(1, 2)
//   .then((sum) => {
//     console.log(sum);
//     add(sum, 3)
//       .then((sum) => {
//         console.log(sum);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   })
//   .catch((e) => {
//     console.log(e);
//   });

//promise chaining
add(1, 2)
  .then((sum) => {
    console.log(sum);
    return add(sum, 4); //will return sum2 after successful operation
  })
  .then((sum2) => {
    console.log(sum2);
  })
  .catch((e) => {
    console.log(e);
  });
