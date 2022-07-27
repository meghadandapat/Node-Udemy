//client side js -> running on browser
//fetch->browser based api
//async io operation

const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const msgOne = document.querySelector("#msg");

weatherform.addEventListener("submit", (e) => {
  e.preventDefault();
  const loc = search.value;
  msgOne.innerHTML = "Loading...";
  fetch("/weather?address=" + loc).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        msgOne.innerHTML = data.error;
      } else {
        // console.log(data.location);
        // console.log(data.forecast[0]);
        msgOne.innerHTML =
          "Temperature of " +
          data.location +
          " is <strong>" +
          data.temperature +
          " degree Celsius</strong>. It is " +
          data.forecast[0] +
          ". Humidity is " +
          data.humidity +
          " degree celcius.";
      }
    });
  });
});
