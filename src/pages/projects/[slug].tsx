import { gql } from '@apollo/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import Page from '../../components/layout/Page';
import RichText, { Assets } from '../../components/RichText';
import client from '../../core/graphql';
import Asset from '../../core/model/Asset';
import RichTextType from '../../core/model/RichText';
import { Always } from '../../core/typeutil';
import {
  ProjectQuery,
  ProjectQueryVariables,
  SlugsQuery,
  SlugsQueryVariables,
} from '../../generated/graphql';

type Project = Always<
  Always<Always<ProjectQuery['projectCollection']>['items']>[0]
>;

interface Props {
  project: Project;
  preview: boolean;
}
const ProjectPage: React.FC<Props> = ({ project, preview }) => {
  const { isFallback } = useRouter();
  if (isFallback) return null;

  const assets: Assets = project
    .description!.links.assets.block.map(
      (value) =>
        ({
          id: value!.sys.id,
          description: value!.description,
          title: value!.title,
          url: value!.url,
          width: value!.width,
          height: value!.height,
        } as Asset)
    )
    .reduce((all, current) => ({ ...all, [current.id]: current }), {});
  return (
    <Page>
      <h1 className="text-primary text-5xl md:text-6xl mb-6">
        {project.name}{' '}
        {preview && <span className="text-positive"> - PREVIEW</span>}
      </h1>
      <RichText
        text={project.description?.json as RichTextType}
        assets={assets}
      />
      {(project.techStackCollection?.items.length ?? 0) > 0 && (
        <div className="mt-16">
          <h2 className="text-primary text-2xl">Built with...</h2>
          <div className="flex flex-row flex-wrap overflow-x-hidden">
            {project.techStackCollection?.items.map((stack) => (
              <div
                key={stack?.sys.id}
                className="bg-primary text-light px-4 py-1.5 mt-1 mr-2"
              >
                {stack!.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </Page>
  );
};
export default ProjectPage;

const PROJECT_QUERY = gql`
  query Project($slug: String!, $preview: Boolean!) {
    projectCollection(where: { slug: $slug }, limit: 1, preview: $preview) {
      items {
        name
        description {
          json
          links {
            assets {
              block {
                sys {
                  id
                }
                title
                description
                url
                width
                height
              }
            }
          }
        }
        demo
        techStackCollection {
          items {
            sys {
              id
            }
            name
            icon {
              url
            }
            website
          }
        }
      }
    }
  }
`;
export const getStaticProps: GetStaticProps<Props> = async ({
  params,
  preview,
}) => {
  const isPreview = preview ?? false;

  const { data, errors } = await client.query<
    ProjectQuery,
    ProjectQueryVariables
  >({
    query: PROJECT_QUERY,
    variables: {
      slug: params!.slug as string,
      preview: isPreview,
    },
  });
  if (errors) console.error(errors);
  if (data.projectCollection?.items.length === 0) return { notFound: true };

  return {
    props: { project: data.projectCollection?.items[0]!, preview: isPreview },
    revalidate: 1,
  };
};

const SLUGS_QUERY = gql`
  query Slugs {
    projectCollection {
      items {
        slug
      }
    }
  }
`;
export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<SlugsQuery, SlugsQueryVariables>({
    query: SLUGS_QUERY,
  });

  return {
    paths: data
      .projectCollection!.items.map((slug) =>
        slug ? '/projects/' + slug.slug : null
      )
      .filter((slug) => slug !== null) as string[],
    fallback: false,
  };
};
