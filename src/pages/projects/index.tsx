import { gql } from '@apollo/client';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React from 'react';
import Page from '../../components/layout/Page';
import client from '../../core/graphql';
import {
  ProjectsListQuery,
  ProjectsListQueryVariables,
} from '../../generated/graphql';

interface Props {
  projects: ProjectsListQuery['projectCollection'];
}
const ProjectPage: React.FC<Props> = ({ projects }) => (
  <Page>
    <h1>Projects</h1>
    <ul>
      {projects?.items.map((project) => (
        <li key={project!.slug!}>
          <Link href={`/projects/${project!.slug!}`}>
            <a>{project?.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Page>
);
export default ProjectPage;

const query = gql`
  query ProjectsList {
    projectCollection(limit: 500) {
      items {
        name
        slug
      }
    }
  }
`;
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { data } = await client.query<
    ProjectsListQuery,
    ProjectsListQueryVariables
  >({ query });

  return { props: { projects: data.projectCollection } };
};
