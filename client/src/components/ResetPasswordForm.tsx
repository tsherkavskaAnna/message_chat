import { useActionState } from 'react';
import { resetPasswordAction } from '../actions/authActions';
import { useParams } from 'react-router-dom';

export default function ResetPasswordForm() {
  const { token } = useParams();
  const [state, submit, isPending] = useActionState(
    (prevState: unknown, formData: FormData) => {
      return resetPasswordAction(prevState, formData, token!);
    },
    null
  );
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-1/2 grid place-items-center shadow-2xl bg-white h-52 rounded-2xl px-10">
        <form className="grid-cols-1 gap-4 w-full" action={submit}>
          <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-3 pl-2 hover:bg-indigo-500/20">
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
              type="text"
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="w-1/3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium cursor-pointer"
            >
              {isPending ? 'Loading...' : 'Reset Password'}
            </button>
          </div>
          {state?.message && <p className="text-green-500">{state.message}</p>}
          {state?.error && <p className="text-red-500">{state.error}</p>}
        </form>
      </div>
    </div>
  );
}
