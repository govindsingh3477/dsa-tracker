import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-6 text-center text-sm text-gray-500">
      <p>
        © 2023 DSA Tracker. All rights reserved. |{' '}
        <a
          href="https://github.com/govindsingh3477/dsa-tracker"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          GitHub
        </a>{' '}
        |{' '}
        <a
          href="mailto:gurjargovind994@gmail.com"
          className="text-blue-500 hover:underline"
        >
          Contact Us
        </a>{' '}
        | Privacy Policy | Terms of Service
      </p>
    </footer>
  );
}
