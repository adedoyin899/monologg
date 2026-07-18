import { Link } from 'react-router-dom';
import { Card, CueDivider } from '@/components';
import { MarketingFooter } from '../MarketingFooter';
import { MarketingNav } from '../MarketingNav';
import { usePageMeta } from '../usePageMeta';
import { BLOG_POSTS } from './posts';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/** WEB-04: blog index — the 100%-organic growth surface. */
export default function BlogIndex() {
  usePageMeta(
    'Blog — monologg/',
    'Notes from the wings: growing a performing-arts career, casting faster, and how escrow keeps everyone honest.',
  );

  return (
    <div className="min-h-screen bg-bg text-ink">
      <MarketingNav />
      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-12">
        <header className="flex max-w-2xl flex-col gap-3">
          <h1 className="text-h1">
            Notes from the wings<span className="text-accent-text">.</span>
          </h1>
          <p className="text-body-lg text-muted">
            Career craft for creators, playbooks for casting, and straight answers about
            money.
          </p>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="group flex">
              <Card interactive className="flex w-full flex-col gap-3">
                <span className="text-label uppercase text-accent-text">{post.category}</span>
                <h2 className="text-h3 group-hover:text-accent-text">{post.title}</h2>
                <p className="text-body text-muted">{post.excerpt}</p>
                <p className="mt-auto flex items-center pt-2 text-small text-muted">
                  {formatDate(post.publishedAt)}
                  <CueDivider />
                  {post.readMinutes} min read
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
