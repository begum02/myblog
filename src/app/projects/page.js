'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar/navbar';
import Image from 'next/image';
import Link from 'next/link';
import styles from './project.module.css';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/test?type=projects');
        const data = await response.json();
        setProjects(data.data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
   
      <div className={styles.tanitim}>
        <h1 className={styles.projectsHeader}>Projeler</h1>
        <hr className={styles.projectsDivider} />
      </div>
      <div className={styles.projects}>
        {projects.map((project) => (
          <div key={project._id} className={styles.project}>
            <Image src={project.image} alt={project.title} width={150} height={0} style={{ height: 'auto' }} priority />
            <h2 className={styles.projectTitle}>{project.title}</h2>
            <p className={styles.projectDescription}>{project.summary}</p>
            <Link href={project.githubLink} className={styles.projectLink}>Detayı gör ➡️</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

