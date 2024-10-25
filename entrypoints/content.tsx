
import LinkedInModal from './components/LinkedInModal';
import { createRoot } from 'react-dom/client';


export default defineContentScript({
  matches: ['*://*.linkedin.com/*'],
  main() {
    const modalContainer = document.createElement('div');
    document.body.appendChild(modalContainer);
    const root = createRoot(modalContainer);
    root.render(<LinkedInModal />);
  },
});