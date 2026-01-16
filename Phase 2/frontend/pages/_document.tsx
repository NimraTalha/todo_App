import { Html, Head, Main, NextScript } from 'next/document';

// Attributes commonly added by browser extensions that cause hydration mismatches
const EXTENSION_ATTRIBUTES = [
  'bis_skin_checked',
  'bis_register',
  '__processed_*',
];

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// Custom render function to strip problematic attributes before hydration
// This is handled at the Next.js level to prevent extension attributes from causing mismatches