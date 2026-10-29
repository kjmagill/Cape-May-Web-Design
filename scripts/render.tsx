import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../App';
import { SeoCollector, type SeoProps } from '../hooks/useSeo';
import { blogPosts } from '../components/blogPosts';

export const paths = ['/', '/blog', '/privacy', '/terms', ...blogPosts.map(post => `/blog/${post.slug}`)];
export function render(pathname: string) {
  let metadata: SeoProps | undefined;
  const html = renderToString(<SeoCollector.Provider value={value => { metadata = value; }}><App pathname={pathname} /></SeoCollector.Provider>);
  if (!metadata) throw new Error(`Missing SEO metadata for ${pathname}`);
  return { html, metadata };
}
