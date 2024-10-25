import React from 'react';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode; // Add this line to accept children
}

const Modal: React.FC<ModalProps> = ({ visible, onClose, children }) => {
  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '20px'
      }}>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;