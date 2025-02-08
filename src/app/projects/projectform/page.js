"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './form.module.css';

export default function Admin() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/test?type=projects', {
        headers: { 'Content-Type': 'application/json' }
      });
      setProjects(response.data.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('githubLink', githubLink);
    formData.append('image', image);
    formData.append('type', 'project');

    try {
      await axios.post('/api/test', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchProjects();
      setTitle('');
      setSummary('');
      setGithubLink('');
      setImage(null);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <div className={styles.adminPage}>
      <h1 className={styles.title}>Admin Page</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Summary</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
            className={styles.textarea}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>GitHub Link</label>
          <input
            type="url"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>Add Project</button>
      </form>
    </div>
  );
}