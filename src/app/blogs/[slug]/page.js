import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import styles from './page.module.css';

async function getPost(slug) {
  try {
    console.log('Fetching post with slug:', slug);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const res = await fetch(`${apiUrl}/api/test?type=posts&slug=${slug}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store'
    });

    if (!res.ok) {
      console.log('Failed to fetch post with slug:', slug);
      return null;
    }

    const data = await res.json();
    console.log('Fetched post data:', data);
    return data.data; // Return the post directly from the API response
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export default async function BlogDetail({ params }) {
  const post = await getPost(params.slug);

  if (!post) {
    console.log('Post not found, rendering 404 page');
    return notFound();
  }

  return (
    <div className={styles.page}>
      <Suspense fallback={<div>Loading...</div>}>
        <main className={styles.main}>
          <article className={styles.article}>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.metadata}>
              <time dateTime={post.createdAt}>
                {new Date(post.createdAt).toLocaleDateString('tr-TR')}
              </time>
            </div>
            <div 
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />
          </article>
        </main>
      </Suspense>
    </div>
  );
}