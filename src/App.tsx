import './App.scss';
import { Games } from './pages/games/Games.component';
import { NaviagtionBar } from './shared/components/navigation-bar/navigation-bar';
import { Link, BrowserRouter, Routes } from 'react-router-dom';

function App() {
const sideNavItems = (
  <>
    <li>
      <Link to="/characters">Characters</Link>
    </li>
    <li>
      <Link to="/episodes">Developers</Link>
    </li>
    <li>
      <Link to="/locations">Locations</Link>
    </li>
    <li>
      <Link to="/my-watch-list">My Watch list</Link>
    </li>
  </>
)
  return (
    <BrowserRouter>
      <NaviagtionBar routes={sideNavItems} >
       <Routes>
        
       </Routes>
      </NaviagtionBar>   
    </BrowserRouter>
  );
}

export default App;
