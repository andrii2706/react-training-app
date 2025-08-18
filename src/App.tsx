import './App.scss';
import { NaviagtionBar } from './shared/components/navigation-bar/navigation-bar';
import { useLocation, useNavigate } from 'react-router-dom';
import { ApplicationRoutes } from './shared/components/routes/routes.component';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isLoggined = localStorage.getItem('isUserLoggined');
    if (isLoggined === 'true' && location.pathname === '/') {
      navigate('/home');
    }
    if (!isLoggined) {
      localStorage.setItem('isUserLoggined', 'false');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NaviagtionBar>
      <div className="p-20 h-full">
        <ApplicationRoutes />
      </div>
    </NaviagtionBar>
  );
}

export default App;
