//! Declare Elements As Variables
const workoutTypeSelect = document.querySelector("#type");
const cardioForm = document.querySelector(".cardio-form");
const resistanceForm = document.querySelector(".resistance-form");
const cardioNameInput = document.querySelector("#cardio-name");
const nameInput = document.querySelector("#name");
const weightInput = document.querySelector("#weight");
const setsInput = document.querySelector("#sets");
const repsInput = document.querySelector("#reps");
const durationInput = document.querySelector("#duration");
const resistanceDurationInput = document.querySelector("#resistance-duration");
const distanceInput = document.querySelector("#distance");
const completeButton = document.querySelector("button.complete");
const addButton = document.querySelector("button.add-another");
const toast = document.querySelector("#toast");
const newWorkout = document.querySelector(".new-workout")

let workoutType = null;
let shouldNavigateAway = false;

//! If no workouts exist, create workout
async function initExercise() {
  let workout;

  if (location.search.split("=")[1] === undefined) {
    workout = await API.createWorkout()
  }
  if (workout) {
    location.search = "?id=" + workout._id;
  }
}

initExercise();

//! Change Workout Type
function handleWorkoutTypeChange(event) {
  workoutType = event.target.value;

  if (workoutType === "cardio") {
    cardioForm.classList.remove("d-none");
    resistanceForm.classList.add("d-none");
  } else if (workoutType === "resistance") {
    resistanceForm.classList.remove("d-none");
    cardioForm.classList.add("d-none");
  } else {
    cardioForm.classList.add("d-none");
    resistanceForm.classList.add("d-none");
  }

  validateInputs();
}

//! Input Validation
function validateInputs() {
  let isValid = true;

  if (workoutType === "resistance") {
    if (nameInput.value.trim() === "") {
      isValid = false;
    }

    if (weightInput.value.trim() === "") {
      isValid = false;
    }

    if (setsInput.value.trim() === "") {
      isValid = false;
    }

    if (repsInput.value.trim() === "") {
      isValid = false;
    }

    if (resistanceDurationInput.value.trim() === "") {
      isValid = false;
    }
  } else if (workoutType === "cardio") {
    if (cardioNameInput.value.trim() === "") {
      isValid = false;
    }

    if (durationInput.value.trim() === "") {
      isValid = false;
    }

    if (distanceInput.value.trim() === "") {
      isValid = false;
    }
  }

  if (isValid) {
    completeButton.removeAttribute("disabled");
    addButton.removeAttribute("disabled");
  } else {
    completeButton.setAttribute("disabled", true);
    addButton.setAttribute("disabled", true);
  }
}

//! Form Submit
async function handleFormSubmit(event) {
  event.preventDefault();

  let workoutData = {};

  if (workoutType === "cardio") {
    workoutData.type = "cardio";
    workoutData.name = cardioNameInput.value.trim();
    workoutData.distance = Number(distanceInput.value.trim());
    workoutData.duration = Number(durationInput.value.trim());
  } else if (workoutType === "resistance") {
    workoutData.type = "resistance";
    workoutData.name = nameInput.value.trim();
    workoutData.weight = Number(weightInput.value.trim());
    workoutData.sets = Number(setsInput.value.trim());
    workoutData.reps = Number(repsInput.value.trim());
    workoutData.duration = Number(resistanceDurationInput.value.trim());
  }
  console.log(workoutData);
  await API.addExercise(workoutData);
  clearInputs();
  toast.classList.add("success");
  console.log("Successfully Added")
}

//! Toast Animation
function handleToastAnimationEnd() {
  toast.removeAttribute("class");
  if (shouldNavigateAway) {
    location.href = "/";
  }
}

//! Clear Form Inputs
function clearInputs() {
  cardioNameInput.value = "";
  nameInput.value = "";
  setsInput.value = "";
  distanceInput.value = "";
  durationInput.value = "";
  repsInput.value = "";
  resistanceDurationInput.value = "";
  weightInput.value = "";
}

//! Show Specific Form Based On Selection
if (workoutTypeSelect) {
  workoutTypeSelect.addEventListener("change", handleWorkoutTypeChange);
}

//! Add Event Listener to Complete Button
if (completeButton) {
  completeButton.addEventListener("click", function (event) {
    shouldNavigateAway = true;
    handleFormSubmit(event);
  });
}

//! Add Event Listener to Add Exercise Button
if (addButton) {
  addButton.addEventListener("click", handleFormSubmit);
}

//! Add Event Listener to Toast
toast.addEventListener("animationend", handleToastAnimationEnd);

//! Add Event Listeners to Inputs
document
  .querySelectorAll("input")
  .forEach(element => element.addEventListener("input", validateInputs));