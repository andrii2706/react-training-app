import { useEffect, useState } from 'react';
import { SnackBarInterface } from '../../models/snackbar.interface';

export const SnackBarComponent = ({
  snackBarStatus,
  title = '',
  description = '',
}: SnackBarInterface) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 50);
    const hideTimer = setTimeout(() => setShow(false), 3050);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const getIcon = () => {
    switch (snackBarStatus) {
      case 'success':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case 'error':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case 'warning':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        );
      default:
        return null;
    }
  };
  const getColorClasses = () => {
    switch (snackBarStatus) {
      case 'success':
        return 'bg-green-100 text-green-800 border border-green-300';
      case 'error':
        return 'bg-red-100 text-red-800 border border-red-300';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border';
    }
  };

  return (
    <div className="toast toast-top toast-end">
      <div
        className={`rounded-md px-4 py-3 shadow-lg flex items-start gap-3 ${getColorClasses()} transition-all duration-500 ease-in-out ${
          show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div>{getIcon()}</div>
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};
