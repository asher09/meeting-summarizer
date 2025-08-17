'use client';

import React, { useState } from 'react';
import TranscriptInput from './components/TranscriptInput';
import PromptInput from './components/PromptInput';
import SummaryDisplay from './components/SummaryDisplay';
import EmailInput from './components/EmailInput';
import GenerateButton from './components/GenerateButton';
import ShareButton from './components/ShareButton';
import axios from 'axios';

export default function HomePage() {
  const [transcript, setTranscript] = useState('');
  const [prompt, setPrompt] = useState('');
  const [summary, setSummary] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerateSummary() {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/summarize', { transcript, prompt });
      setSummary(response.data.summary);
    } catch (err: unknown) {
      let message = 'Unknown error';
      if (err && typeof err === 'object' && 'message' in err) {
        message = (err as { message: string }).message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleShare() {
    setSharing(true);
    setError(null);
    try {
      await axios.post('/api/share', { summary, email });
      // Optionally show a success message
    } catch (err: unknown) {
      let message = 'Unknown error';
      if (err && typeof err === 'object' && 'message' in err) {
        message = (err as { message: string }).message;
      }
      setError(message);
    } finally {
      setSharing(false);
    }
  }

  return (
    <main 
        style={{ 
            maxWidth: 600, 
            margin: '0 auto', 
            padding: 24 
        }}>
        
        <h1>Meeting Notes Summarizer</h1>

        <div style={{ marginBottom: 16 }}>
            <TranscriptInput 
                transcript={transcript} 
                onChange={setTranscript} 
            />
        </div>

        <div style={{ marginBottom: 16 }}>
            <PromptInput 
                prompt={prompt} 
                onChange={setPrompt} 
            />
        </div>

        <GenerateButton 
            loading={loading} 
            onClick={handleGenerateSummary} 
        />

        <div style={{ marginBottom: 16 }}>
            <SummaryDisplay 
                summary={summary} 
                onChange={setSummary} 
            />
        </div>

        <div style={{ marginBottom: 16 }}>
            <EmailInput 
                email={email} 
                onChange={setEmail} 
            />
        </div>

        <ShareButton 
            sharing={sharing} 
            onClick={handleShare} 
        />

        {error && (
        <div style={{ color: 'red', marginTop: 16 }}>
            {error}
        </div>
        )}
    </main>
    );
}