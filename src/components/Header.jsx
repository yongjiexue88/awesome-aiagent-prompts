import { useState } from 'react';
import './Header.css';

export default function Header() {
    const [platform, setPlatform] = useState('copilot');
    const [language, setLanguage] = useState('english');
    const [tone, setTone] = useState('professional');
    const [audience, setAudience] = useState('everyone');

    const platforms = [
        { id: 'copilot', name: 'GitHub Copilot', hasIcon: true },
        { id: 'chatgpt', name: 'ChatGPT' },
        { id: 'grok', name: 'Grok' },
        { id: 'claude', name: 'Claude' },
        { id: 'perplexity', name: 'Perplexity' },
        { id: 'mistral', name: 'Mistral' },
        { id: 'gemini', name: 'Gemini' },
        { id: 'meta', name: 'Meta' }
    ];

    return (
        <header className="top-header">
            <div className="header-top-row">
                <div className="branding">
                    <h1 className="site-title">Agentic Prompts Hub</h1>
                    <span className="tagline">World's First & Most Famous Prompts Directory</span>
                    <div className="featured-buttons">
                        <a href="#" className="featured-btn vibe-btn">
                            <span className="btn-icon">💻</span> Vibe Coding Prompts
                        </a>
                        <a href="#" className="featured-btn sponsor-btn">
                            <span className="btn-icon">❤️</span> Improve Your GitHub Sponsors Profile
                        </a>
                    </div>
                </div>
                <div className="header-actions">
                    <div className="cursor-badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M13.64 21.97C13.14 22.21 12.54 22 12.31 21.5L10.13 16.76L7.62 18.78C7.45 18.92 7.24 19 7.02 19C6.55 19 6.15 18.61 6.15 18.14V4.5C6.15 4.22 6.31 3.97 6.56 3.85C6.82 3.74 7.11 3.79 7.32 3.97L18.23 13.26C18.45 13.45 18.54 13.74 18.46 14.02C18.38 14.29 18.15 14.5 17.86 14.55L13.98 15.27L16.15 20C16.38 20.5 16.17 21.1 15.67 21.33L13.64 21.97Z" />
                        </svg>
                        vibecoded with cursor
                    </div>
                    <a href="https://github.com/f/awesome-chatgpt-prompts" target="_blank" rel="noopener noreferrer" className="star-badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                        </svg>
                        <span>138,927</span>
                    </a>
                    <button className="icon-btn" title="Recent">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                    </button>
                    <button className="icon-btn" title="Share">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="18" cy="5" r="3"></circle>
                            <circle cx="6" cy="12" r="3"></circle>
                            <circle cx="18" cy="19" r="3"></circle>
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="platform-row">
                <span className="platform-label">Choose your AI platform</span>
                <div className="platform-pills">
                    {platforms.map((p) => (
                        <button
                            key={p.id}
                            className={`platform-pill ${platform === p.id ? 'active' : ''}`}
                            onClick={() => setPlatform(p.id)}
                        >
                            {p.hasIcon && (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                            )}
                            {p.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="options-row">
                <div className="option-group">
                    <span className="option-label">Reply in</span>
                    <select
                        className="option-select"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                        <option value="chinese">Chinese</option>
                        <option value="japanese">Japanese</option>
                    </select>
                </div>
                <div className="option-group">
                    <span className="option-label">using</span>
                    <select
                        className="option-select"
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                    >
                        <option value="professional">professional</option>
                        <option value="casual">casual</option>
                        <option value="friendly">friendly</option>
                        <option value="formal">formal</option>
                    </select>
                </div>
                <div className="option-group">
                    <span className="option-label">tone, for</span>
                    <select
                        className="option-select"
                        value={audience}
                        onChange={(e) => setAudience(e.target.value)}
                    >
                        <option value="everyone">everyone</option>
                        <option value="experts">experts</option>
                        <option value="beginners">beginners</option>
                        <option value="developers">developers</option>
                    </select>
                </div>
            </div>
        </header>
    );
}
