import { gql } from 'graphql-request';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Image, ResponsiveImageType } from 'react-datocms';

import Header from '../../components/atomic/Header';
import Page, { PageHero } from '../../components/layout/Page';
import { queryCMS } from '../../core/cms';
import { usePreviewMode } from '../../core/preview';
import {
  PathsQuery,
  PathsQueryVariables,
  ProjectQuery,
  ProjectQueryVariables,
} from '../../generated/graphql';

export interface ProjectPageProps {
  project: Exclude<ProjectQuery['project'], undefined>;
}
const ProjectPage: React.FC<ProjectPageProps> = ({ project }) => {
  const router = useRouter();

  const [session, loading] = useSession();
  const [isPreview, setPreviewMode] = usePreviewMode();

  useEffect(() => {
    if (!project) {
      router.replace('/');
    }
  }, [project, router]);
  if (!project) return null;

  return (
    <Page
      loggedIn={!loading && session !== null}
      preview={isPreview}
      setPreview={(isPreview) => setPreviewMode(isPreview)}
    >
      <PageHero identifier="project_page:hero_image">
        <Image
          data={project.heroImage!.responsiveImage! as ResponsiveImageType}
        />
      </PageHero>
      <Header>{project.title}</Header>
    </Page>
  );
};
export default ProjectPage;

const PROJECT_QUERY = gql`
  query Project($slug: String!) {
    project(filter: { slug: { eq: $slug } }) {
      title
      techStack {
        id
        title
      }
      content
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
export const getStaticProps: GetStaticProps<ProjectPageProps> = async ({
  params,
  preview,
}) => {
  const { project } = await queryCMS<ProjectQuery, ProjectQueryVariables>(
    PROJECT_QUERY,
    preview,
    { slug: params!.slug! as string }
  );

  return { props: { project: project ?? null } };
};

const PATHS_QUERY = gql`
  query Paths {
    allProjects {
      slug
    }
  }
`;
export const getStaticPaths: GetStaticPaths = async () => {
  const { allProjects } = await queryCMS<PathsQuery, PathsQueryVariables>(
    PATHS_QUERY
  );

  return {
    paths: allProjects
      .map((path) => path.slug)
      .filter((slug) => !!slug) as string[],
    fallback: true,
  };
};
