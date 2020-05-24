import * as React from 'react';
import { Page } from '../components/Page';
import { Button, ButtonGroup } from '../components/designsystem/Button';
import { HeroText, Hero, HeroSubtext } from '../components/designsystem/Hero';
import { Divtext } from '../components/designsystem/Divtext';

const IndexPage: React.FC = () => (
  <Page className="homepage">
    <Hero>
      <HeroText>
        Alexander
        <br />
        Baron
      </HeroText>
      <HeroSubtext>
        <Divtext>
          <span>Student</span>
          <span>@</span>
          <span>Gymnasium Gerresheim</span>
        </Divtext>
      </HeroSubtext>
    </Hero>

    <ButtonGroup>
      <Button variant="secondary">Stuff I do</Button>
      <Button>Contact me</Button>
    </ButtonGroup>
  </Page>
);

export default IndexPage;
