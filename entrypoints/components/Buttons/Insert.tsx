import React from "react";
import "../../../assets/tailwind.css";

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
      className="bg-white text-gray-600 px-4 py-2 rounded cursor-pointer mr-2 flex justify-center items-center gap-2"
      style={{
        borderWidth: "2px",
        borderColor: "#666D80",
        borderStyle: "solid",
      }}
    >
      <svg
        width="12"
        height="17"
        viewBox="0 0 15 17"
        fill="gray"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.1 12.3666V1.43331C6.1 1.05553 6.228 0.739087 6.484 0.483976C6.74 0.228865 7.05644 0.100864 7.43333 0.0999756C7.81111 0.0999756 8.128 0.227976 8.384 0.483976C8.64 0.739976 8.76756 1.05642 8.76667 1.43331V12.3666L12.6333 8.49998C12.8778 8.25553 13.1889 8.13331 13.5667 8.13331C13.9444 8.13331 14.2556 8.25553 14.5 8.49998C14.7444 8.74442 14.8667 9.05553 14.8667 9.43331C14.8667 9.81109 14.7444 10.1222 14.5 10.3666L8.36667 16.5C8.1 16.7666 7.78889 16.9 7.43333 16.9C7.07778 16.9 6.76667 16.7666 6.5 16.5L0.366666 10.3666C0.122222 10.1222 0 9.81109 0 9.43331C0 9.05553 0.122222 8.74442 0.366666 8.49998C0.611111 8.25553 0.922222 8.13331 1.3 8.13331C1.67778 8.13331 1.98889 8.25553 2.23333 8.49998L6.1 12.3666Z"
          fill="#666D80"
        />
      </svg>
      <b>Insert</b>
    </button>
  );
};

export default Insert;
