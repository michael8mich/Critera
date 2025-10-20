import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './layout';
import { Entrepreneur, HomePage } from './pages';
import '../styles/globals.css';
import '../i18n'; // Initialize i18n

const App: React.FC = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/entrepreneur" replace />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/entrepreneur" element={<Entrepreneur />} />
                    {/* Default redirect to entrepreneur as requested */}
                    <Route path="*" element={<Navigate to="/entrepreneur" replace />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;