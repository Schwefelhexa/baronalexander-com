import React from 'react';
import { gql } from 'graphql-request';
import { GetStaticPaths, GetStaticProps } from 'next';

import client from '../../core/data/client';
import {
  BlogPostQuery,
  BlogPostQueryVariables,
  BlogSlugsQuery,
} from '../../generated/graphql';
import RichText, { AssetData } from '../../components/RichText';
import tw from 'twin.macro';

type Post = NonNullable<
  NonNullable<NonNullable<BlogPostQuery['blogPostCollection']>['items']>[0]
>;

const Heading1 = tw.h1`text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl`;
const SubHeading = tw.p`text-base text-center text-yellow-600 font-semibold tracking-wide uppercase`; // TODO Find a way to add role="doc-subtitle" here

export interface BlogPostPageProps {
  post: Post;
}
const BlogPostPage: React.FC<BlogPostPageProps> = ({ post }) => {
  return (
    <div tw="relative py-16 bg-white overflow-hidden">
      <div tw="relative px-4 sm:px-6 lg:px-8">
        <div tw="max-w-prose mx-auto">
          {post.subtitle && (
            <SubHeading role="doc-subtitle">{post.subtitle}</SubHeading>
          )}
          <Heading1>{post.title}</Heading1>
        </div>
        <div tw="mt-6">
          <RichText assets={post.content?.links.assets.block as AssetData[]}>
            {post.content?.json}
          </RichText>
        </div>
      </div>
    </div>
  );
};
export default BlogPostPage;

const BLOG_POST_QUERY = gql`
  query BlogPost($slug: String!) {
    blogPostCollection(where: { slug: $slug }, limit: 1) {
      total
      items {
        title
        subtitle
        coverImage {
          title
          description
          url
        }
        content {
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
                contentType
              }
            }
          }
        }
      }
    }
  }
`;
export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({
  params,
}) => {
  const { slug } = params as { slug: string };

  const { blogPostCollection } = await client.request<
    BlogPostQuery,
    BlogPostQueryVariables
  >(BLOG_POST_QUERY, { slug });
  if (!blogPostCollection?.items || blogPostCollection.total !== 1)
    throw new Error('Invalid blog post from CMS');
  const post = blogPostCollection.items[0];

  if (!post) throw new Error('Invalid blog post from CMS');

  return { props: { post }, revalidate: 30 };
};

const BLOG_SLUGS_QUERY = gql`
  query BlogSlugs {
    blogPostCollection {
      items {
        slug
      }
    }
  }
`;
export const getStaticPaths: GetStaticPaths = async () => {
  const { blogPostCollection } = await client.request<BlogSlugsQuery>(
    BLOG_SLUGS_QUERY
  );

  return {
    paths: blogPostCollection?.items.map((post) => `/blog/${post?.slug}`) ?? [],
    fallback: 'blocking',
  };
};
