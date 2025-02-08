import styles from './page.module.css';
import Navbar from '@/components/Navbar/navbar';
import Image from "next/image";


export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>

        <div className={styles.tanitim}>
        <Image
  className={styles.tetiana}
  src="/tetiana.png"
  alt="logo"
  width={300}
  height={0}
  style={{ height: 'auto' }}
  priority
/>
<div className={styles.tanitimTxt}>
<h1 className={styles.tanitimHeader}>Merhaba Ben Begüm</h1>
 <p className={styles.tanitimParagraf}>Bilgisayar Mühendisliği öğrencisiyim. Yazılım ve yapay zeka alanlarında kendimi geliştirmekteyim. Bu blogda yazılım ve yapay zeka alanlarında öğrendiklerimi ve projelerimi paylaşacağım. </p>
</div>
   </div>
   
      </main>
 

    </div>
  );
}
