import * as React from 'react';
import { Link } from 'gatsby';

const NotFoundPage: React.FC = () => (
  <>
    <h1>404: Page not found.</h1>
    <p>
      You&apos;ve hit the void.
      {' '}
      <Link to="/">Go back.</Link>
    </p>
  </>
);

export default NotFoundPage;
