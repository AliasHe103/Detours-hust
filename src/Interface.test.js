import { render, screen } from '@testing-library/react';
import Interface from './Interface';

test('renders learn react link', () => {
  render(<Interface />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
