import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import { styled } from '@mui/system'
import IconButton from '@mui/material/IconButton'
import BubbleChartTwoToneIcon from '@mui/icons-material/BubbleChartTwoTone'
import MuiNextLink from './MuiNextLink'
import Navbar from './Navbar'
import Navbar from './Navbar'
import SideDrawer from './SideDrawer'
import HideOnScroll from './HideOnScroll'
import Fab from '@mui/material/Fab'
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp'
import BackToTop from './BackToTop'
import Connect from '../web3/connect'
import { Stack } from '@mui/material'

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)

export const navLinks = [
  { title: 'Home', path: '/' },
  { title: 'Settings', path: '/settings' },
  // { title: 'IPNS', path: '/ipns'},
]

const Header = () => {
  return (
    <>
      {/* <HideOnScroll> */}
      <AppBar
        position="fixed"
        sx={{ backgroundColor: '#FFFFFF' }}
        elevation={0}
      >
        <Toolbar>
          <Container
            maxWidth="lg"
            sx={{
              display: `flex`,
              justifyContent: `space-between`,
              alignItems: 'center',
            }}
          >
            <IconButton edge="start" aria-label="home">
              <MuiNextLink activeClassName="active" href="/">
                <BubbleChartTwoToneIcon
                  sx={{
                    color: (theme) => theme.palette.primary,
                  }}
                  fontSize="large"
                />
              </MuiNextLink>
            </IconButton>
            <Stack direction="row" alignItems="center">
              <Navbar navLinks={navLinks} />
              <SideDrawer navLinks={navLinks} />
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
