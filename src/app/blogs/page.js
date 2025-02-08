'use client';

import { useState, useEffect } from 'react';
import styles from './blogs.module.css';
import { List, ListItem, ListItemText } from '@mui/material';
import Card from '@/components/Card/card';

export default function Blogs() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; // Number of posts per page

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/test?type=posts');
        const data = await response.json();
        setPosts(data.data || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  // Get unique categories
  const categories = [...new Set(posts.map(post => post.category))];

  // Filter posts by selected category
  const filteredPosts = selectedCategory 
    ? posts.filter(post => post.category === selectedCategory)
    : posts;

  // Calculate the posts to display based on the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Calculate total pages
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title} onClick={() => setSelectedCategory(null)} style={{ cursor: 'pointer' }}>Kategoriler</h1>
          <List className={styles.list}>
            <div key="all" style={{ width: '100%' }}>
              <ListItem 
                onClick={() => setSelectedCategory(null)}
                className={selectedCategory === null ? styles.selected : ''}
              >
                <ListItemText primary="Tüm Kategoriler" />
              </ListItem>
              <hr className={styles.divider}/>
            </div>
            {categories.map((category, index) => (
              <div key={category} style={{ width: '100%' }}>
                <ListItem 
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? styles.selected : ''}
                >
                  <ListItemText primary={category} />
                </ListItem>
                {index < categories.length - 1 && (
                  <div style={{ width: '100%', padding: '0 16px' }}>
                    <hr className={styles.divider}/>
                  </div>
                )}
              </div>
            ))}
          </List>
        </div>

        <div className={styles.blogContent}>
          {currentPosts.length > 0 ? (
            currentPosts.map(post => (
              <Card
                key={post.slug}
                title={post.title}
                description={post.summary}
                slug={post.slug}
              />
            ))
          ) : (
            <p>Bu kategoride yazı bulunmamaktadır.</p>
          )}
          {filteredPosts.length > postsPerPage && (
            <div className={styles.paginationWrapper}>
              <div className={styles.paginationContainer}>
                <div className={styles.pagination}>
                  <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                  </button>
                  <span>Page {currentPage} of {totalPages}</span>
                  <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}