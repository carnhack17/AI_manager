import React from 'react';
import InboxAnalyzer from './components/InboxAnalyzer';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>⚡ AI Inbox Manager</h1>
          <p>Analyze messages and generate smart responses instantly</p>
        </header>
        <InboxAnalyzer />
      </div>
    </div>
  );
}

export default App;
