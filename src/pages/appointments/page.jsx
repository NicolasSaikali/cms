import React, { useState, useEffect } from "react";

export default function AppointmentPage() {
  return (
    <div className="appointment-page">
      <div className="container-fluid">
        <div className="jumbotron">
          <h1 className="display-4">Appointments!</h1>
          <p className="lead">
            Here you can:
            <ul>
              <li>Accept an Appointment</li>
              <li>Decline an Appointment</li>
              <li>Schedule an Appointment</li>
            </ul>
          </p>
        </div>
        <div className="schedule-wrapper"></div>
      </div>
    </div>
  );
}
