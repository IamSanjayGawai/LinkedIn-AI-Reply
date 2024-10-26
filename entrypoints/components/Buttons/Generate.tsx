import React from "react";
import "../../../assets/tailwind.css";

interface GenerateProps {
  handleGenerateClick: (e: React.MouseEvent) => void;
  isGenerating: boolean;
  insertButtonVisible: boolean;
}

const Generate: React.FC<GenerateProps> = ({
  handleGenerateClick,
  isGenerating,
  insertButtonVisible,
}) => {
  return (
    <button
      id="generate-btn"
      onClick={handleGenerateClick}
      className={`${
        isGenerating ? "bg-gray-300" : "bg-[#3B82F6]"
      } text-white rounded px-8 py-2.5 mr-2 flex flex-row justify-center items-center gap-3 ${
        insertButtonVisible ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      }`}
      disabled={isGenerating || insertButtonVisible}
    >
      {insertButtonVisible ? (
        <>
          <svg
            width="15"
            height="24"
            viewBox="0 0 17 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.5 3.24541V0L4.25 4.32724L8.5 8.65459V5.40903C12.006 5.40903 14.875 8.32995 14.875 11.9C14.875 12.9818 14.6094 14.0098 14.131 14.929L15.6719 16.4978C16.5217 15.1454 17 13.5766 17 11.9C17 7.14005 13.1749 3.24541 8.5 3.24541ZM8.5 18.391C4.9937 18.391 2.125 15.4698 2.125 11.9C2.125 10.8182 2.39062 9.79046 2.8687 8.87081L1.32812 7.30224C0.478072 8.60041 0 10.2232 0 11.9C0 16.6599 3.82511 20.5546 8.5 20.5546V23.8L12.75 19.4728L8.5 15.1454V18.391Z"
              fill="white"
            />
          </svg>
        </>
      ) : (
        <>
          <svg
            width="20"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.456 11.6075L2.45599 0.607504C2.28356 0.521271 2.08988 0.486719 1.89827 0.508009C1.70665 0.529299 1.52528 0.605523 1.37599 0.727504C1.23341 0.846997 1.12699 1.00389 1.0687 1.18055C1.0104 1.35721 1.00254 1.54662 1.04599 1.7275L4.00599 12.4975L1.00599 23.2375C0.965214 23.3886 0.960455 23.5471 0.992092 23.7003C1.02373 23.8535 1.09088 23.9972 1.18815 24.1198C1.28541 24.2423 1.41008 24.3403 1.55212 24.4059C1.69416 24.4715 1.84962 24.5029 2.00599 24.4975C2.16253 24.4966 2.31667 24.4589 2.45599 24.3875L24.456 13.3875C24.6198 13.3036 24.7573 13.1761 24.8532 13.0191C24.9492 12.862 25 12.6816 25 12.4975C25 12.3135 24.9492 12.133 24.8532 11.9759C24.7573 11.8189 24.6198 11.6914 24.456 11.6075ZM3.55599 21.6075L5.76599 13.4975H15.006V11.4975H5.76599L3.55599 3.3875L21.766 12.4975L3.55599 21.6075Z"
              fill="white"
            />
          </svg>
        </>
      )}
      {isGenerating ? "Generating..." : "Generate"}
    </button>
  );
};

export default Generate;
