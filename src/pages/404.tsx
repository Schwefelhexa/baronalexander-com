import * as React from 'react';
import { Page } from '../components/Page';
import { Hero, HeroText, HeroSubtext } from '../components/designsystem/Hero';
import { Link } from '../components/designsystem/Link';

const NotFoundPage: React.FC = () => (
  <Page name="Not found!">
    <Hero>
      <HeroText>
        Page not found!
      </HeroText>
      <HeroSubtext>
        This page does not exist.
        {' '}
        <Link to="/">Go back?</Link>
      </HeroSubtext>
    </Hero>
  </Page>
);

export default NotFoundPage;
