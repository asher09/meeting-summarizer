'use client';

import React from 'react';

interface PromptInputProps {
  prompt: string;
  onChange: (value: string) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, onChange }) => (
    <div>
        <label htmlFor="prompt-input">Custom Prompt:</label>
        <textarea
            id="prompt-input"
            value={prompt}
            onChange={e => onChange(e.target.value)}
            rows={3}
            style={{ width: '100%' }}
            placeholder="Enter your custom prompt here..."
        />
    </div>
);

export default PromptInput;