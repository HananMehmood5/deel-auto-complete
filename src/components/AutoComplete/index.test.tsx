import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import AutoComplete from '.';

import useProductFetcher from 'hooks/useProductFetcher';
jest.mock('hooks/useProductFetcher');

const mockedUseProductFetcher = useProductFetcher as any;

describe('AutoComplete', () => {
  test('Checks the basics: Component rendering, input value change and async call', async () => {
    mockedUseProductFetcher.mockReturnValue({
      loading: true,
      products: [],
      error: undefined,
      getProducts: jest.fn(),
      setLoading: jest.fn()
    });
    render(<AutoComplete />);
    const inputElement: HTMLInputElement = screen.getByPlaceholderText('Type to search...');
    expect(inputElement).toBeInTheDocument();

    fireEvent.change(inputElement, { target: { value: 'Bal' } });
    expect(inputElement.value).toBe('Bal');

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  test('Check with mocks: Searching for a product not existing', async () => {
    mockedUseProductFetcher.mockReturnValue({
      loading: false,
      products: [],
      error: undefined,
      getProducts: jest.fn(),
      setLoading: jest.fn()
    });

    render(<AutoComplete />);
    const inputElement: HTMLInputElement = screen.getByPlaceholderText('Type to search...');

    fireEvent.change(inputElement, { target: { value: 'Ball' } });

    await waitFor(() => {
    //   expect(screen.getAllByRole('list')).toHaveLength(1);
      expect(screen.getByRole('status').innerHTML).toContain('o results found for the query "Ball". Try "Gloves"? 🤔');
    });
  });

  test('Check with mocks: Searching for a existing product', async () => {
    mockedUseProductFetcher.mockReturnValue({
      loading: false,
      products: [{
        id: 1,
        name: 'Balls'
      }],
      error: undefined,
      getProducts: jest.fn(),
      setLoading: jest.fn()
    });

    render(<AutoComplete />);
    const inputElement: HTMLInputElement = screen.getByPlaceholderText('Type to search...');

    fireEvent.change(inputElement, { target: { value: 'all' } });

    await waitFor(() => {
      expect(screen.getAllByRole('list')).toHaveLength(1);
      expect(screen.getByRole('listitem').innerHTML).toContain('<span>B</span><strong>all</strong><span>s</span>');
    });
  });
});
