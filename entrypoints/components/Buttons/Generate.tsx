import React from 'react';
import generateIcon from '~/assets/generate.svg';
import regenerateIcon from '~/assets/regenerate.svg';

interface GenerateProps {
  handleGenerateClick: (e: React.MouseEvent) => void;
  isGenerating: boolean;
  insertButtonVisible: boolean;
}

const Generate: React.FC<GenerateProps> = ({ handleGenerateClick, isGenerating, insertButtonVisible }) => {
  return (
    <div className=''>
    <button className=' border border-red-500 rounded-md px-4 py-2 m-2'
      id="generate-btn"
      onClick={handleGenerateClick}
      style={{
        background: isGenerating ? '#ccc' : '#0073b1',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '10px 20px',
        cursor: insertButtonVisible ? 'not-allowed' : 'pointer',
        opacity: insertButtonVisible ? 0.5 : 1,
        marginRight: '8px',
 
      }}
      disabled={isGenerating || insertButtonVisible}
    >
      {isGenerating ? (
        <img src={regenerateIcon} alt="Regenerate Icon" style={{ width: '16px', height: '16px' }} />
      ) : (
        <img src={generateIcon} alt="Generate Icon" style={{ width: '16px', height: '16px' }} />
      )}
      {isGenerating ? 'Generating...' : 'Generate'}
    </button>
    </div>
  );
};

export default Generate;