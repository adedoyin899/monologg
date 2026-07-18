import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Avatar, CueDivider } from '@/components';
import { MarketingFooter } from '../MarketingFooter';
import { MarketingNav } from '../MarketingNav';
import { usePageMeta } from '../usePageMeta';
import { postBySlug } from './posts';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** WEB-04: article template — structure stays when the CMS takes over the content. */
export default function BlogArticle() {
  const { slug } = useParams();
  const post = slug ? postBySlug(slug) : undefined;

  usePageMeta(
    post ? `${post.title} — monologg/` : 'Article not found — monologg/',
    post?.excerpt,
  );

  return (
    <div className="min-h-screen bg-bg text-ink">
      <MarketingNav />
      <main className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-12">
        {post ? (
          <article className="flex flex-col gap-6">
            <header className="flex flex-col gap-4">
              <span className="text-label uppercase text-accent-text">{post.category}</span>
              <h1 className="text-h1">{post.title}</h1>
              <div className="flex items-center gap-3">
                <Avatar name={post.author} size="sm" />
                <p className="flex flex-wrap items-center text-small text-muted">
                  {post.author}
                  <CueDivider />
                  {formatDate(post.publishedAt)}
                  <CueDivider />
                  {post.readMinutes} min read
                </p>
              </div>
            </header>
            <div className="flex flex-col gap-4 border-t border-divider pt-6">
              {post.body.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="text-body-lg leading-relaxed text-ink">
                  {paragraph}
                </p>
              ))}
            </div>
            <footer className="flex flex-col gap-4 border-t border-divider pt-6">
              <p className="text-body text-muted">
                Enjoyed this? The stage is set —{' '}
                <Link to="/" className="font-medium text-accent-text underline">
                  join the waitlist
                </Link>
                .
              </p>
            </footer>
          </article>
        ) : (
          <div className="flex flex-col items-start gap-4 py-12">
            <h1 className="text-h1">That page missed its cue.</h1>
            <p className="text-body-lg text-muted">
              The article you’re after isn’t here — it may have moved backstage.
            </p>
          </div>
        )}
        <Link
          to="/blog"
          className="inline-flex min-h-touch items-center gap-2 text-body font-medium text-accent-text"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to the blog
        </Link>
      </main>
      <MarketingFooter />
    </div>
  );
}
