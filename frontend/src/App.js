import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SignIn from './components/Signin';
import Home from './components/Home';
import Menu from './components/Menu';
import MonthlyMenu from './components/MonthlyMenu';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/menu/:month" element={<MonthlyMenu />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;