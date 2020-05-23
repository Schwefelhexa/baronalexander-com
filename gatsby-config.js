'use strict'

module.exports = {
  siteMetadata: {
    title: 'Alexander Baron',
    description: 'Hi! My name is Alex, and this is my humble little website.',
    keywords: '',
    siteUrl: 'https://baronalexander.com/',
    author: {
      name: 'Alexander Baron',
      url: 'https://baronalexander.com/',
      email: 'me@baronalexander.com'
    }
  },
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `udmg7z63vjmi`,
        accessToken: process.env.BARONALEXANDER_CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_USE_DRAFT === 'true' ? `preview.contentful.com` : undefined,
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem'
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1140,
              quality: 90,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://gatsby-starter-typescript-plus.netlify.com'
      }
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet'
  ]
}
