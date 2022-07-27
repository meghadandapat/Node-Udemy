//easy to work with promises
//looks like synchronous code

//async returns a promise object always
/* const doWork = async () => {
  //   throw new Error("Something went wrong");
  return "Andrew";
};*/

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        return reject("Numbers must be non-negative");
      }

      resolve(a + b);
    }, 3000);
  });
};

//async await change the way we consume promises
//prevents promise-chaing since return value of one promise is being used in the next
//The creation of promises returs the same, so the libraries(here mongoose) don't have to be re-written
const doWork = async () => {
  const sum = await add(1, 99);
  const sum2 = await add(sum, 9);
  const sum3 = await add(sum2, 9);
  return sum3;
};

doWork()
  .then((result) => {
    console.log("result", result);
  })
  .catch((e) => {
    console.log("e", e);
  });
