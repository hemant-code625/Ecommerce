/* eslint-disable no-useless-escape */
import { useSelector, useDispatch } from 'react-redux';
import {GoogleAuthAsync, selectError, selectLoggedInUser } from '../authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { checkUserAsync } from '../authSlice';
import { useForm } from 'react-hook-form';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';

export default function Login() {
  const dispatch = useDispatch();
  const error = useSelector(selectError)
  const user = useSelector(selectLoggedInUser)
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  // our logic is: if user is already in the db then just return the user details but here we need to pass the addresses array as well it should not be empty all the time! For this we need to fetch addresses using useEffect in the home page after login!
  const handleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const decodedToken = jwtDecode(token);
      const user = {
        name: decodedToken.name,
        email: decodedToken.email,
        picture: decodedToken.picture,
        addresses:[],
        id: parseInt(decodedToken.sub),        // this id is dynamic and its of no use for us
      };
      delete user.id;   // database will generate the id
      dispatch(GoogleAuthAsync(user)).then(() => {
        navigate('/');
      }).catch((err) => {
        console.log("Ops!Something went wrong",err)
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleError = () => {
    console.log('Login Failed');
  };

  useEffect(() => {
    if (user ) {
      navigate('/');
    }
  }, [user, navigate]);
  
  
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              dispatch(
                checkUserAsync({ email: data.email, password: data.password })
              );
            })}
            className="space-y-6"
            method="POST"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register('email', {
                    required: 'email is required',
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: 'email not valid',
                    },
                  })}
                  autoComplete='email'
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register('password', {
                    required: 'password is required',
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              {error && (
                  <p className="text-red-500">{error.message}</p>
                )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in
              </button>
              <div className='flex w-full justify-center my-5 px-3 py-1.5 text-sm font-semibold'>
              <GoogleLogin 
              onSuccess={handleSuccess}
              onError={handleError} />
              </div>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
