import './App.css';
import Login from './routes/login';
import Signup from './routes/signup';
import Home from './routes/home';
import Contact from './routes/Contact';
import About from './routes/About';
import Dashboard from './routes/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './common/UserContext';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

    </div>
  );
}

export default App;
