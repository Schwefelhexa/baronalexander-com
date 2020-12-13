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
    <h1 className="text-primary text-5xl md:text-6xl mb-6">Projects</h1>
    <ul>
      {projects?.items.map((project) => (
        <li key={project!.slug!} className="block mt-4 md:mt-12">
          <Link href={`/projects/${project!.slug!}`}>
            <a className="flex flex-col">
              <div className="mb-1">
                <span className="text-primary text-2xl md:text-4xl">
                  {project?.name}
                </span>
              </div>
              <img src={project!.coverImage!.url!} aria-hidden="true" />
            </a>
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
        coverImage {
          url
        }
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
