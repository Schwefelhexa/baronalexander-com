import React from 'react';
import { Formik, Form } from 'formik';

import { Page } from '../components/Page';
import { Hero, HeroText } from '../components/designsystem/Hero';
import { Button } from '../components/designsystem/Button';
import { Input, Textarea } from '../components/designsystem/Input';

// Taken from https://emailregex.com/
// eslint-disable-next-line no-control-regex, max-len
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

interface ContactData {
  title: string;
  message: string;
  mail: string;
}
const ContactPage: React.FC = () => (
  <Page className="contactpage">
    <Hero>
      <HeroText>Contact</HeroText>
    </Hero>
    <Formik<ContactData>
      initialValues={{ title: '', message: '', mail: '' }}
      validate={(values) => {
        const errors: { [P in keyof ContactData]?: string } = {};

        if (values.title.trim().length === 0) errors.title = 'Please provide a title';
        if (values.message.trim().length === 0) errors.message = 'Please provide a message';
        if (values.mail.trim().length === 0) errors.mail = 'Please provide an email';
        else if (!values.mail.match(emailRegex)) errors.mail = 'Please provide a valid email';

        return errors;
      }}
      onSubmit={(values) => console.log(values)}
    >
      {() => (
        <Form>
          <Input label="Title" name="title" />
          <Textarea label="Message" name="message" />
          <Input label="Your email" name="mail" />
          <Button type="submit">Send</Button>
        </Form>
      )}
    </Formik>
  </Page>
);

export default ContactPage;
