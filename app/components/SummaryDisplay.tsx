'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });

interface SummaryDisplayProps {
  summary: string;
  onChange: (value: string) => void;
}

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ summary, onChange }) => (
    <div>
        <label htmlFor="summary-display">Summary:</label>
        <textarea
            id="summary-display"
            value={summary}
            onChange={e => onChange(e.target.value)}
            rows={8}
            style={{ width: '100%' }}
            placeholder="Summary will appear here..."
        />
        <div 
            style={{ 
                border: '1px solid #ccc', 
                padding: 8, 
                marginTop: 8 
            }}
        >
            <ReactMarkdown>{summary}</ReactMarkdown>
        </div>
    </div>
);

export default SummaryDisplay;