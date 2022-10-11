import { Header } from '../header';

type Props = {
  message: string,
};

export const Loading = ({ message }: Props) => (
  <>
    <Header />
    <p className='text-center pt-8'>{message}</p>
  </>
);
