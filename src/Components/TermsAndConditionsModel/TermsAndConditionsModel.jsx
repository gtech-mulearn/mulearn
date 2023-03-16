import "./TermsAndConditionsModel.css";
import React, { useState, useEffect } from "react";

function TermsAndConditionsModal({ onAccept, onDecline }) {
  const handleAccept = () => {
    onAccept();
  };

  const handleDecline = () => {
    onDecline();
  };

  return (
    <div className="modal">
      <h1>Terms and Conditions</h1>

      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </p>
      <div className="button-align">
        <div className="button-container">
          <button onClick={handleAccept}>Accept</button>
        </div>
        <div className="button-decline">
          <button onClick={handleDecline}>Decline</button>
        </div>
      </div>
    </div>
  );
}

export default function MyComponent() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    const hasAccepted = localStorage.getItem("hasAcceptedTerms");
    if (!hasAccepted) {
      setShowModal(true);
    }
  };

  useEffect(() => {
    handleShowModal();
  }, []);

  const handleAcceptTerms = () => {
    localStorage.setItem("hasAcceptedTerms", "true");
    setShowModal(false);
  };

  const handleDeclineTerms = () => {
    localStorage.setItem("hasAcceptedTerms", "false");
    setShowModal(false);
  };

  return (
    <div>
      {showModal && (
        <div className="modal-wrapper">
          <div className="modal-backdrop" onClick={handleDeclineTerms}></div>
          <TermsAndConditionsModal
            onAccept={handleAcceptTerms}
            onDecline={handleDeclineTerms}
          />
        </div>
      )}
    </div>
  );
}
