// const square = function (x) {
//   return x * x;
// };
const square = (x) => {
  return x * x;
};
console.log(square(3));

//methods
//arrow function do not bind its own this so they should be used if we want to access members of the object inside method
const myevent = {
  name: "Birthday Party",
  guestList: ["maegha", "sejal", "kirti"],
  //   printGuestList: function () {
  //     console.log("Guest List for " + this.name);
  //     this.guestList.forEach((guest) => {
  //       console.log(this.name); //here it is necessary to use arrow functions because this.name would be invalid
  //     });
  //   },

  //ES-6 method def
  printGuestList() {
    console.log("Guest List for " + this.name);
    this.guestList.forEach((guest) => {
      console.log(this.name); //here it is necessary to use arrow functions because this.name would be invalid
    });
  },
};

myevent.printGuestList();
