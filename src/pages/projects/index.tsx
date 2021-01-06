import React from 'react';
import { gql } from 'graphql-request';
import { GetStaticProps } from 'next';
import {
  Image,
  ResponsiveImageType,
  useQuerySubscription,
} from 'react-datocms';
import Link from 'next/link';

import Header from '../../components/atomic/Header';
import { LivePreview, queryCMSLive } from '../../core/cms';
import {
  ProjectsListQuery,
  ProjectsListQueryVariables,
} from '../../generated/graphql';
import Page from '../../components/layout/Page';
import { motion } from 'framer-motion';
import ProjectHero from '../../components/feature/projects/ProjectHero';
import SEO from '../../components/feature/SEO';

export interface ProjectsListPageProps {
  subscriptionData: LivePreview<ProjectsListQuery, ProjectsListQueryVariables>;
}
const ProjectsListPage: React.FC<ProjectsListPageProps> = ({
  subscriptionData,
}) => {
  const { data } = useQuerySubscription<
    ProjectsListQuery,
    ProjectsListQueryVariables
  >(subscriptionData);
  const projects = data!.allProjects;

  return (
    <Page.Main>
      <SEO
        data={{
          title: 'Projects',
          description: "See the projects I've worked on",
        }}
      />
      <div className="mb-16">
        <Header>Projects.</Header>
      </div>
      <div>
        {projects.map((project) => (
          <Link href={`/projects/${project.slug}`} key={project.slug}>
            <a className="flex flex-col max-w-5xl mb-10 lg:mb-16">
              <motion.div layoutId={`image_${project.heroImage?.id}`}>
                <ProjectHero
                  title={project.title ?? 'NO TITLE'}
                  image={
                    project.heroImage!.responsiveImage as ResponsiveImageType
                  }
                  compact
                />
              </motion.div>
            </a>
          </Link>
        ))}
      </div>
    </Page.Main>
  );
};
export default ProjectsListPage;

const QUERY = gql`
  query ProjectsList {
    allProjects(orderBy: _createdAt_DESC) {
      slug
      title
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
export const getStaticProps: GetStaticProps<ProjectsListPageProps> = async ({
  preview,
}) => {
  const subscription = await queryCMSLive<
    ProjectsListQuery,
    ProjectsListQueryVariables
  >(QUERY, preview);

  return {
    props: {
      subscriptionData: subscription,
    },
  };
};
