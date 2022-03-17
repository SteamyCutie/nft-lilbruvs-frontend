import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Container, Stack, Button } from '@mui/material';
import SectionMint from '../components/SectionMint';
import SectionReason from '../components/SectionReason';
import SectionTeam from '../components/SectionTeam';
import SectionFAQs from '../components/SectionFAQs';

const Home = () => {
  return (
    <Container>
      <main className={styles.main}>
        <SectionMint />
        <SectionReason />
        <SectionTeam />
        <SectionFAQs />
      </main>
    </Container>
  )
}

export default Home