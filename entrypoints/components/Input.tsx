import React from 'react';

interface InputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ inputValue, setInputValue }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <input
        id="input-text"
        type="text"
        placeholder="Enter your prompt..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />
    </div>
  );
};

export default Input;
