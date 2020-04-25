'use strict'

const path = require('path');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  // Sometimes, optional fields tend to get not picked up by the GraphQL
  // interpreter if not a single content uses it. Therefore, we're putting them
  // through `createNodeField` so that the fields still exist and GraphQL won't
  // trip up. An empty string is still required in replacement to `null`.

  let slug = '';
  switch (node.internal.type) {
    case 'MarkdownRemark':
      const { permalink, layout } = node.frontmatter;
      const { relativePath } = getNode(node.parent);

      if (!relativePath) return

      slug = permalink;

      if (!slug) {
        slug = `/${relativePath.replace('.md', '')}/`;
      }

      // Used to generate URL to view this content.
      createNodeField({
        node,
        name: 'slug',
        value: slug || ''
      });

      // Used to determine a page layout.
      createNodeField({
        node,
        name: 'layout',
        value: layout || ''
      });
      break;
    case 'ContentfulProject':
      slug = `/project/${node.contentful_id}`;

      createNodeField({
        node,
        name: 'slug',
        value: slug,
      });
      createNodeField({
        node,
        name: 'id',
        value: node.contentful_id,
      });

      break;
  }
};

const generatePagesFromMarkdown = async (graphql, createPage) => {
  const allMarkdown = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            fields {
              layout
              slug
            }
          }
        }
      }
    }
  `);

  if (allMarkdown.errors) {
    console.error(allMarkdown.errors);
    throw new Error(allMarkdown.errors);
  }

  allMarkdown.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (!node.fields) return;

    const { slug, layout } = node.fields;

    createPage({
      path: slug,
      // This will automatically resolve the template to a corresponding
      // `layout` frontmatter in the Markdown.
      //
      // Feel free to set any `layout` as you'd like in the frontmatter, as
      // long as the corresponding template file exists in src/templates.
      // If no template is set, it will fall back to the default `page`
      // template.
      //
      // Note that the template has to exist first, or else the build will fail.
      component: path.resolve(`./src/templates/${layout || 'page'}.tsx`),
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug
      }
    });
  });
};

const generatePagesFromContentful = async (graphql, createPage) => {
  const generateFromProjects = async () => {
    const projects = await graphql(`
      {
        allContentfulProject {
          edges {
            node {
              fields {
                slug
                id
              }
            }
          }
        }
      }
    `);

    if (projects.errors) {
      console.error(projects.errors);
      throw new Error(projects.errors);
    }

    projects.data.allContentfulProject.edges.forEach(({ node }) => {
      const { slug, id } = node.fields;

      createPage({
        path: slug,
        component: path.resolve('./src/templates/project.tsx'),
        context: {
          slug,
          id,
        }
      });
    });
  };

  await Promise.all([generateFromProjects()]);
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const promises = [
    generatePagesFromMarkdown(graphql, createPage),
    generatePagesFromContentful(graphql, createPage),
  ];
  await Promise.all(promises);
};
