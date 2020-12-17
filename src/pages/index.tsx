import React from 'react';
import { useSession } from 'next-auth/client';
import { GraphQLClient, gql } from 'graphql-request';
import { GetStaticProps } from 'next';
import { ResponsiveImageType } from 'react-datocms';

import Page from '../components/layout/Page';
import { usePreviewMode } from '../core/preview';
import Header from '../components/atomic/Header';
import ProjectHero from '../components/feature/projects/ProjectHero';
import { IndexPageQuery, IndexPageQueryVariables } from '../generated/graphql';

interface IndexPageProps {
  project: IndexPageQuery['project'];
}
const IndexPage: React.FC<IndexPageProps> = ({ project }) => {
  const [session, loading] = useSession();
  const [isPreview, setPreviewMode] = usePreviewMode();

  return (
    <Page
      loggedIn={!loading && session !== null}
      preview={isPreview}
      setPreview={(isPreview) => setPreviewMode(isPreview)}
    >
      <div className="w-full h-full flex flex-col">
        <div className="mb-16">
          <Header>Alexander Baron.</Header>
        </div>
        {!!project && (
          <ProjectHero
            title={project.title ?? 'NO TITLE'}
            techStack={project.techStack.map(
              ({ title }) => title ?? 'NO TITLE'
            )}
            image={project.heroImage!.responsiveImage as ResponsiveImageType}
          />
        )}
      </div>
    </Page>
  );
};
export default IndexPage;

const QUERY = gql`
  query IndexPage {
    project(orderBy: _createdAt_DESC) {
      slug
      title
      techStack {
        title
      }
      createdAt
      heroImage {
        responsiveImage(
          imgixParams: { fit: crop, w: 1680, h: 720, auto: format }
        ) {
          srcSet
          webpSrcSet
          sizes
          src
          width
          height
          aspectRatio
          alt
          title
          base64
        }
      }
    }
  }
`;
export const getStaticProps: GetStaticProps<IndexPageProps> = async ({
  preview,
}) => {
  const endpoint = preview
    ? `https://graphql.datocms.com/preview`
    : `https://graphql.datocms.com/`;
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
    },
  });
  const { project } = await client.request<
    IndexPageQuery,
    IndexPageQueryVariables
  >(QUERY);

  return {
    props: {
      project,
    },
  };
};
