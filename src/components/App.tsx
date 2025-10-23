import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './layout';
import { Banker, HomePage } from './pages';
import '../styles/globals.css';
import '../i18n'; // Initialize i18n

const App: React.FC = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/banker" replace />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/banker" element={<Banker />} />
                    {/* Legacy route for backward compatibility */}
                    <Route path="/entrepreneur" element={<Navigate to="/banker" replace />} />
                    {/* Default redirect to banker as requested */}
                    <Route path="*" element={<Navigate to="/banker" replace />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;