import type { ActionFunction, LoaderFunction } from 'remix';
import { redirect } from 'remix';
import { GenericErrorBoundary } from '~/utils/error-boundary.client';
import { logout } from '~/utils/session.server';

export let action: ActionFunction = async ({ request }) => {
  return logout(request);
};

export let loader: LoaderFunction = async () => {
  throw redirect('/');
};

export const ErrorBoundary = GenericErrorBoundary;
