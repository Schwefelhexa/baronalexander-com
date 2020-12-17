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

  documents: 'src/**/*.tsx',
  generates: {
    'src/generated/graphql.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};
