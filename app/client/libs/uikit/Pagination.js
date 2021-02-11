import React from 'react';
import PropTypes from 'prop-types';
import { Box } from './Box';
import { Flex } from './Flex';
import { Text } from './Text';

export const Pagination = (
  { items, pageItems, visible, first, current, font, fontsize, c, cselected,
    tc, tcselected, gap, onChange, ...rest }
) => {
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
        fontsize={fontsize}
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
      { start > 0 ?
        <Text
          font={font}
          fontsize={fontsize}
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
        </Text> :
        <Text
          c='transparent'
          cursor='default'
        >
          &lt;
        </Text>
      }
      {elements}
      { (end < (pages - 1)) &&
        <Text
          font={font}
          fontsize={fontsize}
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
      }
    </Flex>
  );
};

Pagination.propTypes = {
  ...Box.propTypes,
  items: PropTypes.number.isRequired,
  pageItems: PropTypes.number.isRequired,
  visible: PropTypes.number.isRequired,
  first: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  c: PropTypes.string,
  cselected: PropTypes.string,
  tc: PropTypes.string,
  tcselected: PropTypes.string,
  gap: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  c: '#000000',
  cselected: '#0000ff',
  tc: null,
  tcselected: null,
  gap: '6px',
};
