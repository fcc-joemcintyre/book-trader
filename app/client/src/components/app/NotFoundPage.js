import { Fragment } from 'react';
import { Text } from '../../../libs/uikit';
import { Header } from '../header';

export const NotFoundPage = () => (
  <Fragment>
    <Header />
    <Text pt='10px' center>Sorry, could not find that page for you.</Text>
  </Fragment>
);
