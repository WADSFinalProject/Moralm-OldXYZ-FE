import './StepPopUp.css';
import React from 'react';

const StepPopUp = ({ batch, stepIndex, onClose, onConfirm }) => {
  const step = batch.steps[stepIndex];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="step-title">Step {stepIndex + 1}: {step.step}</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {/* Custom content based on the step can go here */}
          {stepIndex === 4 && (
            <>
              <p>Package ID</p>
              <p>Order Time</p>
              <p>Sender</p>
              <p>Recipient</p>
              <p>Expedition</p>
              <p>Weight</p>
              <p>Status</p>
            </>
          )}
          {stepIndex === 5 && (
            <>
              <h2>Reception</h2>
              <div className="modal-field">
                <label>Delivery ID</label>
                <span>0934808042480</span>
              </div>
              <div className="modal-field">
                <label>Data Received</label>
                <input type="date" />
              </div>
              <div className="modal-field">
                <label>Rescaling</label>
                <span>The recommended weight should be between 10 - 30 kg</span>
              </div>
              <div className="modal-field">
                <label>Before Scaling</label>
                <span>5 kg</span>
              </div>
              <div className="modal-field">
                <label>After Scaling</label>
                <input type="text" placeholder="kg" />
              </div>
            </>
          )}
          {stepIndex === 6 && (
            <>
              <h2>Reception</h2>
              <div className="modal-field">
                <label>Delivery ID</label>
                <span>0934808042480</span>
              </div>
              <div className="modal-field">
                <label>Data Received</label>
                <input type="date" />
              </div>
              <div className="modal-field">
                <label>Rescaling</label>
                <span>The recommended weight should be between 10 - 30 kg</span>
              </div>
              <div className="modal-field">
                <label>Before Scaling</label>
                <span>5 kg</span>
              </div>
              <div className="modal-field">
                <label>After Scaling</label>
                <input type="text" placeholder="kg" />
              </div>
              <div className="modal-field">
                <label>Notes</label>
                <textarea rows="4" placeholder="Enter any notes here..."></textarea>
              </div>
            </>
          )}
        </div>
        <div className="modal-footer">
          <button onClick={onConfirm} className="confirm-button">Complete Step</button>
        </div>
      </div>
    </div>
  );
};

export default StepPopUp;
