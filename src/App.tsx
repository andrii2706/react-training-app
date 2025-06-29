import './App.scss';
import { NaviagtionBar } from './shared/components/navigation-bar/navigation-bar';
import { Link, BrowserRouter } from 'react-router-dom';
import { ApplicationRoutes } from './shared/components/routes/routes.component';

function App() {
  const sideNavItems = (
    <>
      <li>
        <Link to="/home" title="Home">
          Home
        </Link>
      </li>
      <li>
        <Link to="/characters" title="Characters">
          Characters
        </Link>
      </li>
      <li>
        <Link to="/episodes" title="Episodes">
          Episodes
        </Link>
      </li>
      <li>
        <Link to="/locations" title="Locations">
          Locations
        </Link>
      </li>
      <li>
        <Link to="/my-watch-list" title="My Watch list">
          My Watch list
        </Link>
      </li>
    </>
  );
  const localStorageCheck = () => {
    const isLoggined = localStorage.getItem('isUserLoggined');
    return isLoggined ? isLoggined : localStorage.setItem('isUserLoggined', 'false');
  };
  localStorageCheck();
  return (
    <BrowserRouter>
      <NaviagtionBar routes={sideNavItems}>
        <div className="p-20 h-full">
          <ApplicationRoutes />
        </div>
      </NaviagtionBar>
    </BrowserRouter>
  );
}

export default App;
