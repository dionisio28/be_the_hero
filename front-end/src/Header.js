import React from 'react';

// import { Container } from './styles';

export default function Header({ children }) {
  return (
    <header>
        <h1>{children}</h1>
    </header>
  );
}
