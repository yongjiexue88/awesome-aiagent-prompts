import { useEffect } from 'react';
import './PromptModal.css';

export default function PromptModal({ prompt, onClose }) {
    if (!prompt) return null;

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(prompt.prompt);
            // Optional: Show feedback (toast?)
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    const handleOutsideClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOutsideClick}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">{prompt.title}</h2>
                    <div className="modal-actions">
                        <button className="icon-btn" onClick={handleCopy} title="Copy prompt">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        </button>
                        <button className="icon-btn" onClick={onClose} title="Close">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="modal-body">
                    <p>{prompt.prompt}</p>
                </div>

                <div className="modal-footer">
                    <div className="contributor">
                        Contributed by <span className="author">@{prompt.contributor || 'Community'}</span>
                    </div>
                    <div className="footer-actions">
                        <button className="btn btn-secondary">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M16 18l6-6-6-6"></path>
                                <path d="M8 6l-6 6 6 6"></path>
                            </svg>
                            Embed
                        </button>
                        <button className="btn btn-primary">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                            Chat with Perplexity
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
