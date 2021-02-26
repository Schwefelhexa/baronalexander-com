require('dotenv').config();

module.exports = {
  overwrite: true,
  schema: {
    'https://api-eu-central-1.graphcms.com/v2/ckll0v7pydvbk01z39gg80koh/master': {
      headers: {
        Authorization: `Bearer ${process.env.GRAPH_CMS_TOKEN}`,
      },
    },
  },
  config: {
    namingConvention: {
      enumValues: 'keep',
    },
  },

  documents: 'src/**/*.tsx',
  generates: {
    'src/generated/graphql.tsx': {
      plugins: ['typescript', 'typescript-operations'],
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};
