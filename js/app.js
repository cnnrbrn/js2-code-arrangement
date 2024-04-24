import { registerHandler } from "./events/auth/registerHandler.js";

function router() {
  const pathname = window.location.pathname;

  console.log(pathname);

  switch (pathname) {
    case "/":
    case "/index.html":
      console.log("Home page");
      break;
    case "/register/":
      registerHandler();
      break;
  }
}

router();
