import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import IPInfo from 'ip-info-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<IPInfo>
			<App />
		</IPInfo>
	</Provider>
);
