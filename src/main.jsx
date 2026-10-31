import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { GlobalProvider } from './GlobalProvider';
import './index.css';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<GlobalProvider>
			<App />
		</GlobalProvider>
	</StrictMode>,
)
