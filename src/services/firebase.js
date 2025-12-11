// Firebase configuration
import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    writeBatch
} from 'firebase/firestore';

// Firebase config from environment variables
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Prompts collection reference
const promptsCollection = collection(db, 'prompts');

// Get all prompts
export async function getPrompts() {
    try {
        const snapshot = await getDocs(promptsCollection);
        const prompts = snapshot.docs.map(doc => ({
            docId: doc.id,
            ...doc.data()
        }));
        // Sort by id in JavaScript (avoids Firestore index requirement)
        return prompts.sort((a, b) => (a.id || 0) - (b.id || 0));
    } catch (error) {
        console.error('Error fetching prompts from Firestore:', error);
        return [];
    }
}

// Add a new prompt
export async function addPrompt(promptData) {
    const docRef = await addDoc(promptsCollection, {
        ...promptData,
        createdAt: new Date()
    });
    return docRef.id;
}

// Update a prompt
export async function updatePrompt(docId, promptData) {
    const promptRef = doc(db, 'prompts', docId);
    await updateDoc(promptRef, promptData);
}

// Delete a prompt
export async function deletePrompt(docId) {
    const promptRef = doc(db, 'prompts', docId);
    await deleteDoc(promptRef);
}

// Batch upload prompts (for initial data migration)
export async function batchUploadPrompts(prompts) {
    const batchSize = 500; // Firestore batch limit
    let uploaded = 0;

    for (let i = 0; i < prompts.length; i += batchSize) {
        const batch = writeBatch(db);
        const chunk = prompts.slice(i, i + batchSize);

        chunk.forEach((prompt) => {
            const docRef = doc(promptsCollection);
            batch.set(docRef, {
                id: prompt.id,
                title: prompt.title,
                prompt: prompt.prompt,
                createdAt: new Date()
            });
        });

        await batch.commit();
        uploaded += chunk.length;
        console.log(`Uploaded ${uploaded}/${prompts.length} prompts`);
    }

    return uploaded;
}

export { db };
