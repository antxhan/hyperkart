document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form submission from refreshing the page

  // Collect the form data
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  // Validate form data
  if (!name || !email) {
    alert("Please fill in all fields.");
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
      if (data.status === "success") {
        alert("Sign-up successful!");
        document.getElementById("signupForm").reset(); // Reset the form
      } else {
        alert("There was a problem with the sign-up. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error submitting form. Please try again later.");
    });
});

const okayButton = document.querySelector(".nav__button--okay");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");

function handleButtonAbility() {
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
}

document.querySelectorAll("input").forEach((i) => {
  i.addEventListener("input", () => {
    handleButtonAbility();
  });
});
