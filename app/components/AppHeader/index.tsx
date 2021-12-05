import appHeaderStylesUrl from './styles.css';

interface AppHeaderProps {
  authenticated: boolean;
}

const AppHeader = ({ authenticated }: AppHeaderProps) => {
  return (
    <header className="AppHeader-header">
      <span>
        Unit<i>.e</i>
      </span>
      {authenticated && (
        <form method="post" action="/logout">
          <button>Logout</button>
        </form>
      )}
    </header>
  );
};

AppHeader.links = [{ rel: 'stylesheet', href: appHeaderStylesUrl }];

export default AppHeader;
