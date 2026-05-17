import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import About from './pages/About';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
