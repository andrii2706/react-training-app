import React from 'react';
import { Link } from 'react-router-dom';

export function NaviagtionBar({
  children,
  routes,
}: {
  children: React.ReactNode;
  routes: React.ReactNode;
}) {
  const isLoggined = JSON.parse(localStorage.getItem('isUserLoggined') || 'false');
  const logoutUser = () => {
    localStorage.setItem('isUserLoggined', 'false');
  };

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-300 w-full">
          {isLoggined && (
            <div className="flex-none">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
          )}
          <div className="mx-2 flex-1 px-2">
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
            <div className="flex-none">
              <div className="dropdown dropdown-end mr-3">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {' '}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />{' '}
                    </svg>
                    <span className="badge badge-sm indicator-item">10</span>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
                >
                  <div className="card-body">
                    <span className="text-lg font-bold">Items:</span>
                    <span>10</span>
                    <span className="text-info">Your wish list </span>
                    <div className="card-actions">
                      <button className="btn btn-primary btn-block">Your wish list</button>
                    </div>
                  </div>
                </div>
              </div>
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
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-80 px-4 pb-4 pt-8">{routes}</ul>
      </div>
    </div>
  );
}
