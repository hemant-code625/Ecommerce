/* eslint-disable no-useless-escape */
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { selectLoggedInUser , createUserAsync } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";


const SignUp = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const { register, handleSubmit, formState: { errors } } = useForm();
  console.log("User", user);
  
  return (
    <div>
      
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" 
          onSubmit={handleSubmit((data)=> dispatch(createUserAsync({email: data.email , password: data.password})) )}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", { required: "Email is required", pattern:{value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Enter a valid email address"} })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <p className="text-red-500">{errors?.email?.message}</p>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", { required: "Password is required", pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*()_+])[A-Za-z\d@#$%^&*()_+]{8,}$/ , message: <>
                  Password must have :<br />
                  - at least 8 characters long<br />
                  - contain at least one uppercase letter (A-Z)<br />
                  - contain at least one lowercase letter (a-z)<br />
                  - contain at least one number (0-9)<br />
                  - contain at least one special character (@#$%^&*()_+)
                </>
                    } })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <p className="text-red-500">{errors?.password?.message}</p>

            <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirm-password"
                  {...register("confirmPassword", {validate: (value, formValue) => value === formValue.password  || "Passwords do not match"}, {required: "Confirm Password is required"})}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            <p className="text-red-500">{errors?.confirmPassword?.message}</p>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
            <Link to={'/login'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
