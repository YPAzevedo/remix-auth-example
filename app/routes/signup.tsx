import {
  ActionFunction,
  LoaderFunction,
  LinksFunction,
  useActionData,
  redirect,
} from 'remix';

import AuthForm from '~/components/AuthForm';
import { GenericErrorBoundary } from '~/utils/error-boundary.client';
import { validateNoEmptyFormFields } from '~/utils/form.server';
import {
  login,
  register,
  createUserSession,
  redirectAuthenticated,
} from '~/utils/session.server';
import { getUserByEmail } from '~/utils/user.server';

type ActionData = {
  formError: string;
  email: string;
};

export const links: LinksFunction = () => [...AuthForm.links];

export const loader: LoaderFunction = async ({ request }) => {
  return await redirectAuthenticated(request);
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get('email');
  const password = form.get('password');
  const confirmPassword = form.get('confirmPassword');

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof confirmPassword !== 'string'
  ) {
    return {
      formError: 'Form not submitted correctly.',
      email: '',
    };
  }

  if (password !== confirmPassword) {
    return {
      formError: 'Passwords do not match.',
      email: '',
    };
  }

  const isValid = validateNoEmptyFormFields(
    form,
    ['email', 'password'],
    (field) => !!field
  );

  if (!isValid) {
    return {
      formError: 'Please submit email and password.',
      email: '',
    };
  }
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      formError: 'Email already registered.',
      email,
    };
  }

  const newUser = await register({ email, password });

  const loggedInUser = await login({ email: newUser.email, password });

  if (loggedInUser) return await createUserSession(loggedInUser.id, '/');

  return {
    formError: '',
    email: '',
  };
};

export const ErrorBoundary = GenericErrorBoundary;

export default function Signup() {
  const actionData = useActionData<ActionData>();
  const formError = actionData?.formError ?? '';
  const email = actionData?.email ?? '';
  return <AuthForm type="signup" initialEmail={email} formError={formError} />;
}
