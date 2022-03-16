import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
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

export default Navbar;