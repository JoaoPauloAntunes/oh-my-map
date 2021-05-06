import '../styles/global.scss';
import styles from '../styles/app.module.scss';

export default function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.wrapper}>
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  )
}
