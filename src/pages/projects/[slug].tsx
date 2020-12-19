import { gql } from 'graphql-request';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Image, ResponsiveImageType } from 'react-datocms';

import Header from '../../components/atomic/Header';
import { PageHero } from '../../components/layout/Page';
import { queryCMS } from '../../core/cms';
import Text from '../../components/atomic/Text';
import {
  PathsQuery,
  PathsQueryVariables,
  ProjectQuery,
  ProjectQueryVariables,
} from '../../generated/graphql';
import ImageAttribution from '../../components/molecule/ImageAttribution';
import Markdown from '../../components/molecule/Markdown';
import { motion } from 'framer-motion';

export interface ProjectPageProps {
  project: Exclude<ProjectQuery['project'], undefined>;
}
const ProjectPage: React.FC<ProjectPageProps> = ({ project }) => {
  const router = useRouter();

  useEffect(() => {
    if (!project) {
      router.replace('/');
    }
  }, [project, router]);
  if (!project) return null;

  return (
    <>
      <PageHero padding={false}>
        <motion.div layoutId={`image_${project.heroImage?.id}`}>
          <Image
            data={project.heroImage!.responsiveImage! as ResponsiveImageType}
          />
        </motion.div>
      </PageHero>
      <Header>{project.title}</Header>
      {project.techStack.length > 0 && (
        <Text className="leading-none">
          Built with: {project.techStack.map((stack) => stack.title).join(', ')}
        </Text>
      )}
      <Markdown className="my-8">
        {project.content ?? '**NO CONTENT**'}
      </Markdown>
      <ImageAttribution
        imageDescription="Cover Image"
        photographer={project.heroImage?.author ?? 'UNKNOWN AUTHOR'}
        platform={project.heroImage?.customData?.platform ?? 'UNKNOWN PLATFORM'}
      />
    </>
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
        id
        author
        customData
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
      .filter((slug) => !!slug)
      .map((slug) => `/projects/${slug}`),
    fallback: true,
  };
};
