import { useState } from 'react';
import { batchUploadPrompts, getPrompts } from '../services/firebase';
import './AdminPanel.css';

export default function AdminPanel() {
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [firestoreCount, setFirestoreCount] = useState(null);

    const handleUpload = async () => {
        try {
            setUploading(true);
            setMessage('Loading prompts from local JSON...');

            // Fetch local prompts
            const response = await fetch('/prompts.json');
            const data = await response.json();
            const prompts = data.prompts;

            setMessage(`Uploading ${prompts.length} prompts to Firestore...`);

            // Upload to Firestore
            const uploaded = await batchUploadPrompts(prompts);

            setMessage(`✅ Successfully uploaded ${uploaded} prompts to Firestore!`);

            // Update count
            await checkFirestoreCount();
        } catch (error) {
            console.error('Upload error:', error);
            setMessage(`❌ Error: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    const checkFirestoreCount = async () => {
        try {
            const prompts = await getPrompts();
            setFirestoreCount(prompts.length);
        } catch (error) {
            console.error('Error checking Firestore:', error);
            setFirestoreCount(-1);
        }
    };

    return (
        <div className="admin-panel">
            <h2>Admin Panel</h2>
            <p className="admin-description">
                Upload the local prompts.json data to Firestore.
            </p>

            <div className="admin-actions">
                <button
                    className="admin-btn check-btn"
                    onClick={checkFirestoreCount}
                    disabled={uploading}
                >
                    Check Firestore
                </button>

                <button
                    className="admin-btn upload-btn"
                    onClick={handleUpload}
                    disabled={uploading}
                >
                    {uploading ? 'Uploading...' : 'Upload to Firestore'}
                </button>
            </div>

            {firestoreCount !== null && (
                <p className="admin-count">
                    Firestore has: <strong>{firestoreCount === -1 ? 'Error' : `${firestoreCount} prompts`}</strong>
                </p>
            )}

            {message && (
                <div className="admin-message">
                    {message}
                </div>
            )}
        </div>
    );
}
