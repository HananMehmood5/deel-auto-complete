import React from 'react';
import { render, screen } from '@testing-library/react';
import AutoComplete from '.';

test('renders learn react link', () => {
  render(<AutoComplete />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
