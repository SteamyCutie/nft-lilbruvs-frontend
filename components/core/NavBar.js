import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import MuiNextLink from "./MuiNextLink";

const Navbar = ({ navLinks }) => {
  return (
    <Toolbar
      component="nav"
      sx={{
        display: { xs: `none`, md: `flex` },
      }}
    >
      <Stack direction="row" sx={{ gap: "49px" }}>
        {navLinks.map(({ title, path }, i) => (
          <MuiNextLink
            key={`${title}${i}`}
            href={path}
            variant="button"
            underline="none"
            sx={[
              {
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
          </MuiNextLink>
        ))}
      </Stack>
    </Toolbar>
  );
};

export default Navbar;