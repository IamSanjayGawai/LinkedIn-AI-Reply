import React from 'react';

interface MessageDisplayProps {
  messagesRef: React.RefObject<HTMLDivElement>;
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ messagesRef }) => (
  <div ref={messagesRef} style={{ maxHeight: '200px', overflowY: 'auto' }} />
);

export default MessageDisplay;