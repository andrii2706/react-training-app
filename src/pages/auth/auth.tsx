import React from 'react';
import { useForm } from 'react-hook-form';
import { SignInInterface } from '../../shared/models/authForm.inteface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import {  signIsWithGoogle } from '../../api-services/auth.service';
import { useDispatch } from 'react-redux';

export const AuthComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInterface>();
    const dispatch = useDispatch()
    

  const onSignIn = (data: SignInInterface) => {
    console.log(data);
  };
  const googleSignIn = async () => {
      await signIsWithGoogle(dispatch)
  }


  return (
    <>
      <form
        className="my-6 flex justify-center items-center flex-col"
        onSubmit={handleSubmit(onSignIn)}
      >
        <input
          className={`input input-md mb-2 ${errors.email ? 'input-error' : ''} `}
          type="text"
          {...register('email', { required: 'Login is required' })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          className={`input input-md mb-2 ${errors.password ? 'input-error' : ''} `}
          type="password"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </form>
      <div className="flex justify-center items-center">
          <button className="btn btn-soft">Register</button>
          <button className="btn btn-soft mx-4" type="submit">
            Sign In
          </button>
          <button onClick={googleSignIn} className="btn btn-soft btn-square">
            <FontAwesomeIcon icon={faGoogle} />
          </button>
        </div>
    </>
  );
};
