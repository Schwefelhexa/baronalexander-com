import { gql } from '@apollo/client';
import { GetStaticProps } from 'next';
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
        <li key={project?.slug} className="block mt-4 md:mt-12">
          <Link href={`/projects/${project?.slug}`}>
            <a className="flex flex-col group border-4 border-light hover:border-primary focus:border-primary outline-none transition-colors">
              <div className="pb-1 group-focus:bg-primary group-hover:bg-primary transition-colors">
                <span className="text-primary group-focus:text-light group-hover:text-light text-2xl md:text-4xl transition-colors">
                  {project?.name ?? 'UNNAMED PROJECT'}{' '}
                  {project?.sys.publishedAt !== null && (
                    <span className="text-positive">- PREVIEW</span>
                  )}
                </span>
              </div>
              <img
                src={
                  project?.coverImage?.url ?? 'https://picsum.photos/960/540'
                }
                aria-hidden="true"
              />
            </a>
          </Link>
        </li>
      ))}
    </ul>
  </Page>
);
export default ProjectPage;

const query = gql`
  query ProjectsList($preview: Boolean!) {
    projectCollection(limit: 500, preview: $preview) {
      items {
        sys {
          publishedAt
        }
        name
        slug
        coverImage {
          url
        }
      }
    }
  }
`;
export const getStaticProps: GetStaticProps<Props> = async ({ preview }) => {
  const { data } = await client.query<
    ProjectsListQuery,
    ProjectsListQueryVariables
  >({ query, variables: { preview: preview ?? false } });

  return { props: { projects: data.projectCollection }, revalidate: 1 };
};
