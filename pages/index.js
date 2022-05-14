import Head from 'next/head'
import Image from 'next/image'
import SongForm from '../lib/SongForm'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>出題目啦！</h1>
      <SongForm />
    </div>
  )
}
