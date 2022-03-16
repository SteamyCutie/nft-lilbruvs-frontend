import { Grid, Stack } from "@mui/material"
import styled from "@emotion/styled"
import FAQItem from "./core/FAQItem"
import SectionTitle from "./core/SectionTitle"
import faqData from "/data/LilBruvsFAQs.json"

const Divider = styled('div')(({ theme }) => ({
  width: '100%',
  minHeight: '3px',
  background: '#CDD6DA40'
}))

const SectionFAQs = () => {
  return (
    <Stack alignItems="center">
      <SectionTitle title="FAQs" />
      <Grid container spacing={2}>
        {
          faqData.map((itm, idx) =>
            <Grid item key={idx} sx={{ width: '100%' }}>
              {idx !== 0 && <Divider />}
              <FAQItem question={itm.question} answer={itm.answer} />
            </Grid>
          )
        }
      </Grid>
    </Stack>
  )
}

export default SectionFAQs