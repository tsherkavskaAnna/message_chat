import { useActionState } from 'react';
import { verifyEmailAction } from '../actions/authActions';
import { useNavigate, useParams } from 'react-router-dom';

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const { veryficationCode } = useParams<{ veryficationCode: string }>();
  const [state, submit, isPending] = useActionState(
    (prevState: unknown, formData: FormData) =>
      verifyEmailAction(prevState, formData, veryficationCode!),
    null
  );

  if (state?.success) {
    navigate('/dashboard');
  }
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-1/3 grid place-items-center shadow-2xl bg-white h-52 rounded-2xl px-10">
        <form className="grid-cols-1 gap-4 w-full" action={submit}>
          <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-3 pl-2 hover:bg-indigo-500/20">
            <svg
              width="32"
              height="32"
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
              className="w-full outline-none bg-transparent py-2.5 text-gray-600"
              type="email"
              placeholder="Email"
              required
            />
            <button
              type="submit"
              className="w-1/3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium cursor-pointer"
            >
              {isPending ? 'Loading...' : 'Send'}
            </button>
          </div>
          {state?.message && <p className="text-green-500">{state.message}</p>}
          {state?.error && <p className="text-red-500">{state.error}</p>}
        </form>
      </div>
    </div>
  );
}
