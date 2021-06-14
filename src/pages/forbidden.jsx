import React, { useState, useEffect } from "react";

export default function Forbidden() {
  return (
    <div
      className="d-flex flex-column
        justify-content-center align-items-center"
      style={{ fontSize: 50 }}
    >
      <div className="color-dark">403</div>
      <h1 class="section-title color-dark" style={{ fontSize: 90 }}>
        FORBIDDEN!
      </h1>
      <button
        class="btn bg-green-dark text-light"
        onClick={() => {
          window.history.back();
        }}
      >
        Go back
      </button>
    </div>
  );
}
