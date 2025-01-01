// src/App.js

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FollowerDetails from './pages/FollowerDetails';
import RepositoryDetailsPage from './pages/RepositoryDetailsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/followers" element={<FollowerDetails />} />
        <Route path="/repository" element={<RepositoryDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;