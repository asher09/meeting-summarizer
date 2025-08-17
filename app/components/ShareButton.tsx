'use client';

import React from 'react';

interface ShareButtonProps {
  sharing: boolean;
  onClick: () => void;
}

const ShareButton: React.FC<ShareButtonProps> = ({ sharing, onClick }) => (
    <button 
        onClick={onClick} 
        disabled={sharing} 
        style={{ marginBottom: 16 }}
    >
        {sharing ? 'Sharing...' : 'Share'}
    </button>
);

export default ShareButton;