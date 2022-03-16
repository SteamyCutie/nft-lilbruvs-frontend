import { Stack } from "@mui/material"
import SectionTitle from "./core/SectionTitle"

const SectionReason = () => {
  return (
    <Stack alignItems="center" id="reason">
      <SectionTitle title="Why Lil Bruvs?" />
      <div style={{ maxWidth: "60%", color: "#6D6D6D", textShadow: "1px 1px 1px #0000001F", textIndent: "1rem", textAlign: "justify", fontSize: "24px", letterSpacing: '2px' }}>From the first NFT I minted of Crypto Kitties learning the valuable lesson of paying too much in gas, to the joys of opening that first Topshot Pack. We want to capture the fun of each new drop, adding new Lil Bruvs to your collection.</div>
    </Stack >
  )
}

export default SectionReason