import * as React from 'react';
import { graphql } from 'gatsby';
import { Page } from '../components/Page';
import { Button, ButtonGroup } from '../components/designsystem/Button';
import { HeroText, Hero, HeroSubtext } from '../components/designsystem/Hero';
import { Divtext } from '../components/designsystem/Divtext';
import { Link, LinkButton } from '../components/designsystem/Link';

interface IIndexPageProps {
  data: IndexPageQueryResponse;
}
const IndexPage: React.FC<IIndexPageProps> = ({ data }) => (
  <Page className="homepage">
    <Hero>
      <HeroText>
        {data.site.siteMetadata.author.name.split(' ').reduce<React.ReactNode[]>((all, word, i, arr) => (
          [
            ...all,
            /* eslint-disable-next-line react/no-array-index-key */
            <span key={i * 2}>{word}</span>,
            /* eslint-disable-next-line react/no-array-index-key */
            <br key={i + 1} />,
          ]
        ), []).slice(0, -1)}
      </HeroText>
      <HeroSubtext>
        <Divtext>
          <span>{data.site.siteMetadata.author.work.description}</span>
          <span>@</span>
          <span>
            <Link to={data.site.siteMetadata.author.work.place.page} external>{data.site.siteMetadata.author.work.place.name}</Link>
          </span>
        </Divtext>
      </HeroSubtext>
    </Hero>

    <ButtonGroup>
      <LinkButton to="/projects" variant="secondary">Stuff I do</LinkButton>
      <Button>Contact me</Button>
    </ButtonGroup>
  </Page>
);

export default IndexPage;

export const query = graphql`
query IndexPageQuery {
  site {
    siteMetadata {
      author {
        name
        work {
          description
          place {
            name
            page
          }
        }
      }
    }
  }
}
`;
interface IndexPageQueryResponse {
  site: {
    siteMetadata: {
      author: {
        name: string;
        work: {
          description: string;
          place: {
            name: string;
            page: string;
          }
        }
      }
    }
  }
}
