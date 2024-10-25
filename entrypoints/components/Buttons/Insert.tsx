import React from 'react';
import insertIcon from '~/assets/insert.svg';

interface InsertProps {
  lastGeneratedMessage: string;
  setInsertButtonVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  parentElementRef: React.RefObject<HTMLElement | null>;
}

const Insert: React.FC<InsertProps> = ({
  lastGeneratedMessage,
  setInsertButtonVisible,
  setModalVisible,
  parentElementRef,
}) => {
  const handleInsertClick = () => {
    if (lastGeneratedMessage && parentElementRef.current) {
      const messageInput = parentElementRef.current.querySelector('.msg-form__contenteditable');

      if (messageInput) {
        messageInput.removeAttribute('aria-label');

        let existingParagraph = messageInput.querySelector('p');
        if (!existingParagraph) {
          existingParagraph = document.createElement('p');
          messageInput.appendChild(existingParagraph);
        }
        existingParagraph.textContent = lastGeneratedMessage;

        setInsertButtonVisible(false);
        setModalVisible(false);
      }
    }
  };

  return (
    <button
      id="insert-btn"
      onClick={handleInsertClick}
      style={{
        background: '#fff',
        color: '#666D80',
        padding: '8px 16px',
        border: '2px solid #666D80',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '10px',
      }}
    >
      <img
        src={insertIcon}
        alt="Insert"
        style={{
          verticalAlign: 'middle',
          marginRight: '5px',
          width: '14px',
          height: '14px',
        }}
      />
      <b>Insert</b>
    </button>
  );
};

export default Insert;
