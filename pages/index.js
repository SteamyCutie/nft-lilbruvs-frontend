import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Container, Stack, Button } from '@mui/material';
import MintNFT from '../components/web3/mint-nft';
import SectionReason from '../components/SectionReason';

const Home = () => {
  return (
    <Container>
      <main className={styles.main}>
        <MintNFT />
        <SectionReason />
      </main>
    </Container>
  )
}

export default Home