import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SignIn from './pages/Signin';
import Home from './pages/Home';
import Menu from './pages/Menu';
import MonthlyMenu from './pages/MonthlyMenu';
import Inbody from './pages/Inbody';
import Record from './pages/Record';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/menu">
                        <Route path="" element={<Menu />} />
                        <Route path=":month" element={<MonthlyMenu />} />
                    </Route>
                    <Route path="/inbody" element={<Inbody />} />
                    <Route path="/record" element={<Record />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;