const carOnePlace = localStorage.getItem("CarOnePlace");
const carOneSpeed = localStorage.getItem("carOneSpeed");
const carTwoPlace = localStorage.getItem("CarTwoPlace");
const carTwoSpeed = localStorage.getItem("carTwoSpeed");

const raceBtn = $("#raceBtn");
const startOverBtn = $("#startOver");
const race = $("#race");
const countDown = $(".countDown");
const prevPresTitle = $(".prevPresTitle");
const prevResCarOne = $(".prevResCarOne");
const prevResCarTwo = $(".prevResCarTwo");

const carOne = $("#carOne");
const carTwo = $("#carTwo");

if (carOnePlace && carOneSpeed && carTwoPlace && carTwoSpeed) {
  prevPresTitle.show();
  prevResCarOne.append(`
    <p class="pBorder">
      <span class="placeColorOne">Car 1</span> finished in 
      <span class="placeColorOne">${carOnePlace}</span> place with a time of 
      <span class="placeColorOne">${carOneSpeed} miliseconds!</span>
    </p>`);
  prevResCarTwo.append(`
    <p class="pBorder">
      <span class="placeColorTwo">Car 2</span> finished in 
      <span class="placeColorTwo">${carTwoPlace}</span> place with a time of 
      <span class="placeColorTwo">${carTwoSpeed} miliseconds!</span>
    </p>`);
} else {
  prevPresTitle.hide();
}

raceBtn.on("click", function () {
  race.css({ opacity: 0.6 });
  raceBtn.prop("disabled", true);
  startOverBtn.prop("disabled", true);

  prevPresTitle.hide();
  prevResCarOne.hide();
  prevResCarTwo.hide();

  let timeleft = 3;
  countDown.text(timeleft);

  const downloadTimer = setInterval(function () {
    timeleft--;
    countDown.text(timeleft);

    if (timeleft === 0) {
      race.css({ opacity: 1 });
      countDown.empty();
      startRace();
      clearInterval(downloadTimer);
    }
  }, 1000);

  function startRace() {
    let finished = false;
    let place = "1st";

    const raceFinished = function () {
      if (!finished) {
        finished = true;
        countDown.prepend('<img src="/images/finish.gif"/>');
        race.css({ opacity: 0.6 });
      } else {
        place = "2nd";
        startOverBtn.prop("disabled", false);
      }
    };

    const carWidth = $("#carOne").width();
    const windowWidth = $(window).width();
    const raceLength = windowWidth - carWidth;

    const randomSpeedCarOne =
      Math.floor(Math.random() * (8000 - 800 + 1)) + 800;
    const randomSpeedCarTwo =
      Math.floor(Math.random() * (8000 - 800 + 1)) + 800;
    localStorage.setItem("carOneSpeed", randomSpeedCarOne);
    localStorage.setItem("carTwoSpeed", randomSpeedCarTwo);

    carOne.animate(
      {
        left: raceLength,
      },
      randomSpeedCarOne,
      function () {
        raceFinished();
        $("#carOneData").append(
          `<p class="pBorder"> <span class="placeColorOne">Car 1</span> finished in <span class="placeColorOne"> ${place} </span> place with a time of <span class="placeColorOne"> ${randomSpeedCarOne} </span> milisecods!</p>`,
        );
        if (randomSpeedCarOne >= randomSpeedCarTwo) {
          localStorage.setItem("CarOnePlace", "2nd");
        } else {
          localStorage.setItem("CarOnePlace", "1st");
        }
      },
    );
    carTwo.animate(
      {
        left: raceLength,
      },
      randomSpeedCarTwo,
      function () {
        raceFinished();
        $("#carTwoData").append(
          `<p class="pBorder"><span class="placeColorTwo">Car 2</span> finished in <span class="placeColorTwo">${place} </span> place with a time of <span class="placeColorTwo">${randomSpeedCarTwo}</span> milisecods!</p>`,
        );
        if (randomSpeedCarTwo >= randomSpeedCarOne) {
          localStorage.setItem("CarTwoPlace", "2nd");
        } else {
          localStorage.setItem("CarTwoPlace", "1st");
        }
      },
    );
  }
});

startOverBtn.on("click", function () {
  raceBtn.prop("disabled", false);
  carOne.css({ left: 0 });
  carTwo.css({ left: 0 });
  countDown.empty();
  race.css({ opacity: 1 });
  timeleft = 3;
  clearInterval(downloadTimer);
});
