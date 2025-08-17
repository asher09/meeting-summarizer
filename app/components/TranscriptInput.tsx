'use client';

import React from 'react';

interface TranscriptInputProps {
  transcript: string;
  onChange: (value: string) => void;
}

const TranscriptInput: React.FC<TranscriptInputProps> = ({ transcript, onChange }) => (
    <div>
        <label htmlFor="transcript-input">Meeting Transcript:</label>
        <textarea
            id="transcript-input"
            value={transcript}
            onChange={e => onChange(e.target.value)}
            rows={8}
            style={{ width: '100%' }}
            placeholder="Paste your meeting transcript here..."
        />
    </div>
    );

export default TranscriptInput;