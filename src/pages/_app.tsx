// import { store } from '@/store'
// import '@/styles/globals.css'
// import type { AppProps } from 'next/app'
// import { Provider } from 'react-redux'
// import { Analytics } from '@vercel/analytics/react';
// import { AuthProvider } from './../context/authContext';




// export default function App({ Component, pageProps }: AppProps) {
//   return <AuthProvider><Provider store={store}>  <Component {...pageProps} /> <Analytics /></Provider></AuthProvider>
// }


import { store } from '@/store';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from './../context/authContext';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>jnanagni2k25</title>
        <meta name="description" content="Welcome to jnanagni2k25 - The Ultimate Platform" />
        <meta name="keywords" content="jnanagni2k25, event, festival, education, technology" />
        <meta name="author" content="jnanagni2k25 Team" />
        <meta property="og:title" content="jnanagni2k25" />
        <meta property="og:description" content="Join us for jnanagni2k25, a grand celebration of knowledge and innovation!" />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/jnanagni2k25" />
      </Head>
      <AuthProvider>
        <Provider store={store}>
          <Component {...pageProps} />
          <Analytics />
        </Provider>
      </AuthProvider>
    </>
  );
}
