import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Divider, Text } from '../../../libs/uikit';
import { deleteTradeRequest, executeTrade } from '../../store/bookActions';
import { Header } from '../header';

export const RequestPage = () => {
  const dispatch = useDispatch ();
  const books = useSelector ((state) => state.books);
  const user = useSelector ((state) => state.user.username);

  const itemsRequested = [];
  const itemsPending = [];
  for (const book of books) {
    if (book.requesterId === user) {
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
    } else if ((book.ownerId === user) && (book.requesterId !== '')) {
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
