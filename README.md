# Prompts.chat (React Version)

A modern, responsive version of [Prompts.chat](https://prompts.chat) built with React, Vite, and Firebase.

🚀 **Live Demo:** [https://awesome-aiagent-prompts.web.app](https://awesome-aiagent-prompts.web.app)

## Features

- **Modern Stack:** Built with React 18 and Vite for fast performance.
- **Firebase Backend:** Uses Firestore for real-time data persistence.
- **Responsive Design:** Fully responsive 3-column layout with a dark theme.
- **Search & Filter:** Instant search and filtering by platform (ChatGPT, GitHub Copilot, etc.).
- **Interactive:** functionality to copy prompts, expand details, and share.

## Tech Stack

- **Frontend:** React, Vite, CSS (Variables)
- **Backend:** Firebase Firestore
- **Hosting:** Firebase Hosting

## Getting Started

### Prerequisites

- Node.js installed
- Firebase CLI installed (`npm install -g firebase-tools`)

### Local Development

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd website-react
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables:**
    Create a `.env` file in the root directory (copy from `.env.example`) and add your Firebase configuration:
    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment

This project is configured for **Firebase Hosting**.

1.  **Build the project:**
    ```bash
    npm run build
    ```

2.  **Deploy to Firebase:**
    ```bash
    firebase deploy --only hosting
    ```

## Data Management

The app includes an **Admin Panel** (visible in dev mode or configurable) to help manage data.
- **Upload:** You can batch upload prompts from `prompts.json` to Firestore.
- **Rules:** Firestore security rules are currently set to public for development. Update them in the Firebase Console for production.
