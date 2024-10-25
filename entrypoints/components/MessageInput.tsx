import React, { useState } from 'react';
import insertIcon from '~/assets/insert.svg';
import generateIcon from '~/assets/generate.svg';

interface MessageInputProps {
  onGenerate: (message: string) => void;
  onInsert: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onGenerate, onInsert }) => {
  const [inputValue, setInputValue] = useState('');

  const handleGenerateClick = () => {
    if (inputValue.trim()) {
      onGenerate(inputValue);
      setInputValue('');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your prompt..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
      />
      <button onClick={handleGenerateClick} style={{ marginRight: '10px' }}>
        <img src={generateIcon} alt="Generate" />
      </button>
      <button onClick={onInsert}>
        <img src={insertIcon} alt="Insert" />
      </button>
    </div>
  );
};

export default MessageInput;