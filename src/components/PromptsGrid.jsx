import PromptCard from './PromptCard';
import './PromptsGrid.css';

export default function PromptsGrid({ prompts, loading, onPromptClick }) {
    if (loading) {
        return (
            <section className="prompts-grid">
                <div className="loading">
                    <div className="loading-spinner"></div>
                </div>
            </section>
        );
    }

    if (prompts.length === 0) {
        return (
            <section className="prompts-grid">
                <p className="empty-state">No prompts found matching your search.</p>
            </section>
        );
    }

    return (
        <section className="prompts-grid">
            {prompts.map((prompt) => (
                <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                    onClick={() => onPromptClick(prompt)}
                />
            ))}
        </section>
    );
}
