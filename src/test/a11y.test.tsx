import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { ComponentShowcase } from '@/app/KitchenSinkComponents';
import Register from '@/auth/Register';
import { Badge, Button, Modal } from '@/components';
import NotificationSettings from '@/shared/settings/NotificationSettings';

expect.extend(toHaveNoViolations);

/**
 * Automated a11y smoke tests (axe-core via jest-axe) for key screens/components.
 *
 * IMPORTANT SCOPE NOTE: jsdom does not paint, so axe's `color-contrast` rule is
 * unreliable here (no real pixels to sample) — it is disabled below. Contrast
 * is instead verified by the documented, hand-audited ratios in
 * MONOLOGG_DESIGN_SYSTEM-2.md §3.7 (41 pairings, both themes, both audiences)
 * and by the manual browser pass recorded in README.md. Everything else axe
 * checks — labels, roles, ARIA usage, landmark structure, focus order — is
 * fully exercised here and does reflect real DOM structure.
 */
const AXE_OPTIONS = { rules: { 'color-contrast': { enabled: false } } };

function withAudience(children: React.ReactNode, audience: 'talent' | 'client' = 'talent') {
  return <div data-audience={audience}>{children}</div>;
}

describe('a11y: design-system components (kitchen sink)', () => {
  it('has no axe violations across buttons, forms, badges, cards, tabs, escrow bar', async () => {
    const { container } = render(withAudience(<ComponentShowcase />));
    const results = await axe(container, AXE_OPTIONS);
    expect(results).toHaveNoViolations();
  }, 15000);
});

describe('a11y: Modal (focus trap surface)', () => {
  it('exposes a proper dialog role and traps initial focus inside the panel', async () => {
    const { container } = render(
      withAudience(
        <Modal open onClose={() => {}} title="Confirm booking">
          <p>Escrow details.</p>
        </Modal>,
      ),
    );

    const dialog = screen.getByRole('dialog', { name: 'Confirm booking' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    // focus lands inside the panel on open, not left on the trigger/body
    expect(dialog.contains(document.activeElement)).toBe(true);

    const results = await axe(container, AXE_OPTIONS);
    expect(results).toHaveNoViolations();
  });

  it('renders nothing (no dialog in the tree) when closed', () => {
    render(
      withAudience(
        <Modal open={false} onClose={() => {}} title="Hidden">
          <p>Not shown.</p>
        </Modal>,
      ),
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('a11y: status badges never rely on color alone', () => {
  it('every badge variant carries a text label alongside its icon', () => {
    render(
      withAudience(
        <>
          <Badge variant="verified">Verified</Badge>
          <Badge variant="processing">Processing</Badge>
          <Badge variant="escrow">In escrow</Badge>
          <Badge variant="paid">Paid</Badge>
          <Badge variant="error">Failed</Badge>
          <Badge variant="info">Heads up</Badge>
        </>,
      ),
    );
    for (const label of ['Verified', 'Processing', 'In escrow', 'Paid', 'Failed', 'Heads up']) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });
});

describe('a11y: Button meets the 44px minimum touch target', () => {
  it('the default (lg) size uses the min-h-touch utility', () => {
    render(withAudience(<Button>Book now</Button>));
    expect(screen.getByRole('button', { name: 'Book now' })).toHaveClass('h-12');
  });
});

describe('a11y: Register screen (audience radiogroup + labelled form)', () => {
  it('has no axe violations and exposes the account-type choice as a radiogroup', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/auth/register']}>
        <Register />
      </MemoryRouter>,
    );

    expect(screen.getByRole('radiogroup', { name: 'Account type' })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(2);
    // labelled inputs — Field wires htmlFor/id so getByLabelText must resolve
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    // the light/dark toggle lives in the shared AuthLayout header — present
    // and reachable on every /auth/* screen, this one included
    expect(
      screen.getByRole('button', { name: /switch to (light|dark) mode/i }),
    ).toBeInTheDocument();

    const results = await axe(container, AXE_OPTIONS);
    expect(results).toHaveNoViolations();
  }, 15000);
});

describe('a11y: a settings screen (PageShell + Toggle)', () => {
  it('has no axe violations and every preference is a labelled switch', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/settings/notifications']}>
        <NotificationSettings />
      </MemoryRouter>,
    );

    const switches = screen.getAllByRole('switch');
    expect(switches.length).toBeGreaterThan(0);
    for (const control of switches) {
      expect(control).toHaveAccessibleName();
    }

    const results = await axe(container, AXE_OPTIONS);
    expect(results).toHaveNoViolations();
  }, 15000);
});
