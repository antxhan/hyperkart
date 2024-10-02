const registerWindow = document.querySelector(".window");
const okayButton = document.querySelector(".nav__button--okay");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const loading = document.querySelector(".loading");
const formMessage = document.querySelector(".form__message");
const loadingImage = document.querySelector(".loading__image");
let currentLoadingImage = 1;

// VALIDATION -----------------------------------------------------------------

document.querySelectorAll("input").forEach((i) => {
  i.addEventListener("input", () => {
    const value = emailInput.value;
    const emailMatch = "@hyperisland.se";
    if (
      value.slice(value.length - emailMatch.length) === emailMatch &&
      value !== emailMatch &&
      nameInput.value
    ) {
      okayButton.classList.remove("disabled");
    } else {
      if (!okayButton.classList.contains("disabled")) {
        okayButton.classList.add("disabled");
      }
    }
  });
});

// LOADING --------------------------------------------------------------------

function switchImage() {
  const imgArray = [
    "assets/images/odai.png",
    "assets/images/nati.png",
    "assets/images/anton.png",
    "assets/images/jod.png",
    "assets/images/jimmy.webp",
  ];
  loadingImage.src = imgArray[currentLoadingImage];
  currentLoadingImage =
    currentLoadingImage >= imgArray.length - 1 ? 0 : currentLoadingImage + 1;
}

function incrementEllipsis() {
  let loadingText = loading.querySelector("strong");
  if (loadingText.textContent === "Loading...") {
    loadingText.innerText = "Loading";
  } else {
    loadingText.innerText += ".";
  }
}

function loadingCallback() {
  switchImage();
  incrementEllipsis();
}

function toggleLoading() {
  if (loading.style.display === "flex") {
    loading.style.display = "none";
    currentLoadingImage = 0;
  } else {
    loading.style.display = "flex";
    setInterval(loadingCallback, 1000);
  }
}

// ON SUBMIT ------------------------------------------------------------------

function hideWindow() {
  registerWindow.style.display = "none";
}

function showWindow() {
  registerWindow.style.display = "flex";
}

function recreateWindow(title, paragraph) {
  const h2 = registerWindow.querySelector("h2");
  const labels = registerWindow.querySelectorAll("label");
  labels.forEach((label) => {
    label.style.display = "none";
  });
  h2.innerText = title;
  const p = `<p>${paragraph}</p>`;
  registerWindow.insertAdjacentHTML("beforeend", p);
}

// SUBMIT FORM ----------------------------------------------------------------

document.getElementById("signupForm").addEventListener("submit", (e) => {
  e.preventDefault();
  hideWindow();
  toggleLoading();

  const name = nameInput.value;
  const email = emailInput.value;

  if (!name || !email) {
    return;
  }

  // Create form data object
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);

  // Send data to Google Apps Script
  fetch(
    "https://script.google.com/macros/s/AKfycbzQu7I-dy1mp7df-bzlPIoboIcvba9wq2yXSbTxq2WAOe2IKutZUcGaDKmAIxUxtYbv/exec",
    {
      method: "POST",
      body: new URLSearchParams(formData),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      toggleLoading();
      if (data.status === "success") {
        recreateWindow("Success!", "You're all set! Good luck!");
        showWindow();
        okayButton.style.display = "none";
        document.getElementById("signupForm").reset(); // Reset the form
      } else {
        recreateWindow(
          "Error",
          "There was a problem with the sign-up. Please try again later."
        );
        showWindow();
        okayButton.style.display = "none";
      }
    })
    .catch((error) => {
      toggleLoading();
      recreateWindow(
        "Error",
        "There was a problem with the sign-up. Please try again later."
      );
      showWindow();
      okayButton.style.display = "none";
      console.error("Error:", error);
    });
});
