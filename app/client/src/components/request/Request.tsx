import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Divider, Text } from '../../../libs/uikit';
import { Book } from '../../store/api';
import { RootState } from '../../store/store';
import { deleteTradeRequest, executeTrade } from '../../store/bookActions';
import { Header } from '../header';

export const Request = () => {
  const dispatch = useDispatch ();
  const books = useSelector ((state: RootState) => state.books) as Book[];
  const user = useSelector ((state: RootState) => state.user.key);

  const itemsRequested: JSX.Element[] = [];
  const itemsPending: JSX.Element[] = [];
  for (const book of books) {
    if (book.requester === user) {
      itemsRequested.push (
        <tr key={book.key}>
          <td className='r-title'>{book.title}</td>
          <td className='r-author'>{book.author}</td>
          <td className='r-owner'>{book.owner}</td>
          <td className='r-action'>
            <Button
              onClick={() => {
                dispatch (deleteTradeRequest (book));
              }}
            >
              Cancel
            </Button>
          </td>
        </tr>
      );
    } else if ((book.owner === user) && (book.requester !== 0)) {
      itemsPending.push (
        <tr key={book.key}>
          <td className='r-title'>{book.title}</td>
          <td className='r-author'>{book.author}</td>
          <td className='r-requester'>{book.requester}</td>
          <td className='r-action'>
            <Button
              onClick={() => {
                dispatch (executeTrade (book));
              }}
            >
              Approve
            </Button>
            <Button
              onClick={() => {
                dispatch (deleteTradeRequest (book));
              }}
            >
              Decline
            </Button>
          </td>
        </tr>
      );
    }
  }

  return (
    <>
      <Header />
      <Box p='0 8px 20px 8px'>
        <Text as='h2'>Your Requests</Text>
        {itemsRequested.length === 0 ? (
          <p>No outstanding requests.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th className='r-title'>Title</th>
                <th className='r-author'>Author</th>
                <th className='r-owner'>Owner</th>
                <th className='r-action'>Action</th>
              </tr>
            </thead>
            <tbody>
              {itemsRequested}
            </tbody>
          </table>
        )}

        <Divider />
        <Text as='h2'>Trade Requests</Text>
        {itemsPending.length === 0 ? (
          <p>No pending requests.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th className='r-title'>Title</th>
                <th className='r-author'>Author</th>
                <th className='r-requester'>Requester</th>
                <th className='r-action'>Action</th>
              </tr>
            </thead>
            <tbody>
              {itemsPending}
            </tbody>
          </table>
        )}
      </Box>
    </>
  );
};
