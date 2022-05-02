import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/header';
// import Footer from './components/footer';
// import Home from './components/home';
// import Product from './components/product';
import SignIn from './components/signin';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<SignIn />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;