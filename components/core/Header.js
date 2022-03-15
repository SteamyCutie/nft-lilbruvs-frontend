import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import { Stack, Toolbar } from '@mui/material'
import { styled } from '@mui/system'
import ButtonBase from '@mui/material/ButtonBase';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp'
import MuiNextLink from './MuiNextLink'
import Image from 'next/image'
import Navbar from './Navbar'
import SideDrawer from './SideDrawer'
// import HideOnScroll from './HideOnScroll'
import Fab from '@mui/material/Fab'
import BackToTop from './BackToTop'
import Connect from '../web3/connect'

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  positive: 'relative',
  width: '88px',
  height: '58px',
  borderRadius: '24px',
}))

export const navLinks = [
  { title: 'Mint', path: '/' },
  { title: 'FAQs', path: '/fqs' },
  { title: 'Team', path: '/team' },
]

const Header = () => {
  return (
    <>
      {/* <HideOnScroll> */}
      <AppBar
        position="fixed"
        sx={{ backgroundColor: '#FFFFFF', boxShadow: 3 }}
        elevation={0}
      >
        <Toolbar >
          <Container
            maxWidth="xl"
            sx={{
              display: `flex`,
              justifyContent: `space-between`,
              alignItems: 'center',
              height: '130px'
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
                <ImageButton sx={{
                  backgroundColor: "#55ACEE",
                }}>
                  <Image src="/icons/twitter-icon.svg" width={"23px"} height={"19px"} /></ImageButton>
                <ImageButton sx={{
                  backgroundColor: "#6F83CB",
                }}><Image src="/icons/discord-icon.svg" width={"23px"} height={"20.7px"} sx={{ marginLeft: '10px' }} /></ImageButton>
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
