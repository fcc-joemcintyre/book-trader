import { useCallback, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { useAppSelector } from '../../store/hooks';
import { Login } from '../login';
import { Register } from '../register';

const base = 'hover:bg-cyan-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium';
const activeItem = `text-white ${base}`;
const inactiveItem = `text-gray-200 ${base}`;

export function Nav () {
  const ref = useRef ();
  const [isOpen, setIsOpen] = useState (false);
  const [dialog, setDialog] = useState<JSX.Element | null> (null);
  const authenticated = useAppSelector ((a) => a.user.authenticated);

  const onClose = useCallback (() => {
    setDialog (null);
  }, [setDialog]);

  const buildClassName = useCallback ((t) => (
    `${t.isActive ? activeItem : inactiveItem}${isOpen ? ' block' : ''}`
  ), [isOpen]);

  const items = (
    <>
      { authenticated && (
        <>
          <NavLink
            to='/requests'
            className={(t) => buildClassName (t)}
            onClick={() => { setIsOpen (false); }}
          >
            Requests
          </NavLink>
          <NavLink
            to='/manage'
            className={(t) => buildClassName (t)}
            onClick={() => { setIsOpen (false); }}
          >
            Manage
          </NavLink>
        </>
      )}
      <NavLink
        to='/about'
        className={(t) => buildClassName (t)}
        onClick={() => { setIsOpen (false); }}
      >
        About
      </NavLink>
      { authenticated && (
        <NavLink
          to='/logout'
          className={(t) => buildClassName (t)}
          onClick={() => { setIsOpen (false); }}
        >
          Logout
        </NavLink>
      )}
      { !authenticated && (
        <>
          <button
            type='button'
            className={`${inactiveItem}${isOpen ? ' block' : ''}`}
            onClick={() => { setIsOpen (false); setDialog (<Register onClose={onClose} />); }}
          >
            Register
          </button>
          <button
            type='button'
            className={`${inactiveItem}${isOpen ? ' block' : ''}`}
            onClick={() => { setIsOpen (false); setDialog (<Login onClose={onClose} />); }}
          >
            Login
          </button>
        </>
      )}
    </>
  );

  return (
    <div>
      <nav className='fixed w-full top-0 z-10 bg-brand'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-12'>
            <NavLink
              to='/'
              end
              className={activeItem}
              onClick={() => { setIsOpen (false); }}
            >
              Book Trader
            </NavLink>
            <div className='flex items-center'>
              <div className='hidden md:block'>
                <div className='ml-10 flex items-baseline space-x-3'>
                  {items}
                </div>
              </div>
            </div>
            <div className='-mr-2 flex md:hidden'>
              <button
                onClick={() => setIsOpen (!isOpen)}
                type='button'
                className='bg-cyan-500 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cyan-600 focus:ring-white'
                aria-controls='mobile-menu'
                aria-expanded='false'
              >
                <span className='sr-only'>Open menu</span>
                {!isOpen ? (
                  <svg
                    className='block h-6 w-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>
                ) : (
                  <svg
                    className='block h-6 w-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter='transition ease-out duration-100 transform'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='transition ease-in duration-75 transform'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          { isOpen ? (
            <div className='md:hidden' id='mobile-menu'>
              <div ref={ref.current} className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
                <NavLink
                  to='/'
                  end
                  className={(t) => buildClassName (t)}
                  onClick={() => { setIsOpen (false); }}
                >
                  Home
                </NavLink>
                {items}
              </div>
            </div>
          ) : (
            <div />
          )}
        </Transition>
      </nav>
      <div className='h-12' />
      {dialog}
    </div>
  );
}
