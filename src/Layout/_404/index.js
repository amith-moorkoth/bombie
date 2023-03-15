import React from "react";

import logo from "src/assets/logo.svg";
function _404() {
  return (
    <div
      class="d-flex align-items-center justify-content-center"
      style={{ background: "white" }}
    >
      <div class="text-center">
        <img src={logo} width="100" />
        <h1 class="display-1 fw-bold">404</h1>
        <p class="lead">The page you’re looking for doesn’t exist.</p>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            history.back();
          }}
          class="btn btn-primary"
        >
          Back
        </a>
      </div>
    </div>
  );
}

export default _404;
