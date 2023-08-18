// Libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

// Redux
import { store } from '@redux/store.jsx';

// Global styles
import '~/index.css';

// Components
import App from '~/App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
