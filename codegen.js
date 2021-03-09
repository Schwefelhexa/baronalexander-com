require('dotenv').config();

module.exports = {
  overwrite: true,
  schema: {
    [process.env.CMS_URL]: {
      headers: {
        Authorization: `Bearer ${process.env.CMS_TOKEN}`,
      },
    },
  },
  config: {
    namingConvention: {
      enumValues: 'keep',
    },
  },

  documents: ['src/**/*.tsx', 'src/**/*.ts'],
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations'],
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};
