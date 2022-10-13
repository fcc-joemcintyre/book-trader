import { useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Button } from './Button';

type Props = {
  actions?: string[],
  closeAction?: string,
  content: React.ReactNode,
  data?: unknown,
  onClose?: (closeAction: string, data: unknown) => void,
};

export const MessageBox = ({
  actions = [],
  closeAction,
  content,
  data,
  onClose = () => { /* no op */ },
}: Props) => {
  useEffect (() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (closeAction && (e.code === 'Escape')) {
        onClose (closeAction, data);
      }
    };

    document.addEventListener ('keydown', onKeydown);

    return (() => {
      document.removeEventListener ('keydown', onKeydown);
    });
  }, [closeAction, data, onClose]);

  return (
    <Dialog open onClose={() => { /* no op */ }} as='div' className='relative z-[100]'>
      <div className='fixed inset-0 overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4 bg-cyan-200 bg-opacity-50'>
          <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-4 shadow-xl'>
            { closeAction && (
              <div className='p-2 text-right'>
                <button
                  type='button'
                  onClick={() => { onClose (closeAction, data); }}
                  aria-label='Close dialog'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='#7f7f7f'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
            )}
            <div className='p-4 align-center'>
              {content}
            </div>
            { (actions.length > 0) && (
              <div className='flex space-x-2 justify-center mt-8'>
                {actions.map ((action) => (
                  <Button
                    type='button'
                    key={action}
                    onClick={() => { onClose (action, data); }}
                  >
                    {action}
                  </Button>
                ))}
              </div>
            )}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};
