import './Footer.css';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-grid">
                <div className="footer-col">
                    <h4 className="footer-title">About</h4>
                    <p className="footer-text">
                        A curated collection of effective prompts for ChatGPT and other AI assistants,
                        curated by <a href="#">the community</a>. While designed for ChatGPT, these prompts
                        can be adapted for Claude, Gemini, Llama, and other language models to help you
                        get more out of AI interactions.
                    </p>
                </div>
                <div className="footer-col">
                    <h4 className="footer-title">Contributing</h4>
                    <p className="footer-text">
                        If you'd like to contribute, please fork the repository and make changes as you'd like.
                        Pull requests are warmly welcome. Please read the{' '}
                        <a href="#">contribution guidelines</a> first.
                    </p>
                </div>
                <div className="footer-col">
                    <h4 className="footer-title">Links</h4>
                    <ul className="footer-links">
                        <li><a href="#"><span className="link-icon">📰</span> Featured on Forbes</a></li>
                        <li><a href="https://github.com/f/awesome-chatgpt-prompts"><span className="link-icon">💻</span> GitHub Repository</a></li>
                        <li><a href="#"><span className="link-icon">🤗</span> Hugging Face Dataset</a></li>
                        <li><a href="#"><span className="link-icon">👀</span> View Unmerged Prompts</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4 className="footer-title">e-Books by @f</h4>
                    <ul className="footer-links">
                        <li><a href="#"><span className="link-icon">📕</span> The Art of ChatGPT Prompting</a></li>
                        <li><a href="#"><span className="link-icon">📗</span> How to Make Money with ChatGPT</a></li>
                        <li><a href="#"><span className="link-icon">📘</span> The Art of Midjourney AI</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
