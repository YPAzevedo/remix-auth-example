import * as React from 'react';
import {
  Links,
  LinksFunction,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  useCatch,
  useLoaderData,
} from 'remix';
import { getUser } from '~/utils/session.server';
import { User } from '.prisma/client';
import AppHeader from './components/AppHeader';
import globalCssUrl from './styles/global.css';

type LoaderData = {
  isLoggedIn: boolean;
  user: User | null;
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData | Response> => {
  const user = await getUser(request);
  return {
    isLoggedIn: !!user,
    user,
  };
};

export const links: LinksFunction = () => {
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap',
    },
    { rel: 'stylesheet', href: globalCssUrl },
    { rel: 'stylesheet', href: 'https://unpkg.com/reset-css@5.0.1/reset.css' },
    ...AppHeader.links,
  ];
};

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
        <title>{title}</title>
      </head>
      <body>
        <div className="Root-container">{children}</div>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { isLoggedIn } = useLoaderData<LoaderData>();

  return (
    <Document title="Unite Home">
      <AppHeader authenticated={isLoggedIn} />
      {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
      <Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <AppHeader authenticated={false} />
      <div className="Root-error-container">
        <h1>
          {caught.status} {caught.statusText}
        </h1>
      </div>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Uh-oh!">
      <AppHeader authenticated={false} />
      <div className="Root-error-container">
        <h1>App Error</h1>
        <pre>{error.message}</pre>
      </div>
    </Document>
  );
}
