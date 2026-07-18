import { Avatar, Card, CueDivider } from '@/components';

/** Placeholder quotes in the approved-copy-bank voice — swap for real ones at launch. */
const QUOTES = [
  {
    quote:
      'Booked, signed, and paid — before the coffee went cold. I didn’t know gigs could feel like that.',
    name: 'Kofi Mensah',
    role: 'Comedian',
    place: 'Accra',
  },
  {
    quote:
      'I stopped chasing invoices in week one. The escrow bar does the arguing for me now.',
    name: 'Adaeze Obi',
    role: 'Voice-over Artist',
    place: 'Lagos',
  },
  {
    quote: 'One brief on Monday. Shortlist by lunch. MC on stage Friday. That used to take a month.',
    name: 'Tunde Akinola',
    role: 'Event Producer',
    place: 'London',
  },
] as const;

export function Testimonials() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-12">
      <h2 className="text-h2">Word from the wings</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {QUOTES.map((item) => (
          <Card key={item.name} className="flex flex-col gap-4">
            <p className="text-body-lg text-ink">“{item.quote}”</p>
            <div className="mt-auto flex items-center gap-3">
              <Avatar name={item.name} size="md" />
              <p className="flex flex-wrap items-center text-small text-muted">
                {item.name}
                <CueDivider />
                {item.role}
                <CueDivider />
                {item.place}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
