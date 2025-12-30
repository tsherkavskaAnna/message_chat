import { useActionState, useEffect } from 'react';
import { loginAction } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { toast } from 'react-toastify';

export default function LoginForm() {
  const navigate = useNavigate();
  const [state, submit, isPending] = useActionState(loginAction, null);

  useEffect(() => {
    if (state?.success && state?.user) {
      useAuthStore.setState({
        user: state.user,
        loading: false,
      });

      toast.success(state.message);
      navigate('/dashboard');
    }

    if (state?.error) {
      toast.error(state.error);
    }
  }, [state, navigate]);

  return (
    <div className="w-full content-center flex justify-center">
      <form className="lg:p-6 p-3 w-full lg:w-3/4" action={submit}>
        <h2 className="text-2xl font-primary mb-9 text-center text-indigo-400">
          Sign In
        </h2>
        <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-2 pl-2 hover:bg-indigo-500/20">
          <svg
            width="18"
            height="18"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m2.5 4.375 3.875 2.906c.667.5 1.583.5 2.25 0L12.5 4.375"
              stroke="#6B7280"
              strokeOpacity=".6"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.875 3.125h-8.75c-.69 0-1.25.56-1.25 1.25v6.25c0 .69.56 1.25 1.25 1.25h8.75c.69 0 1.25-.56 1.25-1.25v-6.25c0-.69-.56-1.25-1.25-1.25Z"
              stroke="#6B7280"
              strokeOpacity=".6"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
          <input
            name="email"
            className="w-full outline-none bg-transparent py-2.5 text-gray-600 "
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="flex items-center mt-2 mb-8 border bg-indigo-500/5 border-gray-500/10 rounded gap-2 pl-2 hover:bg-indigo-500/20">
          <svg
            width="13"
            height="17"
            viewBox="0 0 13 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
              fill="#6B7280"
            />
          </svg>
          <input
            name="password"
            className="w-full outline-none bg-transparent py-2.5 text-gray-600"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="checkbox"
              className="relative appearance-none h-4 w-4 border border-slate-300 rounded-sm
             checked:bg-indigo-500 checked:border-indigo-500
             focus:outline-none cursor-pointer
             checked:after:content-['✓']
             checked:after:absolute
             checked:after:text-white
             checked:after:text-xs
             checked:after:top-1/2
             checked:after:left-1/2
             checked:after:-translate-x-1/2
             checked:after:-translate-y-1/2"
            />
            <label className="text-sm" htmlFor="checkbox">
              Remember me
            </label>
          </div>
          <a className="text-sm underline" href="/forgot-password">
            Forgot password?
          </a>
        </div>
        <button className="w-full mt-8 mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium cursor-pointer">
          {isPending ? 'Loading...' : 'Sign In'}
        </button>
        {state?.message && <p className="text-green-500">{state.message}</p>}
        {state?.error && <p className="text-red-500">{state.error}</p>}
      </form>
    </div>
  );
}
