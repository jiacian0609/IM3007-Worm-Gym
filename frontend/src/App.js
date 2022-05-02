import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SignIn from './components/signin';
import Home from './components/home';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;