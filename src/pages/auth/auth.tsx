import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SignInInterface } from '../../shared/models/authForm.inteface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import {
  registerUser,
  signInWithCredentials,
  signIsWithGoogle,
} from '../../api-services/auth.service';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SnackBarComponent } from '../../shared/components/snackbar/snackBar.component';

export const AuthComponent = () => {
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors },
  } = useForm<SignInInterface>();

  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    formState: { errors: registerErrors },
  } = useForm<SignInInterface>();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [snackBarSuccess, showSnackBarSuccess] = useState(false);
  const [snackBarError, showSnackBarError] = useState(false);
  const [snackBarWarning, showSnackBarWarning] = useState(false);
  const [registerForm, showRegisterForm] = useState(false);

  const onSignIn = (data: SignInInterface) => {
    signInWithCredentials(data.email, data.password, dispatch)
      .then(successCase => {
        if (successCase) {
          localStorage.setItem('isUserLoggined', 'true');
          navigate('/home');
          showSnackBarSuccess(true);
          showSnackBarError(false);
        } else {
          localStorage.setItem('isUserLoggined', 'false');
          showSnackBarWarning(true);
          showSnackBarError(false);
          showSnackBarSuccess(false);
        }
      })
      .catch(error => {
        if (error) {
          showSnackBarError(true);
          showSnackBarSuccess(false);
          showSnackBarWarning(true);
        }
      });
  };

  const googleSignIn = async () => {
    await signIsWithGoogle(dispatch)
      .then(successCase => {
        if (successCase) {
          localStorage.setItem('isUserLoggined', 'true');
          navigate('/home');
          showSnackBarSuccess(true);
          showSnackBarError(false);
        } else {
          localStorage.setItem('isUserLoggined', 'false');
          showSnackBarWarning(true);
          showSnackBarError(false);
          showSnackBarSuccess(false);
        }
      })
      .catch(error => {
        if (error) {
          showSnackBarError(true);
          showSnackBarSuccess(false);
        }
      });
  };

  const registerUserWithCredentials = async (data: SignInInterface) => {
    await registerUser(data.email, data.password, dispatch)
      .then(successCase => {
        if (successCase) {
          localStorage.setItem('isUserLoggined', 'true');
          navigate('/home');
          showSnackBarSuccess(true);
          showSnackBarError(false);
        } else {
          localStorage.setItem('isUserLoggined', 'false');
          showSnackBarWarning(true);
          showSnackBarError(false);
          showSnackBarSuccess(false);
        }
      })
      .catch(error => {
        showSnackBarError(true);
        showSnackBarSuccess(false);
      });
  };

  return (
    <>
      {!registerForm && (
        <form
          className="my-6 flex justify-center items-center flex-col"
          onSubmit={handleSubmitLogin(onSignIn)}
        >
          <input
            className={`input input-md mb-2 ${loginErrors.email ? 'input-error' : ''}`}
            type="text"
            {...registerLogin('email', { required: 'Login is required' })}
          />
          {loginErrors.email && <p>{loginErrors.email.message}</p>}

          <input
            className={`input input-md mb-2 ${loginErrors.password ? 'input-error' : ''}`}
            type="password"
            {...registerLogin('password', { required: 'Password is required' })}
          />
          {loginErrors.password && <p>{loginErrors.password.message}</p>}

          <button className="btn btn-soft mx-4" type="submit">
            Sign In
          </button>
        </form>
      )}

      {registerForm && (
        <form
          className="my-6 flex justify-center items-center flex-col"
          onSubmit={handleSubmitRegister(registerUserWithCredentials)}
        >
          <input
            className={`input input-md mb-2 ${registerErrors.email ? 'input-error' : ''}`}
            type="text"
            {...registerRegister('email', { required: 'Login is required' })}
          />
          {registerErrors.email && <p>{registerErrors.email.message}</p>}

          <input
            className={`input input-md mb-2 ${registerErrors.password ? 'input-error' : ''}`}
            type="password"
            {...registerRegister('password', { required: 'Password is required' })}
          />
          {registerErrors.password && <p>{registerErrors.password.message}</p>}

          <button className="btn btn-soft mx-4" type="submit">
            Register
          </button>
        </form>
      )}

      <div className="flex justify-center items-center">
        <button className="btn btn-soft" onClick={() => showRegisterForm(!registerForm)}>
          {registerForm ? 'Go to Login' : 'Go to Register'}
        </button>

        <button onClick={googleSignIn} className="ml-5 btn btn-soft btn-square">
          <FontAwesomeIcon icon={faGoogle} />
        </button>
      </div>

      <div>
        {snackBarSuccess && (
          <SnackBarComponent
            snackBarStatus="success"
            title="Success"
            description="You have been loggined Successfully"
          />
        )}
        {snackBarError && (
          <SnackBarComponent
            snackBarStatus="error"
            title="Opps!! we have an error"
            description="We have an error with login, please wait some time"
          />
        )}
        {snackBarWarning && (
          <SnackBarComponent
            snackBarStatus="warning"
            title="Warning Issue"
            description="Opps!! Update page or contact with our support"
          />
        )}
      </div>
    </>
  );
};
