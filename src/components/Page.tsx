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
export const Page: React.FC<IProps & React.HTMLAttributes<HTMLDivElement>> = ({
  name, className, children, ...props
}) => {
  const info = useStaticQuery<InfoResponse>(InfoQuery);
  const { title } = info.site.siteMetadata;

  return (
    <>
      <Helmet title={`${title} ${name ? ` - ${name}` : ''}`} />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <div className="page-wrapper">
        <div className={`page ${className ?? ''}`} {...props}>
          {children}
        </div>
      </div>
    </>
  );
};
