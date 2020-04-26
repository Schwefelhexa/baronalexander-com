import * as React from 'react';
import { graphql } from 'gatsby';
import Particles, { RecursivePartial } from 'react-particles-js';

import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';

interface IndexPageProps {
  data: {
    allContentfulProject: {
      edges: {
        node: {
          fields: {
            slug: string;
          }
          title: string;
        }
      }[]
    }
  }
}

const headerHeight = 55;
const Page = styled.div`
  * {
    margin: 0;
    padding: 0;
    font-family: Montserrat;
  }
`;
const Header = styled.header`
  position: relative;
  height: ${headerHeight}vh;
  clip-path: polygon(0 0, 100% 0, 100% 92%, 0% 100%);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const HeaderBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: -1;
  background-color: #19a48c;
`;
const H1 = styled.h1`
  font-size: 8rem;
  font-family: Comfortaa !important;
  font-weight: 400;
  margin-top: -2.5rem;
  color: white;
  `;
const H2 = styled.h2`
  font-weight: normal;
  font-size: 2.2rem;
  color: white;
  margin-top: 2rem;
  `;

const particles = `
  #tsparticles {
    height: 100%;
    width: 100%;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
  padding: 0 2.5rem;

  height: ${100 - headerHeight}vh;
`;

const pMargin = '4rem';
const PContainer = styled.div`
  margin-bottom: calc(-${pMargin} + 2rem);
`;
const P = styled.p`
  text-align: center;
  margin-bottom: ${pMargin};
  line-height: 1.4;
  letter-spacing: 0.02em;
`;
const A = styled.a`
  color: #3E89E1;
  font-wight: 500;
  text-decoration: none;
`;

const particleOptions: RecursivePartial<IOptions> = {
  particles: {
    number: {
      value: 40,
      density: {
        enable: false,
      },
    },
    color: {
      value: '#ffffff',
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000',
      },
      polygon: {
        nb_sides: 5,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
      },
    },
    size: {
      value: 1,
      random: true,
      anim: {
        enable: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#ffffff',
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 4,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse',
      },
      onclick: {
        enable: true,
        mode: 'push',
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 50,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
};

const IndexPage: React.FC<IndexPageProps> = ({ data }) => (
  <Page>
    <Global styles={() => css(particles)} />
    <Header>
      <HeaderBackground>
        <Particles params={particleOptions} />
      </HeaderBackground>
      <H1>Hi!</H1>
      <H2>My name is Alex!</H2>
    </Header>
    <Main>
      <PContainer>
        <P>A very cool website / portfolio is being built here!</P>
        <P>
          If you want to, you can check my progress on
          {' '}
          <A href="https://prev.baronalexander.com/">prev.baronalexander.com</A>
        </P>
      </PContainer>
    </Main>
  </Page>
);

export default IndexPage;

export const query = graphql`
  query IndexPageQuery {
    allContentfulProject {
      edges {
        node {
          fields {
            slug
          }
          title
        }
      }
    }
  }
`;
