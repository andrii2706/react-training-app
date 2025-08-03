import './App.scss';
import { NaviagtionBar } from './shared/components/navigation-bar/navigation-bar';
import { Link, useNavigate } from 'react-router-dom';
import { ApplicationRoutes } from './shared/components/routes/routes.component';
import { useCallback, useEffect } from 'react';

function App() {
  const navigate = useNavigate();

  const localStorageCheck = useCallback(() => {
    const isLoggined = localStorage.getItem('isUserLoggined');
    if (isLoggined === 'true') {
      navigate('/home');
    }
    if (!isLoggined) {
      localStorage.setItem('isUserLoggined', 'false');
    }
  }, [navigate]);

  useEffect(() => {
    localStorageCheck();
  }, [localStorageCheck]);
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
  return (
    <NaviagtionBar routes={sideNavItems}>
      <div className="p-20 h-full">
        <ApplicationRoutes />
      </div>
    </NaviagtionBar>
  );
}

export default App;
