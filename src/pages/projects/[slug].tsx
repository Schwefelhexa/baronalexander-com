import { gql } from 'graphql-request';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import {
  Image,
  ResponsiveImageType,
  useQuerySubscription,
} from 'react-datocms';

import Header from '../../components/atomic/Header';
import { LivePreview, queryCMS, queryCMSLive } from '../../core/cms';
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
import Page from '../../components/layout/Page';

export interface ProjectPageProps {
  subscriptionData: LivePreview<ProjectQuery, ProjectQueryVariables>;
}
const ProjectPage: React.FC<ProjectPageProps> = ({ subscriptionData }) => {
  const router = useRouter();

  const { data } = useQuerySubscription<ProjectQuery, ProjectQueryVariables>(
    subscriptionData
  );
  const project = data?.project;

  useEffect(() => {
    if (!project) {
      router.replace('/');
    }
  }, [project, router]);
  if (!project) return null;

  return (
    <>
      <motion.div
        layoutId={`image_${project.heroImage?.id}`}
        className="lg:h-screen-2/3 overflow-hidden"
      >
        <div className="lg:-my-48">
          <Image
            data={project.heroImage!.responsiveImage! as ResponsiveImageType}
          />
        </div>
      </motion.div>
      <Page.Main noTopPadding>
        <Header>{project.title}</Header>
        {project.techStack.length > 0 && (
          <Text className="lg:leading-none mt-2 lg:mt-0">
            Built with:{' '}
            {project.techStack.map((stack) => stack.title).join(', ')}
          </Text>
        )}
        <Markdown className="my-6 lg:my-8">
          {project.content ?? '**NO CONTENT**'}
        </Markdown>
        <ImageAttribution
          imageDescription="Cover Image"
          photographer={project.heroImage?.author ?? 'UNKNOWN AUTHOR'}
          platform={
            project.heroImage?.customData?.platform ?? 'UNKNOWN PLATFORM'
          }
        />
      </Page.Main>
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
          imgixParams: { fit: crop, w: 1680, h: 1080, auto: format }
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
  const subscription = await queryCMSLive<ProjectQuery, ProjectQueryVariables>(
    PROJECT_QUERY,
    preview,
    { slug: params!.slug! as string }
  );

  return {
    props: {
      subscriptionData: subscription,
    },
  };
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
    fallback: 'blocking',
  };
};
