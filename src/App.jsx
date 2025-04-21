import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import DeveloperPortal from './pages/DeveloperPortal';
import GamesList from './pages/GamesList';
import NewsPage from './pages/NewsPage';
import BlogsPage from './pages/BlogsPage';
import Login from './components/Login';
import Toast from './components/Toast';
import GamingBackground from './components/GamingBackground';
import styled from 'styled-components';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GamesProvider } from './context/GamesContext';
import Community from './components/Community';

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
  color: #ffffff;
  padding-top: 60px;
`;

const MainContent = styled.main`
  margin-left: ${props => props.isSidebarOpen ? '250px' : '0'};
  transition: margin-left 0.3s ease;
  padding: 20px;
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
`;

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [toast, setToast] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <ThemeProvider>
      <GamesProvider>
        <AuthProvider>
          <Router>
            <AppContainer>
              <GamingBackground />
              <Navbar toggleSidebar={toggleSidebar} />
              <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
              <MainContent isSidebarOpen={isSidebarOpen}>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/developer-portal" element={<DeveloperPortal showToast={showToast} />} />
                  <Route path="/games" element={<GamesList />} />
                  <Route path="/news" element={<NewsPage />} />
                  <Route path="/community" element={<BlogsPage />} />
                  <Route path="/posts" element={<Community />} />
                </Routes>
              </MainContent>
              <Footer />
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
              {toast && (
                <Toast
                  message={toast.message}
                  type={toast.type}
                  onClose={() => setToast(null)}
                />
              )}
            </AppContainer>
          </Router>
        </AuthProvider>
      </GamesProvider>
    </ThemeProvider>
  );
}

export default App; 