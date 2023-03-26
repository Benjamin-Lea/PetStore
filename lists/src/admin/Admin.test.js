import { render, screen } from '@testing-library/react';
import AdminPets from './admin/pets';

test('renders learn react link', () => {
  render(<AdminPets />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
