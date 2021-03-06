require('dotenv').config();

module.exports = {
  overwrite: true,
  schema: {
    'https://graphql.datocms.com': {
      headers: {
        Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
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
