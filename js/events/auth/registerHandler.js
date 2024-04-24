import { register } from "../../api/auth/register.js";
import { displayMessage } from "../../ui/common/displayMessage.js";

export function registerHandler() {
  console.log("registerHandler");
  const form = document.querySelector("#registerForm");
  if (form) {
    form.addEventListener("submit", submitForm);
  }
}

async function submitForm(event) {
  event.preventDefault();
  // The first line of the code const form = event.target; is getting the HTML element that triggered the event. In this case, it's likely a form element since we're using it to create a FormData object in the next line.

  // The second line const formData = new FormData(form); is creating a new FormData object. The FormData interface provides a way to easily construct a set of key/value pairs representing form fields and their values. The FormData object can then be used to send form data via AJAX requests, for example.

  //The third line const data = Object.fromEntries(formData); is converting the FormData object into a plain JavaScript object. The Object.fromEntries() method transforms a list of key-value pairs into an object. This can be useful if you need to manipulate the form data as a regular object, or if you need to send the data as JSON.
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  if (data.bio.trim() === "") {
    delete data.bio;
  }

  if (data.avatarUrl.trim() === "") {
    delete data.avatarUrl;
  } else {
    data.avatar = {
      url: data.avatarUrl,
      alt: `${data.name}'s avatar`,
    };
    delete data.avatarUrl;
  }

  const container = document.querySelector("#message");

  console.log(data);

  const fieldset = form.querySelector("fieldset");
  const button = form.querySelector("button");

  try {
    fieldset.disabled = true;
    await register(data);
    // the call was a success
    // display a success message
    displayMessage(
      "#message",
      "success",
      "Successfully registered. Please login."
    );
    form.reset();
  } catch (error) {
    console.error(error);
    displayMessage(container, "warning", error.message);
  } finally {
    fieldset.disabled = false;
  }
}
