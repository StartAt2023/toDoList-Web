import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import MainPage from './pages/MainPage';
import DailyMemoPage from './pages/DailyMemoPage';
import SettingPage from './pages/SettingPage';
import ChartPage from './pages/ChartPage';
import FriendPage from './pages/FriendPage';
import FocusPage from './pages/FocusPage';
import TestPage from './pages/TestPage';
import DebugPage from './pages/DebugPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/daily-memo" element={<DailyMemoPage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/chart" element={<ChartPage />} />
        <Route path="/friend" element={<FriendPage />} />
        <Route path="/focus" element={<FocusPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/debug" element={<DebugPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
