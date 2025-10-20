import { Route, BrowserRouter, Routes } from 'react-router';
import Home from './pages/Home';
import Games from './pages/Games';
import Header from './layout/Header';
import SideBar from './layout/SideBar';
import Cart from './pages/Cart';

function App() {
  return (
    <div className="font-outfit min-h-screen bg-neutral-950 px-2 text-neutral-200 sm:px-4 md:px-8">
      <BrowserRouter>
        <Header />
        <div className="flex items-start">
          <SideBar />
          <div className="min-h-120vh grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/games" element={<Games />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
