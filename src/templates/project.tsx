import React from 'react';
import { graphql } from 'gatsby';
import { Page } from '../components/Page';

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
  <Page name={data.contentfulProject.title}>
    <h1>{data.contentfulProject.title}</h1>
    {/* eslint-disable-next-line react/no-danger */}
    <div dangerouslySetInnerHTML={{ __html: data.contentfulProject.description.childMarkdownRemark.html }} />
  </Page>
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
