import { useState } from 'react';
import { usePrompts } from './hooks/usePrompts';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import PromptsGrid from './components/PromptsGrid';
import Footer from './components/Footer';

import PromptModal from './components/PromptModal';
import './styles/index.css';

export default function App() {
  const {
    filteredPrompts,
    loading,
    searchQuery,
    setSearchQuery
  } = usePrompts();

  const [selectedPromptId, setSelectedPromptId] = useState(null);
  const [modalPrompt, setModalPrompt] = useState(null);

  // Sidebar click: Scroll to card
  const handleSidebarClick = (id) => {
    setSelectedPromptId(id);
    setTimeout(() => {
      const card = document.querySelector(`[data-id="${id}"]`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Card click: Open modal
  const handleGridPromptClick = (prompt) => {
    setModalPrompt(prompt);
  };

  return (
    <div className="app-layout">
      <Sidebar
        prompts={filteredPrompts}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onPromptClick={handleSidebarClick}
        selectedId={selectedPromptId}
      />
      <main className="main-area">
        <Header />
        <PromptsGrid
          prompts={filteredPrompts}
          loading={loading}
          onPromptClick={handleGridPromptClick}
        />
        <Footer />
      </main>
      <PromptModal prompt={modalPrompt} onClose={() => setModalPrompt(null)} />
    </div>
  );
}
