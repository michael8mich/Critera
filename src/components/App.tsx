import React from 'react';
import { Layout } from './layout';
import { Entrepreneur } from './pages';
import '../styles/globals.css';
import '../i18n'; // Initialize i18n

const App: React.FC = () => {
    return (
        <Layout>
            <Entrepreneur />
        </Layout>
    );
};

export default App;