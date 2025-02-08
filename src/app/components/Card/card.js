import styles from './card.module.css';
import Link from 'next/link';

export default function Card({ title, description, slug }) {
  // Ensure we have a valid slug
  const safeSlug = slug || title?.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '') || 'post';

  return (
    <div className={styles.blogCard}>
      <h1 className={styles.blogTitle}>
        {title || 'Başlık Yükleniyor...'}
      </h1>
      <p className={styles.blogDescription}>
        {description?.slice(0, 150) + (description?.length > 150 ? '...' : '') || 
        'Açıklama yükleniyor...'}
      </p>
      <Link 
        href={{
          pathname: `/blogs/${safeSlug}`,
          query: { id: slug }
        }} 
        className={styles.blogLink}
      >
        Devamını Oku ➡️
      </Link>
    </div>
  );
}