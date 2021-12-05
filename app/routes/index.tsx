import { LoaderFunction, LinksFunction } from 'remix';
import { requireUserId } from '~/utils/session.server';

import indexStylesUrl from '~/styles/index.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: indexStylesUrl },
];

export const loader: LoaderFunction = async ({ request }): Promise<string> => {
  return await requireUserId(request);
};

export default function Index() {
  return (
    <div className="Index-container">
      <h1>
        Hello, welcome to <strong>Unit.e</strong>{' '}
        <span role="img" aria-label="Waving hand emoji">
          👋
        </span>
      </h1>
    </div>
  );
}
