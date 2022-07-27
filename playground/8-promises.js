//enhanced callbacks

//promises will be created behind the scenes inside libraries
const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve("Pass success info of required data type");
    reject("This is error");
  }, 2000);
});

//prmoise is a object with methods that we can access
//then method -> if resolve ran
//catch method -> if reject ran
doWorkPromise
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

//resolve and reject are separate functions thus better semantics and order of parameters does not matter
