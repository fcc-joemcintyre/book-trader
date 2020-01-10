import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, PageContent, TabContainer, TabController, Tab, TabPanel, Text } from 'uikit';
import { Header } from '../Header';
import { PollItem } from '../PollPage';

const ResultPageBase = ({ polls }) => {
  // if no polls for user, display message
  if (polls.length === 0) {
    return (
      <Fragment>
        <Header />
        <PageContent>
          <Text as='h1' center>Poll Results</Text>
          <Text as='p' center>You do not have any polls yet</Text>
        </PageContent>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Header />
      <PageContent>
        <Text as='h1' center>Poll Results</Text>
        <TabController initialValue={polls[0]._id}>
          <TabContainer>
            { polls.map (a => <Tab key={a._id} value={a._id}>{a.title}</Tab>) }
          </TabContainer>
          { polls.map ((a) => {
            const totalVotes = a.choices.reduce ((c, b) => c + b.votes, 0);
            const choices = a.choices.map ((choice) => {
              const percent = (totalVotes === 0) ? 0 : Math.floor ((choice.votes / totalVotes) * 100);
              return (
                <PollItem key={choice.text} text={choice.text} percent={percent} />
              );
            });

            return (
              <TabPanel key={a._id} value={a._id}>
                <Box>
                  <Text as='h2' center>{a.title}</Text>
                  <Text as='p' center>Total Votes: {totalVotes}</Text>
                  { choices }
                </Box>
              </TabPanel>
            );
          })}
        </TabController>
      </PageContent>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  username: state.user.username,
  polls: state.polls.filter (poll => (poll.creator === state.user.username)),
});

export const ResultPage = connect (mapStateToProps) (ResultPageBase);

ResultPageBase.propTypes = {
  polls: PropTypes.arrayOf (PropTypes.shape ({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf (PropTypes.shape ({
      votes: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
};
