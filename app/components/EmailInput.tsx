'use client';

import React from 'react';

interface EmailInputProps {
  email: string;
  onChange: (value: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ email, onChange }) => (
    <div>
        <label htmlFor="email-input">Email(s):</label>
        <input
            id="email-input"
            type="email"
            value={email}
            onChange={e => onChange(e.target.value)}
            style={{ width: '100%' }}
            placeholder="Enter email address"
        />
    </div>
);

export default EmailInput;