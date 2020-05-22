import * as React from 'react';
import { Link } from 'gatsby';
import { Page } from '../components/Page';

const NotFoundPage: React.FC = () => (
  <Page name="Not found!">
    <h1>404: Page not found.</h1>
    <p>
      You&apos;ve hit the void.
      {' '}
      <Link to="/">Go back.</Link>
    </p>
  </Page>
);

export default NotFoundPage;
