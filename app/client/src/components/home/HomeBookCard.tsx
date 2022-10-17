import { Book, useCreateTradeRequestMutation, useDeleteTradeRequestMutation } from '../../store/api';
import { useAppSelector } from '../../store/hooks';
import { Action, BookCard } from '../book/BookCard';

type Props = {
  book: Book,
};

export const HomeBookCard = ({ book }: Props) => {
  const user = useAppSelector ((state) => state.user.key || 0);
  const [createTradeRequest] = useCreateTradeRequestMutation ();
  const [deleteTradeRequest] = useDeleteTradeRequestMutation ();

  let actions: Action[] | undefined;
  if ((user !== 0) && (book.owner !== user)) {
    if (book.requester === user) {
      actions = [{
        text: 'Cancel Request',
        fn: (b) => deleteTradeRequest ({ key: b.key }),
      }];
    } else if (book.requester === 0) {
      actions = [{
        text: 'Request Book',
        fn: (b) => createTradeRequest ({ key: b.key }),
      }];
    }
  }

  return <BookCard book={book} actions={actions} />;
};
