import { Route, BrowserRouter, Routes } from 'react-router';
import Home from './pages/Home';
import Games from './pages/Games';
import Header from './layout/Header';
import SideBar from './layout/SideBar';
import Cart from './pages/Cart';
import ScrollToTop from './layout/ScrollToTop';
import GameDetails from './pages/GameDetails';

function App() {
  return (
    <div className="font-outfit min-h-screen bg-neutral-950 px-2 text-neutral-200 sm:px-4 md:px-8">
      <BrowserRouter>
        <Header />
        <div className="flex items-start">
          <SideBar />
          <div className="min-h-120vh grow">
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/games" element={<Games />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/games/game/:gameSlug"
                element={<GameDetails />}
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
