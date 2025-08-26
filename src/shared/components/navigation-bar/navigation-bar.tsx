import React from 'react';
import { Link } from 'react-router-dom';

export function NaviagtionBar({ children }: { children: React.ReactNode }) {
  const isLoggined = JSON.parse(localStorage.getItem('isUserLoggined') || 'false');
  const logoutUser = () => {
    localStorage.setItem('isUserLoggined', 'false');
  };

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar flex justify-between items-center bg-base-300 w-full">
          <div className="mx-2 px-2">
            {isLoggined && (
              <Link to="/home" title="Home">
                Rick And Morty
              </Link>
            )}
            {!isLoggined && (
              <Link to="/" title="Home">
                Rick And Morty
              </Link>
            )}
          </div>
          {isLoggined && (
            <div>
              <Link to="/characters" title="Characters">
                Characters
              </Link>
              <Link className="mx-5" to="/episodes" title="Episodes">
                Episodes
              </Link>
              <Link to="/locations" title="Locations">
                Locations
              </Link>
            </div>
          )}
          {isLoggined && (
            <div className="flex-none">
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/profile" title="Profile" className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" title="Setting of Profile">
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button onClick={logoutUser}>
                      {' '}
                      <Link to="/">Logout</Link>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
