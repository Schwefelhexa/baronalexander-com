import React from 'react';
import { gql } from 'graphql-request';
import { GetStaticProps } from 'next';
import { ResponsiveImageType, useQuerySubscription } from 'react-datocms';
import Link from 'next/link';

import Header from '../components/atomic/Header';
import ProjectHero from '../components/feature/projects/ProjectHero';
import { IndexPageQuery, IndexPageQueryVariables } from '../generated/graphql';
import { LivePreview, queryCMSLive } from '../core/cms';
import { motion } from 'framer-motion';
import Page from '../components/layout/Page';
import Text from '../components/atomic/Text';

interface IndexPageProps {
  subscriptionData: LivePreview<IndexPageQuery, IndexPageQueryVariables>;
}
const IndexPage: React.FC<IndexPageProps> = ({ subscriptionData }) => {
  const { data } = useQuerySubscription<
    IndexPageQuery,
    IndexPageQueryVariables
  >(subscriptionData);
  const project = data!.project;

  return (
    <Page.Main className="w-full h-full flex flex-col">
      <div className="mb-16">
        <Header>Alexander Baron.</Header>
      </div>
      {!!project && (
        <Link href={`/projects/${project.slug}`}>
          <a>
            <motion.div layoutId={`image_${project.heroImage?.id}`}>
              <ProjectHero
                title={project.title ?? 'NO TITLE'}
                techStack={project.techStack.map(
                  ({ title }) => title ?? 'NO TITLE'
                )}
                image={
                  project.heroImage!.responsiveImage as ResponsiveImageType
                }
                compact={false}
              />
            </motion.div>
          </a>
        </Link>
      )}
      <div className="flex flex-row mt-16">
        <Link href="/projects">
          <a>
            <Text>See all projects</Text>
          </a>
        </Link>
      </div>
    </Page.Main>
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
        id
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
  const subscription = await queryCMSLive<
    IndexPageQuery,
    IndexPageQueryVariables
  >(QUERY, preview);

  return {
    props: {
      subscriptionData: subscription,
    },
  };
};
