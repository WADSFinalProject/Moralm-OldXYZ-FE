import './App.css';
import React, { useState } from 'react';
import MoralmLogo from './assets/MoralmLogo.png';
import NotifBellLogo from './assets/NotifBellLogo.png';
import ShopCartLogo from './assets/ShopCartLogo.png';
import ArchiveLogo from './assets/ArchiveLogo.png';
import UserLogo from './assets/UserLogo.png';
import ArrowLogo from './assets/ArrowLogo.png';
import NotificationsModal from './NotifPopUp';
import WarehouseModal from './Warehouse';
import Archive from './Archive'; 
import StepPopUp from './StepPopUp'; 

const createSteps = () => [
  { step: 'Gather Leaves', completed: false },
  { step: 'Wet Leaves', completed: false },
  { step: 'Dry Leaves', completed: false },
  { step: 'Flour Leaves', completed: false },
  { step: 'Deliver', completed: false },
  { step: 'Rescale', completed: false }
];

const createBatches = (num) => {
  const batches = [];
  for (let i = 1; i <= num; i++) {
    batches.push({ id: i, name: `Batch ${i}`, date: '28/07/2024', time: '12:00 PM', steps: createSteps() });
  }
  return batches;
};

const initialBatches = {
  'Centra 1': createBatches(4),
  'Centra 2': createBatches(2),
  'Centra 3': createBatches(8),
  'Centra 4': createBatches(5),
  'Centra 5': createBatches(3),
  'Centra 6': createBatches(6),
  'Centra 7': createBatches(4),
  'Centra 8': createBatches(7),
  'Centra 9': createBatches(2),
  'Centra 10': createBatches(5),
  'Centra 12': createBatches(3),
  'Centra 13': createBatches(4),
  'Centra 14': createBatches(6),
  'Centra 15': createBatches(8),
  'Centra 16': createBatches(1),
  'Centra 17': createBatches(2),
  'Centra 18': createBatches(4),
  'Centra 19': createBatches(5),
  'Centra 20': createBatches(3),
  'Centra 21': createBatches(7),
};

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Centra 1');
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isWarehouseModalOpen, setIsWarehouseModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Notification 1', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 2, title: 'Notification 2', message: 'In laoreet vel purus at laoreet.' },
    { id: 3, title: 'Notification 3', message: 'Maecenas eu diam nisi.' },
    { id: 4, title: 'Notification 4', message: 'Maecenas eu diam nisi.' },
    { id: 5, title: 'Notification 5', message: 'Maecenas eu diam nisi.' },
    { id: 6, title: 'Notification 6', message: 'Maecenas eu diam nisi.' },
    { id: 7, title: 'Notification 7', message: 'Maecenas eu diam nisi.' },
    { id: 8, title: 'Notification 8', message: 'Maecenas eu diam nisi.' },
    { id: 9, title: 'Notification 9', message: 'Maecenas eu diam nisi.' },
  ]);
  const [batches, setBatches] = useState(initialBatches);
  const [stepPopupOpen, setStepPopupOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedStepIndex, setSelectedStepIndex] = useState(null);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [dropdownStates, setDropdownStates] = useState(Array(initialBatches[activeLink].length).fill(false));

  const handleBatchDropdownClick = (index) => {
    setDropdownStates(prevStates => {
      const newState = [...prevStates];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const toggleNav = () => setIsOpen(!isOpen);
  const closeNav = () => setIsOpen(false);
  const handleLinkClick = (link) => {
    setActiveLink(link);
    closeNav();
    setDropdownStates(Array(batches[link].length).fill(false)); // Reset dropdown states
  };

  const handleNotificationClick = () => setIsNotificationModalOpen(!isNotificationModalOpen);
  const closeNotificationModal = () => setIsNotificationModalOpen(false);
  const handleWarehouseClick = () => setIsWarehouseModalOpen(!isWarehouseModalOpen);
  const closeWarehouseModal = () => setIsWarehouseModalOpen(false);

  const handleNotificationClose = (id) => setNotifications(notifications.filter(notification => notification.id !== id));
  const handleClearAllNotifications = () => setNotifications([]);

  const handleConfirmWarehouse = (selectedBatches) => {
    console.log("Batches sent to warehouse:", selectedBatches);
    const remainingBatches = batches[activeLink].filter(batch => !selectedBatches.includes(batch.id));
    setBatches({ ...batches, [activeLink]: remainingBatches });
    closeWarehouseModal();
  };

  const handleArchiveClick = () => setIsArchiveOpen(!isArchiveOpen);

  const handleOpenStepPopup = (batch, stepIndex) => {
    if (stepIndex > 0 && !batch.steps[stepIndex - 1].completed) {
      alert("Please complete the previous steps first.");
      return;
    }
    setSelectedBatch(batch);
    setSelectedStepIndex(stepIndex);
    setStepPopupOpen(true);
  };

  const handleCloseStepPopup = () => {
    setStepPopupOpen(false);
    setSelectedBatch(null);
    setSelectedStepIndex(null);
  };

  const completeStep = () => {
    const updatedBatches = batches[activeLink].map(batch => {
      if (batch.id === selectedBatch.id) {
        const updatedSteps = batch.steps.map((step, index) =>
          index === selectedStepIndex ? { ...step, completed: true } : step
        );
        return { ...batch, steps: updatedSteps };
      }
      return batch;
    });
    setBatches({ ...batches, [activeLink]: updatedBatches });
    handleCloseStepPopup();
  };

  return (
    <div>
      <div className={`sidenav ${isOpen ? 'open' : ''}`}>
        <div className="logo">
          <img src={MoralmLogo} alt="Moralm Logo" className="moralmlogo" />
        </div>
        <button className="closebtn" onClick={closeNav}>
          &times;
        </button>
        {Object.keys(batches).map((link) => (
          <a
            key={link}
            href="#"
            className={activeLink === link ? 'active' : ''}
            onClick={() => handleLinkClick(link)}
          >
            {link}
          </a>
        ))}
      </div>
      <div className={`hamburger-container ${isOpen ? 'active' : ''}`} onClick={toggleNav}>
        <div className="hamburger">&#9776;</div>
      </div>
      <div className="content-container">
        {!isArchiveOpen && <h2 className='ProcessTitle'>Process</h2>}
        <div className="top-right-buttons">
          <div className="icon-container">
            <img src={NotifBellLogo} alt="Notifications" className="icon" onClick={handleNotificationClick} />
          </div>
          <div className="icon-container">
            <img src={ShopCartLogo} alt="Shopping Cart" className="icon" onClick={handleWarehouseClick} />
          </div>
          <div className="icon-container">
            <img src={ArchiveLogo} alt="Archive" className="icon" onClick={handleArchiveClick} />
          </div>
          <div className="icon-container-profile">
            <div className="profile-arrow-button">
              <img src={UserLogo} alt="User" className="icon" />
              <img src={ArrowLogo} alt="Arrow" className="icon arrow" />
            </div>
          </div>
        </div>
        <NotificationsModal 
          isActive={isNotificationModalOpen} 
          onClose={closeNotificationModal} 
          notifications={notifications} 
          onNotificationClose={handleNotificationClose}
          onClearAllNotifications={handleClearAllNotifications} 
        />
        <WarehouseModal 
          isActive={isWarehouseModalOpen} 
          onClose={closeWarehouseModal} 
          batches={batches[activeLink]} 
          onConfirm={handleConfirmWarehouse} 
        />
        {isArchiveOpen ? (
          <Archive />
        ) : (
          <>
            <div className="batch-header">
              <span>Name</span>
              <span>Date</span>
              <span>Time</span>
            </div>
            {batches[activeLink].map((batch, index) => (
              <div key={batch.id} className="batch-container">
                <div className="batch-info">
                  <span>{batch.name}</span>
                  <span>{batch.date}</span>
                  <div className="batch-dropdown">
                    <div className="time-ellipsis">
                      <span>{batch.time}</span>
                      <div className="ellipsis">
                        <button className="ellipsis" onClick={() => handleBatchDropdownClick(index)}>&#65049;</button>
                      </div>
                    </div>
                    <div className="dropdown-content" style={{ display: dropdownStates[index] ? 'block' : 'none' }}>
                      <button onClick={() => handleBatchDetails(batch)}>Batch Details</button>
                      <button onClick={() => handleDeleteBatch(batch.id)}>Delete Batch</button>
                    </div>
                  </div>
                </div>
                <div className="process-steps">
                  {batch.steps.map((step, stepIndex) => (
                    <button 
                      key={stepIndex}
                      className={`process-step ${step.completed ? 'completed' : ''}`} 
                      onClick={() => handleOpenStepPopup(batch, stepIndex)}
                    >
                      <div className="step-number">{stepIndex + 1}</div>
                      <div className="step-text">{step.step}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {stepPopupOpen && selectedBatch && (
              <StepPopUp 
                batch={selectedBatch} 
                stepIndex={selectedStepIndex}
                onClose={handleCloseStepPopup} 
                onConfirm={completeStep} 
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
