import * as React from 'react';
import { Link, graphql } from 'gatsby';

import { Page } from '../components/Page';
import { Container } from '../components/Container';
import { IndexLayout } from '../layouts';

interface IndexPageProps {
  data: {
    allContentfulProject: {
      edges: {
        node: {
          fields: {
            slug: string;
          }
          title: string;
        }
      }[]
    }
  }
}

const IndexPage: React.FC<IndexPageProps> = ({ data }) => (
  <IndexLayout>
    <Page>
      <Container>
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <Link to="/page-2/">Go to page 2</Link>

        <h3>All my projects</h3>
        <ul>
          {data.allContentfulProject.edges.map(({ node }) => (
            <li key={node.fields.slug}>
              <Link to={node.fields.slug}>{node.title}</Link>
            </li>
          ))}
        </ul>
      </Container>
    </Page>
  </IndexLayout>
);

export default IndexPage;

export const query = graphql`
  query IndexPageQuery {
    allContentfulProject {
      edges {
        node {
          fields {
            slug
          }
          title
        }
      }
    }
  }
`;
