import React, { Fragment } from 'react';
import { Box, LinkExternal, PageContent, Text } from 'uikit';
import { Header } from '../Header';

export const AboutPage = () => (
  <Fragment>
    <Header />
    <PageContent>
      <Text as='h1' center>About BookTrader</Text>
      <Box center noborder maxw='500px'>
        <Text as='p'>
          Written by Joe McIntyre, BookTrader is a full stack project defined by FreeCodeCamp.
        </Text>
        <Text as='p'>
          The source code is published on GitHub under a MIT LIcense. (
          <LinkExternal to='https://github.com/fcc-joemcintyre/book-trader'>
            Link
          </LinkExternal>
          )
        </Text>
        <Text as='p'>
          Technologies used include:
        </Text>
        <Box as='ul'>
          <Text as='li'>Client: React (16.x), Styled Components, React Redux, and React Router</Text>
          <Text as='li'>Server: Node (14.x) using Express and Passport</Text>
          <Text as='li'>Database: Mongo (4.x)</Text>
          <Text as='li'>Languages: Javascript (ES2020), CSS</Text>
        </Box>
        <Text as='p'>
          Thanks to:
        </Text>
        <Box as='ul'>
          <Text as='li'>GitHub (source hosting)</Text>
          <Text as='li'>Heroku (app hosting)</Text>
          <Text as='li'>MongoDB Atlas (database hosting)</Text>
          <Text as='li'>TravisCI (continuous integration testing)</Text>
        </Box>
      </Box>
    </PageContent>
  </Fragment>
);
