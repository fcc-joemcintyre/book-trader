import { Flex } from './Flex';
import { Text } from './Text';

type Props = {
  items: number,
  pageItems: number,
  visible: number,
  first: number,
  current: number,
  font: string,
  fs: string,
  c?: string,
  cselected?: string,
  tc?: string,
  tcselected?: string,
  gap?: string,
  onChange: (page: number, offset: number) => void,
};

export const Pagination = ({
  items,
  pageItems,
  visible,
  first,
  current,
  font,
  fs,
  c = '#000000',
  cselected = '#0000ff',
  tc,
  tcselected,
  gap = '6px',
  onChange,
  ...rest
}: Props) => {
  const pages = Math.floor (items / (pageItems > 0 ? pageItems : 1)) + (items % pageItems > 0 ? 1 : 0);
  const start = first < pages ? first : pages > 0 ? pages - 1 : 0;
  const end = Math.min (start + visible, pages) - 1;
  const page = current < start ? start : current > end ? end : current;
  const elements = [];
  for (let a = start; a <= end; a += 1) {
    elements.push (
      <Text
        key={a}
        font={font}
        fs={fs}
        c={a === page ? cselected : c}
        tc={a === page ? tcselected : tc}
        cursor='pointer'
        onClick={() => onChange (first, a)} // eslint-disable-line no-loop-func
      >
        {a === page ? <strong>{a + 1}</strong> : a + 1}
      </Text>
    );
  }
  return (
    <Flex gap={gap} {...rest}>
      { start > 0 ? (
        <Text
          font={font}
          fs={fs}
          c={c}
          tc={tc}
          cursor='pointer'
          onClick={() => {
            const c2 = Math.max (page - visible, 0);
            const f2 = Math.max (first - visible, 0);
            onChange (f2, c2);
          }}
        >
          &lt;
        </Text>
      ) : (
        <Text
          c='transparent'
          cursor='default'
        >
          &lt;
        </Text>
      )}
      {elements}
      { (end < (pages - 1)) && (
        <Text
          font={font}
          fs={fs}
          c={c}
          tc={tc}
          cursor='pointer'
          onClick={() => {
            const c2 = Math.min (page + visible, pages - 1);
            const f2 = Math.min (first + visible, pages - visible);
            onChange (f2, c2);
          }}
        >
          &gt;
        </Text>
      )}
    </Flex>
  );
};
