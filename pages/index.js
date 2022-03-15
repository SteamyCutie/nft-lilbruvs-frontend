import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Container, Stack, Button } from '@mui/material';
import MintNFT from '../components/web3/mint-nft';
import SectionReason from '../components/SectionReason';
import SectionTeam from '../components/SectionTeam';

const Home = () => {
  return (
    <Container>
      <main className={styles.main}>
        <MintNFT />
        <SectionReason />
        <SectionTeam />
      </main>
    </Container>
  )
}

export default Home