import { useState, useEffect } from 'react';
import { getPrompts } from '../services/firebase';

// Load from local JSON file (fallback)
async function fetchLocalPrompts() {
    try {
        const response = await fetch('/prompts.json');
        const data = await response.json();
        return data.prompts || [];
    } catch (err) {
        console.error('Error fetching local prompts:', err);
        return [];
    }
}

export function usePrompts() {
    const [prompts, setPrompts] = useState([]);
    const [filteredPrompts, setFilteredPrompts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function loadPrompts() {
            try {
                setLoading(true);

                // Try Firestore first
                let data = await getPrompts();

                // Fallback to local JSON if Firestore is empty
                if (!data || data.length === 0) {
                    console.log('Firestore empty, loading from local JSON...');
                    data = await fetchLocalPrompts();
                } else {
                    console.log(`Loaded ${data.length} prompts from Firestore`);
                }

                setPrompts(data);
                setFilteredPrompts(data);
            } catch (err) {
                console.error('Error loading prompts:', err);
                // Try local fallback on error
                const localData = await fetchLocalPrompts();
                setPrompts(localData);
                setFilteredPrompts(localData);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadPrompts();
    }, []);

    // Filter prompts based on search query
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredPrompts(prompts);
        } else {
            const query = searchQuery.toLowerCase();
            const filtered = prompts.filter(prompt =>
                prompt.title?.toLowerCase().includes(query) ||
                prompt.prompt?.toLowerCase().includes(query)
            );
            setFilteredPrompts(filtered);
        }
    }, [searchQuery, prompts]);

    return {
        prompts,
        filteredPrompts,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        totalCount: prompts.length,
        filteredCount: filteredPrompts.length
    };
}
