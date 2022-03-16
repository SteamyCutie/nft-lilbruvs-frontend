import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import { Stack, Toolbar } from '@mui/material'
import { styled } from '@mui/system'
import ButtonBase from '@mui/material/ButtonBase';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp'
import MuiNextLink from './MuiNextLink'
import Image from 'next/image'
//import Navbar from '/Navbar'
import SideDrawer from './SideDrawer'
// import HideOnScroll from './HideOnScroll'
import Fab from '@mui/material/Fab'
import { useState, useEffect } from 'react'
import BackToTop from './BackToTop'
import Connect from '../web3/connect'

//import Stack from "@mui/material/Stack";
//import Toolbar from "@mui/material/Toolbar";
import { useRouter } from "next/router";

const Navbar = ({ navLinks }) => {

  const router = useRouter()

  const handleGoSection = (index) => {
    if (router.pathname === '/') {
      const element = document.getElementById(index)
      const topPos = element.offsetTop
      window.scrollTo({
        top: topPos - 90,
        left: 100,
        behavior: 'smooth'
      })
    } else {
      router.push(`/#${index}`)
      // handleGoSection(index)
    }
  }

  return (
    <Toolbar
      component="nav"
      sx={{
        display: { xs: `none`, md: `flex` },
      }}
    >
      <Stack direction="row" sx={{ gap: "49px" }}>
        {navLinks.map(({ title, path }, i) => (
          <Stack
            key={`${title}${i}`}
            onClick={() => handleGoSection(path)}
            variant="button"
            underline="none"
            sx={[
              {
                cursor: 'pointer',
                fontFamily: 'Chubby Choo',
                fontSize: '24px',
                opacity: 0.7,
                color: 'primary.light',
                textTransform: 'none',
                transition: 'all 300ms ease-in'
              },
              {
                '&:hover': {
                  opacity: 1
                }
              }
            ]}
          >
            {title}
          </Stack>
        ))}
      </Stack>
    </Toolbar>
  );
};

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  positive: 'relative',
  width: '88px',
  height: '58px',
  borderRadius: '24px',
}))

export const navLinks = [
  { title: 'Mint', path: 'mint' },
  { title: 'Team', path: 'team' },
  { title: 'FAQs', path: 'faqs' },
]

const Header = () => {
  const [isMinNav, setMinNav] = useState(false)
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setMinNav(window.pageYOffset > 20);
    });
  }, []);


  return (
    <>
      {/* <HideOnScroll> */}
      <AppBar
        position="fixed"
        sx={{ backgroundColor: '#FFFFFF', boxShadow: 3 }}
        elevation={0}
        id="header"
      >
        <Toolbar >
          <Container
            maxWidth="xl"
            sx={{
              display: `flex`,
              justifyContent: `space-between`,
              alignItems: 'center',
              height: isMinNav ? '90px' : '130px',
              transition: 'all ease-out 300ms'
            }}
          >
            <MuiNextLink activeClassName="active" href="/">
              <Image alt="logo" src="/logo.png" width={191} height={68} />
            </MuiNextLink>
            <Stack direction="row" alignItems="center">
              <Navbar navLinks={navLinks} />
              <SideDrawer navLinks={navLinks} />
            </Stack>
            <Stack direction="row" alignItems="center" sx={{ display: 'flex', gap: '50px' }}>
              <Stack direction="row" alignItems="center" sx={{ display: 'flex', gap: '14px' }}>
                <MuiNextLink
                  sx={{ textDecoration: "none", color: 'black' }}
                  href="https://www.twitter.com/lilbruvs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ImageButton sx={{
                    backgroundColor: "#55ACEE",
                  }}>
                    <Image src="/icons/twitter-icon.svg" width={"23px"} height={"19px"} />
                  </ImageButton>
                </MuiNextLink>
                <MuiNextLink
                  sx={{ textDecoration: "none", color: 'black' }}
                  href="https://discord.gg/xpG88auaUY"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ImageButton sx={{
                    backgroundColor: "#6F83CB",
                  }}>
                    <Image src="/icons/discord-icon.svg" width={"23px"} height={"20.7px"} sx={{ marginLeft: '10px' }} />
                  </ImageButton>
                </MuiNextLink>
              </Stack>
              <Connect />
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
      {/* </HideOnScroll> */}
      <Offset id="back-to-top-anchor" />
      <BackToTop>
        <Fab color="primary" size="large" aria-label="back to top">
          <KeyboardArrowUp />
        </Fab>
      </BackToTop>
    </>
  )
}

export default Header
