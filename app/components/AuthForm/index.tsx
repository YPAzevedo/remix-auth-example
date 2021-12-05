import { Link } from 'remix';
import AuthFormStylesUrl from './styles.css';

type AuthFormProps = {
  type: 'login' | 'signup';
  formError: string;
  initialEmail?: string;
};

function AuthForm({ type, formError, initialEmail }: AuthFormProps) {
  const hasFormError = Boolean(formError);
  const isLogin = type === 'login';
  const isSignUp = type === 'signup';
  return (
    <main className="AuthForm-container">
      <form method="post">
        <span>{type}</span>

        <label htmlFor="email" />
        <input
          type="email"
          name="email"
          placeholder="Email"
          defaultValue={initialEmail}
        />
        <label htmlFor="password" />
        <input type="password" name="password" placeholder="Password" />
        {isSignUp && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
        )}
        {hasFormError && <small>{formError}</small>}
        <button type="submit">{type}</button>
        {isLogin ? (
          <Link to="/signup">Need an account?</Link>
        ) : (
          <Link to="/login">Already have an account?</Link>
        )}
      </form>
    </main>
  );
}

AuthForm.links = [{ rel: 'stylesheet', href: AuthFormStylesUrl }];

export default AuthForm;
