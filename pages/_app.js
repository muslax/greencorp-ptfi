import { SWRConfig } from 'swr';
import fetchJson from 'lib/fetchJson';

import 'tailwindcss/tailwind.css'
import 'lib/globals.css'

function MyApp({ Component, pageProps }) {
  return <SWRConfig
    value={{
      fetcher: fetchJson,
      onError: (err) => {
        console.log(err);
      }
    }}
  >
    <Component {...pageProps} />
  </SWRConfig>
}

export default MyApp
