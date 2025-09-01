import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/auth/SplashScreen';
import LoginPage from './components/auth/LoginPage';
import SignUp from './components/auth/SignUp';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}
