import './App.scss';
import { AuthComponent } from './pages/auth/auth';
import { NaviagtionBar } from './shared/components/navigation-bar/navigation-bar';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApplicationRoutes } from './shared/components/routes/routes.component';

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
  );
  return (
    <BrowserRouter>
      <NaviagtionBar routes={sideNavItems}>
        <AuthComponent />
        <ApplicationRoutes />
      </NaviagtionBar>
    </BrowserRouter>
  );
}

export default App;
