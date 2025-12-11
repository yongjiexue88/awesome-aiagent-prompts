import { useState } from 'react';
import './PromptCard.css';

export default function PromptCard({ prompt, onClick }) {
    const [copied, setCopied] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const handleCopy = async (e) => {
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(prompt.prompt);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleExpand = (e) => {
        e.stopPropagation();
        setExpanded(!expanded);
    };

    const handleShare = async (e) => {
        e.stopPropagation();
        if (navigator.share) {
            try {
                await navigator.share({
                    title: prompt.title,
                    text: prompt.prompt,
                    url: window.location.href
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        }
    };

    const truncatedContent = !expanded && prompt.prompt?.length > 250
        ? prompt.prompt.substring(0, 250) + '...'
        : prompt.prompt;

    return (
        <article className="prompt-card" onClick={onClick} style={{ cursor: 'pointer' }}>
            <div className="prompt-header">
                <h3 className="prompt-title">{prompt.title}</h3>
                <div className="action-buttons">
                    <button
                        className={`action-btn ${copied ? 'copied' : ''}`}
                        onClick={handleCopy}
                        title="Copy prompt"
                    >
                        {copied ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        )}
                    </button>
                    <button
                        className="action-btn"
                        onClick={handleExpand}
                        title={expanded ? "Collapse" : "Expand"}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <polyline points="9 21 3 21 3 15"></polyline>
                            <line x1="21" y1="3" x2="14" y2="10"></line>
                            <line x1="3" y1="21" x2="10" y2="14"></line>
                        </svg>
                    </button>
                    <button
                        className="action-btn"
                        onClick={handleShare}
                        title="Share"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="18" cy="5" r="3"></circle>
                            <circle cx="6" cy="12" r="3"></circle>
                            <circle cx="18" cy="19" r="3"></circle>
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                        </svg>
                    </button>
                </div>
            </div>
            <p className={`prompt-content ${expanded ? 'expanded' : ''}`}>
                {truncatedContent}
            </p>

        </article>
    );
}
