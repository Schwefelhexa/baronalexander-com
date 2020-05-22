import * as React from 'react';
import { Page } from '../components/Page';
import { Button } from '../components/Test';

const IndexPage: React.FC = () => (
  <Page>
    <h1>Welcome! This is my page!</h1>
    <Button>Hello Tailwind!</Button>
  </Page>
);

export default IndexPage;
