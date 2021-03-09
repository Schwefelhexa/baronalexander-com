import React from 'react';
import { gql } from 'graphql-request';
import { GetStaticPaths, GetStaticProps } from 'next';

import client from '../../core/data/client';
import {
  BlogPostQuery,
  BlogPostQueryVariables,
  BlogSlugsQuery,
} from '../../generated/graphql';

type Post = NonNullable<
  NonNullable<NonNullable<BlogPostQuery['blogPostCollection']>['items']>[0]
>;

export interface BlogPostPageProps {
  post: Post;
}
const BlogPostPage: React.FC<BlogPostPageProps> = ({ post }) => {
  return <h1>{post.title}</h1>;
};
export default BlogPostPage;

const BLOG_POST_QUERY = gql`
  query BlogPost($slug: String!) {
    blogPostCollection(where: { slug: $slug }) {
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

  return { props: { post } };
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
