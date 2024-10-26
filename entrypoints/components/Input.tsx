import React from "react";
import "../../assets/tailwind.css"
interface InputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ inputValue, setInputValue }) => {
  return (
    <div className="mb-2"> 
      <input
        id="input-text"
        type="text"
        placeholder="Enter your prompt..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded" 
      />
    </div>
  );
};

export default Input;
