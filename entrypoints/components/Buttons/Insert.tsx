import React from "react";
import insertIcon from "~/assets/insert.svg";

interface InsertProps {
  lastGeneratedMessage: string;
  setInsertButtonVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  parentElementRef: React.RefObject<HTMLElement | null>;
  findLinkedInInput: () => HTMLElement | null;
}

const Insert: React.FC<InsertProps> = ({
  lastGeneratedMessage,
  setInsertButtonVisible,
  setModalVisible,
  findLinkedInInput,
}) => {
  const handleInsertClick = () => {
    const targetInput = findLinkedInInput();
    if (!targetInput) {
      console.error("LinkedIn input field not found");
      return;
    }

    try {
      // Insert generated message
      targetInput.focus();
      if (!document.execCommand("insertText", false, lastGeneratedMessage)) {
        targetInput.textContent = lastGeneratedMessage;
      }

      // Dispatch events for LinkedIn to detect changes
      ["input", "change", "blur", "focus"].forEach((eventType) => {
        const event = new Event(eventType, { bubbles: true });
        targetInput.dispatchEvent(event);
      });

      setModalVisible(false);
      setInsertButtonVisible(false);
    } catch (error) {
      console.error("Error inserting text:", error);
    }
  };

  return (
    <button
      id="insert-btn"
      onClick={handleInsertClick}
      style={{
        background: "#fff",
        color: "#666D80",
        padding: "8px 16px",
        border: "2px solid #666D80",
        borderRadius: "4px",
        cursor: "pointer",
        marginRight: "10px",
      }}
    >
      <img
        src={insertIcon}
        alt="Insert"
        style={{
          verticalAlign: "middle",
          marginRight: "5px",
          width: "14px",
          height: "14px",
        }}
      />
      <b>Insert</b>
    </button>
  );
};

export default Insert;
