import {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
  useActionData,
  redirect,
} from 'remix';
import AuthForm from '~/components/AuthForm';

import { GenericErrorBoundary } from '~/utils/error-boundary.client';
import { validateNoEmptyFormFields } from '~/utils/form.server';
import {
  createUserSession,
  getUserId,
  login,
  redirectAuthenticated,
} from '~/utils/session.server';

type ActionData = {
  formError: string;
};

export const links: LinksFunction = () => [...AuthForm.links];

export const loader: LoaderFunction = async ({ request }) => {
  return await redirectAuthenticated(request);
};

export const action: ActionFunction = async ({
  request,
}): Promise<ActionData | Response> => {
  const form = await request.formData();
  const email = form.get('email');
  const password = form.get('password');

  if (typeof email !== 'string' || typeof password !== 'string') {
    return {
      formError: 'Form not submitted correctly.',
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
    };
  }

  const foundUser = await login({ email, password });

  if (foundUser) {
    return await createUserSession(foundUser.id, '/');
  }
  return { formError: 'Email or password are incorrect.' };
};

export const ErrorBoundary = GenericErrorBoundary;

export default function Login() {
  const actionData = useActionData();
  const formError = actionData?.formError;

  return <AuthForm type="login" formError={formError} />;
}
