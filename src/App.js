import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieDetails from './components/MovieDetails';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';


function App() {
  return (
    <UserProvider>
      <Router>
         <NavBar className="glass-navbar" />
      <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/home" element={<Home />} />
       <Route path="/login" element={<Login />} />
       <Route path="/admin-dashboard" element={<AdminDashboard />} />
       <Route path="/movies/:movieId" element={<MovieDetails />} /> 
       <Route path="/profile" element={<Profile />} /> 
       </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
