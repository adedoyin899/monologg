import { Avatar, Badge, Button, Card, CueDivider, EscrowProgress } from '@/components';
import { formatMoneyForCountry } from '@/lib/money';

const RATE = formatMoneyForCountry({ amount: 18_000_000, currency: 'NGN' }, 'NG');

/** Dashboard-preview section: a real storefront card + order-room mock (design doc §7). */
export function ProductPreview() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-12">
      <h2 className="text-h2">A storefront that closes. An order room that pays.</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Storefront (PWA-07 preview) */}
        <Card className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Avatar name="Adaeze Obi" size="lg" verified />
            <div>
              <p className="text-h3">Adaeze Obi</p>
              <p className="flex items-center text-small text-muted">
                Voice-over Artist
                <CueDivider />
                Lagos
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {['Warm Texture', 'Conversational', 'Expressive'].map((tag) => (
              <span
                key={tag}
                className="rounded-pill bg-surface-2 px-3 py-1 text-small text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-2 rounded-md border border-divider p-4">
            <p className="text-body font-medium text-ink">30-second commercial VO</p>
            <p className="font-mono text-body-lg text-ink">{RATE}</p>
            <p className="text-small text-muted">Delivered in 3 days</p>
            <Button size="md">Book</Button>
          </div>
        </Card>

        {/* Order room (PWA-13 preview) */}
        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <p className="font-mono text-body text-muted">Order / BK-2931</p>
            <Badge variant="escrow">In escrow</Badge>
          </div>
          <EscrowProgress current={1} />
          <div className="flex flex-col gap-2">
            <p className="max-w-[85%] self-start rounded-md bg-surface-2 p-3 text-body text-ink">
              Script attached — can we get the warm read by Thursday?
            </p>
            <p className="max-w-[85%] self-end rounded-md bg-accent-solid p-3 text-body text-accent-fg">
              Already in the booth. First cut lands tomorrow.
            </p>
            <p className="self-center text-small text-muted">
              / Deliverables uploaded — awaiting review /
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
