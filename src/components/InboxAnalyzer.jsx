import React, { useState } from 'react';
import axios from 'axios';
import '../styles/InboxAnalyzer.css';

function InboxAnalyzer() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setError('Please enter a message');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Get the API URL from environment or use default
      const apiUrl = process.env.REACT_APP_API_URL || '';

      const response = await axios.post(`${apiUrl}/api/analyze`, {
        message: message.trim(),
      });

      setResult(response.data);
      setMessage('');
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.message ||
        'Failed to analyze message. Please try again.'
      );
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessage('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="analyzer">
      <form onSubmit={handleSubmit} className="analyzer-form">
        <div className="form-group">
          <label htmlFor="message">Paste your message here</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Example: Hello, I would like a refund..."
            disabled={loading}
            rows="5"
          />
        </div>

        <div className="button-group">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Analyze Message'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClear}
            disabled={loading}
          >
            Clear
          </button>
        </div>
      </form>

      {error && (
        <div className="error-box">
          <p className="error-title">❌ Error</p>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="result-box">
          <div className="result-item">
            <div className="result-label">Intent</div>
            <div className="result-value intent">{result.intent}</div>
          </div>

          <div className="result-item">
            <div className="result-label">Sentiment</div>
            <div className={`result-value sentiment ${result.sentiment.toLowerCase()}`}>
              {result.sentiment}
            </div>
          </div>

          <div className="result-item full-width">
            <div className="result-label">Suggested Reply</div>
            <div className="result-value reply">{result.reply}</div>
          </div>
        </div>
      )}

      {!result && !error && !loading && (
        <div className="empty-state">
          <p>👇 Enter a message above to get started</p>
        </div>
      )}
    </div>
  );
}

export default InboxAnalyzer;
