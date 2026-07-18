# components/

Design-system primitives (Button, Input, Card, StatusBadge, RateCard, EscrowProgress…).

Rules for everything in here:

- Read semantic tokens only (`--accent`, `--surface`, `bg-surface`, `text-accent-text`…) — never raw hexes, never Coral/Navy directly.
- Ship all interactive states: default / hover / focus / active / disabled / loading / success / error.
- WCAG 2.2 AA in both themes; 44px minimum touch targets (`min-h-touch`); visible focus rings; respect `prefers-reduced-motion`.
- Semantic names (`btn-primary`, `card-rate`, `badge-verified`…).
