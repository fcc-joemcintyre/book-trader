import { Text } from '@cygns/uikit';
import { Header } from '../header';

type Props = {
  message: string,
};

export const Loading = ({ message }: Props) => (
  <>
    <Header />
    <Text center>{message}</Text>
  </>
);
