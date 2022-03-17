import { ButtonBase, Grid, Stack } from '@mui/material'
import { styled } from '@mui/system'
import Image from 'next/image'
import MuiNextLink from './core/MuiNextLink'
import SectionTitle from './core/SectionTitle'
import teamData from '/configs/LilBruvsTeam.json'

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  positive: 'relative',
  minWidth: '36px',
  minHeight: '36px',
  borderRadius: '999px',
}))

const SectionTeam = () => {
  return (
    <Stack alignItems="center" id="team">
      <SectionTitle title="Team" />
      <Grid container spacing={5} justifyContent="center" alignItems="center" gridTemplateColumns='repeat(4, 1fr)'>
        {
          teamData.map((i) =>
            <Grid item key={i.name}>
              <Stack alignItems="center">
                <Image src={`/team/${i.name}.png`} width="214px" height="214px" className="teamPhoto" alt={i.name} />
                <div style={{ fontSize: "32px" }}>{i.name}</div>
                <div style={{ fontSize: "24px", color: "#6D6D6D" }}>{i.role}</div>
                <div style={{ fontSize: "18px", textAlign: "center", textTransform: "capitalize", maxWidth: "250px", margin: "0.5rem 0 1rem 0" }}>{i.description}</div>
                <MuiNextLink activeClassName="active" href={i.link}>
                  <ImageButton>
                    <Image src="/icons/twitter.svg" layout="fill" alt={i.name} />
                  </ImageButton>
                </MuiNextLink>
              </Stack>
            </Grid>
          )
        }
      </Grid>
    </Stack>
  )
}

export default SectionTeam