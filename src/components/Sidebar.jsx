import { useState } from 'react';
import './Sidebar.css';

export default function Sidebar({ prompts, searchQuery, onSearchChange, onPromptClick, selectedId }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const cleanTitle = (title) => {
        return title
            ?.replace('Act as ', '')
            .replace('Act as a ', '')
            .replace('Act as an ', '') || title;
    };

    return (
        <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <button
                className="sidebar-toggle-btn"
                onClick={() => setIsCollapsed(!isCollapsed)}
                title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
                {isCollapsed ? '>>' : '<<'}
            </button>

            <div className={`sidebar-content ${isCollapsed ? 'hidden' : ''}`}>
                <div className="sidebar-header">
                    <span className="sidebar-title">All Prompts</span>
                    <span className="sidebar-count">{prompts.length}</span>
                </div>
                <div className="sidebar-search">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search prompts..."
                    />
                </div>
                <nav className="sidebar-nav">
                    {prompts.map((prompt) => (
                        <div
                            key={prompt.id}
                            className={`sidebar-item ${selectedId === prompt.id ? 'active' : ''}`}
                            onClick={() => onPromptClick(prompt.id)}
                        >
                            {cleanTitle(prompt.title)}
                        </div>
                    ))}
                </nav>
            </div>
        </aside>
    );
}
