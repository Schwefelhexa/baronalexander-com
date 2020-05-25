import React from 'react';
import { graphql, Link as GatsbyLink } from 'gatsby';
import { Page } from '../components/Page';
import { Hero, HeroText } from '../components/designsystem/Hero';
import { Link } from '../components/designsystem/Link';

interface IProjectsPageProps {
  data: ProjectsPageQueryResponse;
}
const ProjectsPage: React.FC<IProjectsPageProps> = ({ data }) => (
  <Page>
    <Hero>
      <HeroText>Projects</HeroText>
    </Hero>
    <div className="projects">
      {data.allContentfulProject.edges.map(({ node }, i, arr) => (
        <div className={`project-overview ${i === (arr.length - 1) ? 'project-overview--last' : ''}`} key={node.contentful_id}>
          <GatsbyLink to={`/projects/${node.contentful_id}`}>
            <h3 className="project-overview__title">{node.title}</h3>
            <p className="project-overview__description">{node.description.description}</p>
          </GatsbyLink>
          <div className="project-overview__technologies">
            {node.technologies.map((technology) => (
              <div className="project-overview__technology" key={technology.contentful_id}>
                <Link to={technology.link} external stealthy>
                  {technology.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </Page>
);

export default ProjectsPage;

export const query = graphql`
query ProjectsPageQuery {
  allContentfulProject {
    edges {
      node {
        title
        description {
          description
        }
        technologies {
          name
          contentful_id
          link
        }
        contentful_id
      }
    }
  }
}`;
interface ProjectsPageQueryResponse {
  allContentfulProject: {
    edges: {
      node: {
        title: string;
        description: {
          description: string;
        }
        technologies: {
          name: string;
          contentful_id: string;
          link: string;
        }[]
        contentful_id: string;
      }
    }[]
  }
}
