import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useThemeStore } from '@/app/stores/theme';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: 'light' });
  });

  it('shows a moon (switch-to-dark) in light mode', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button', { name: 'Switch to dark mode' })).toBeInTheDocument();
  });

  it('clicking flips the resolved theme, and the label flips with it', () => {
    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole('button', { name: 'Switch to dark mode' }));
    expect(useThemeStore.getState().theme).toBe('dark');
    expect(screen.getByRole('button', { name: 'Switch to light mode' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Switch to light mode' }));
    expect(useThemeStore.getState().theme).toBe('light');
    expect(screen.getByRole('button', { name: 'Switch to dark mode' })).toBeInTheDocument();
  });

  it('meets the 44px minimum touch target', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toHaveClass('min-h-touch', 'min-w-touch');
  });
});
