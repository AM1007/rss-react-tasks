import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import CharacterDetails from './pages/CharacterDetails';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Flyout from './features/selectedItems/Flyout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="details/:detailsId" element={<CharacterDetails />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Flyout />
    </>
  );
}

export default App;
