import * as React from 'react';
import { Page } from '../components/Page';

const IndexPage: React.FC = () => (
  <Page className="homepage">
    <div className="hero">
      <h1 className="hero__text">
        Alexander
        <br />
        Baron
      </h1>
      <h2 className="hero__subtext divtext">
        <span className="divtext__item">Student</span>
        <span className="divtext__item">@</span>
        <span className="divtext__item divtext__item--last">Gymnasium Gerresheim</span>
      </h2>
    </div>
    <div className="btn-group">
      <button type="button" className="btn btn--secondary btn-group__item">Stuff I do</button>
      <button type="button" className="btn btn-group__item btn-group__item--last">Contact me</button>
    </div>
  </Page>
);

export default IndexPage;
