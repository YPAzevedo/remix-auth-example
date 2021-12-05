import { ErrorBoundaryComponent } from 'remix';

export function GenericErrorBoundary({
  error,
}: React.ComponentProps<ErrorBoundaryComponent>) {
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  );
}
