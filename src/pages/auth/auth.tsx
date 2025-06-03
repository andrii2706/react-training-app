import React from 'react';
import { useForm } from 'react-hook-form';
import { SignInInterface } from '../../shared/models/authForm.inteface';

export const AuthComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInterface>();

  const onSignIn = (data: SignInInterface) => {
    console.log(data);
  };

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
        <div className="flex justify-center items-center">
          <button>Register</button>
          <button className="mx-4" type="submit">
            Sign In
          </button>
          <button>Google</button>
        </div>
      </form>
    </>
  );
};
