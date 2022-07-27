const doWorkCallback = (callback) => {
  setTimeout(() => {
    callback("This is error", undefined);
    // callback(undefined,"This is success")
  }, 2000);
};

doWorkCallback((error, result) => {
  if (error) {
    return console.log(error);
  }
  console.log(result);
});

//the function which is being passed as parameter will execute only when it is called inside the body of caller function
// If execution two func are dependentent on each other then we use callback
// if we want data from one function to run another function then we have two otions: the data can either be return value of previous func or callbacks
// if we are getting the data back from a async fuc then we have to use callback pattern
