import { Box, Button, Divider, Text } from '@cygns/uikit';
import { useDeleteTradeRequestMutation, useExecuteTradeMutation, useGetBooksQuery } from '../../store/api';
import { useAppSelector } from '../../store/hooks';
import { Header } from '../header';

export const Request = () => {
  const user = useAppSelector ((state) => state.user.key);
  const { data: books, isLoading } = useGetBooksQuery ();
  const [deleteTradeRequest] = useDeleteTradeRequestMutation ();
  const [executeTrade] = useExecuteTradeMutation ();

  const itemsRequested: JSX.Element[] = [];
  const itemsPending: JSX.Element[] = [];
  if (!isLoading && books) {
    for (const book of books) {
      if (book.requester === user) {
        itemsRequested.push (
          <tr key={book.key}>
            <td className='r-title'>{book.title}</td>
            <td className='r-author'>{book.author}</td>
            <td className='r-owner'>{book.owner}</td>
            <td className='r-action'>
              <Button
                type='button'
                onClick={() => { deleteTradeRequest ({ key: book.key }); }}
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
                type='button'
                onClick={() => { executeTrade ({ key: book.key }); }}
              >
                Approve
              </Button>
              <Button
                type='button'
                onClick={() => { deleteTradeRequest ({ key: book.key }); }}
              >
                Decline
              </Button>
            </td>
          </tr>
        );
      }
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
