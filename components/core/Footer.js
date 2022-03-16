import Box from "@mui/material/Box";
import styles from '../../styles/Home.module.css';
import Typography from '@mui/material/Typography';
import { ButtonBase, Grid, Stack } from "@mui/material";
import styled from "@emotion/styled";
import MuiNextLink from '../../components/core/MuiNextLink';
import Image from 'next/image'

const FooterContent = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontFamily: 'Roboto',
}))

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  positive: 'relative',
  minWidth: '36px',
  minHeight: '36px',
  borderRadius: '999px',
}))

const Footer = () => {
  return (
    <Box component="footer" alignItems="center" display="grid" justifyItems="center" gap="3em" color="rgba(0,0,0,0.6)" className={styles.footer} sx={{ py: 5, px: 4 }}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={4}
      >
        <MuiNextLink
          sx={{ textDecoration: "none", color: 'black' }}
          href="https://www.twitter.com/lilbruvs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ImageButton>
            <Image src="/icons/twitter.svg" layout="fill" alt="twitter" />
          </ImageButton>
        </MuiNextLink>
        <MuiNextLink
          sx={{ textDecoration: "none", color: 'black' }}
          href="https://discord.gg/xpG88auaUY"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ImageButton>
            <Image src="/icons/discord.png" layout="fill" alt="discord" />
          </ImageButton>
        </MuiNextLink>
        <MuiNextLink
          sx={{ textDecoration: "none", color: 'black' }}
          href="https://opensea.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ImageButton>
            <Image src="/icons/opensea.png" layout="fill" alt="opensea" />
          </ImageButton>
        </MuiNextLink>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        spacing={4}
      >
        <FooterContent style={{ textDecoration: "underline" }}>License Agreement</FooterContent>
        <FooterContent style={{ textDecoration: "underline" }}>Terms & Condition</FooterContent>
        <FooterContent style={{ textDecoration: "underline" }}>Privacy Policy</FooterContent>
      </Stack>
      <Stack>
        <FooterContent >© LIL BRUVS</FooterContent>
      </Stack>
    </Box>);
};

export default Footer;