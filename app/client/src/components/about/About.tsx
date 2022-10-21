import { PageContent } from '../ui';

export const About = () => (
  <PageContent>
    <h1 className='text-center mb-4'>About BookTrader</h1>
    <div className='max-w-md mx-auto'>
      <p className='mb-4'>
        Written by Joe McIntyre, BookTrader is a full stack project defined by FreeCodeCamp.
      </p>
      <p className='mb-4'>
        The{' '}
        <a
          href='https://github.com/fcc-joemcintyre/book-trader'
          target='_blank'
          rel='noopener noreferrer'
        >
          source code
        </a>
        {' '}is published on GitHub under an MIT LIcense.
      </p>
      <p className='mb-2'>
        Technologies used include:
      </p>
      <ul className='mb-4'>
        <li className='list-disc ml-4'>Client: React (18.x), Tailwind CSS, React Redux, and React Router</li>
        <li className='list-disc ml-4'>Server: Node (18.x) using Express and Passport</li>
        <li className='list-disc ml-4'>Database: Mongo (5.x)</li>
        <li className='list-disc ml-4'>Language: Typescript</li>
      </ul>
      <p className='mb-2'>
        Thanks to:
      </p>
      <ul>
        <li className='list-disc ml-4'>GitHub (source hosting)</li>
        <li className='list-disc ml-4'>Render and Heroku (app hosting)</li>
        <li className='list-disc ml-4'>MongoDB Atlas (database hosting)</li>
        <li className='list-disc ml-4'>TravisCI (continuous integration testing)</li>
      </ul>
    </div>
  </PageContent>
);
