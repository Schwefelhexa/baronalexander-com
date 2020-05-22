import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const InfoQuery = graphql`
query InfoQuery {
  site {
    siteMetadata {
      title
    }
  }
}
`;
interface InfoResponse {
  site: {
    siteMetadata: {
      title: string;
    }
  }
}


interface IProps {
  name?: string;
  children: React.ReactNode;
}
export const Page: React.FC<IProps> = ({ name, children }) => {
  const info = useStaticQuery<InfoResponse>(InfoQuery);
  const { title } = info.site.siteMetadata;

  return (
    <>
      <Helmet title={`${title} ${name ? ` - ${name}` : ''}`} />
      {children}
    </>
  );
};
