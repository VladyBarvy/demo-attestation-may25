import React, { useState } from 'react';

function TimeDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  const updateTime = () => {
    setCurrentTime(new Date().toLocaleTimeString());
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Текущее время: {currentTime}</h1>
      <button 
        onClick={updateTime}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        Обновить время
      </button>
    </div>
  );
}

export default TimeDisplay;