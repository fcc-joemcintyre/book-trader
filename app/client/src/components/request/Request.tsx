import { useDeleteTradeRequestMutation, useExecuteTradeMutation, useGetBooksQuery } from '../../store/api';
import { useAppSelector } from '../../store/hooks';
import { Button } from '../ui';

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
            <td className=''>{book.title}</td>
            <td className=''>{book.author}</td>
            <td className=''>{book.owner}</td>
            <td className=''>
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
            <td className=''>{book.title}</td>
            <td className=''>{book.author}</td>
            <td className=''>{book.requester}</td>
            <td className=''>
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
    <div className='p-4 pt-8'>
      <h1>Your Requests</h1>
      {itemsRequested.length === 0 ? (
        <p>No outstanding requests.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th className=''>Title</th>
              <th className=''>Author</th>
              <th className=''>Owner</th>
              <th className=''>Action</th>
            </tr>
          </thead>
          <tbody>
            {itemsRequested}
          </tbody>
        </table>
      )}

      <hr className='my-4' />

      <h1>Trade Requests</h1>
      {itemsPending.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th className=''>Title</th>
              <th className=''>Author</th>
              <th className=''>Requester</th>
              <th className=''>Action</th>
            </tr>
          </thead>
          <tbody>
            {itemsPending}
          </tbody>
        </table>
      )}
    </div>
  );
};
