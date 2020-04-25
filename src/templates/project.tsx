import React from 'react';
import { graphql } from 'gatsby';
import { IndexLayout } from '../layouts';
import { Page } from '../components/Page';
import { Container } from '../components/Container';

interface ProjectPageTemplateProps {
  data: {
    contentfulProject: {
      title: string;
      description: {
        childMarkdownRemark: {
          html: string;
        }
      }
    }
  }
}

const ProjectPageTemplate: React.FC<ProjectPageTemplateProps> = ({ data }) => (
  <IndexLayout>
    <Page>
      <Container>
        <h1>{data.contentfulProject.title}</h1>
        {/* eslint-disable-next-line react/no-danger */}
        <p dangerouslySetInnerHTML={{ __html: data.contentfulProject.description.childMarkdownRemark.html }} />
      </Container>
    </Page>
  </IndexLayout>
);
export default ProjectPageTemplate;

export const query = graphql`
  query ProjectTemplateQuery($id: String) {
    contentfulProject(contentful_id: {eq: $id}) {
      title
      description {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
