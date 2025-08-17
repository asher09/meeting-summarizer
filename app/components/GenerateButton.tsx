'use client';

import React from 'react';

interface GenerateButtonProps {
  loading: boolean;
  onClick: () => void;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ loading, onClick }) => (
    <button 
        onClick={onClick} 
        disabled={loading} 
        style={{ marginBottom: 16 }}>
        {loading ? 'Generating...' : 'Generate Summary'}
    </button>
);

export default GenerateButton;