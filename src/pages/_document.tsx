import Document, { Html, Head, Main, NextScript } from 'next/document';
import { DARK_MODE_LOCAL_STORAGE_KEY } from '../components/feature/dark_mode';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: darkModeScript,
            }}
          ></script>

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// This is done outside of React to prevent the 'white flash of death' before React starts up
const darkModeScript = `
  var key = '${DARK_MODE_LOCAL_STORAGE_KEY}';
  var stored = localStorage.getItem(key);

  var container = document.getElementsByTagName('html')[0];

  function setDarkMode(enabled) {
    localStorage.setItem(key, enabled ? 'true' : 'false');
    if (enabled) {
      container.classList.add('dark');
    }
  }

  if (typeof stored === 'string') {
    setDarkMode(stored === 'true');
  } else {
    setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
`;
