import { useEffect } from 'react';

/** SEO basics for marketing routes: document title + meta description. */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (!description) return;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [title, description]);
}
