import Link from "next/link";
import styles from "./navbar.module.css";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navList}>
        <div className={styles.navItem}>
          <Image src="/nerd.png" alt="logo" width={100} height={100} />  
          <Link href="/" className={styles.header}>
            BrainAI
          </Link>
        </div>
        <div className={styles.navLinks}>
          <div className={styles.navItem}>
            <Link href="/blogs" className={styles.navLink}>
              Bloglar
            </Link>
          </div>
          <div className={styles.navItem}>
            <Link href="/projects" className={styles.navLink}>
              Projeler
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}