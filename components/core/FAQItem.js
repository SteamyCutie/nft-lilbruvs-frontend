import { ButtonBase, Stack } from "@mui/material"
import { useState } from "react"

const FAQItem = ({ question, answer }) => {
  const [isOpened, setOpened] = useState(false)
  return (
    <Stack >
      <div onClick={() => setOpened(!isOpened)} style={{ justifyContent: "space-between", alignItems: "center", cursor: "pointer", display: 'flex', fontSize: "24px" }}>
        <p>{question}</p>
        <ButtonBase onClick={() => setOpened(!isOpened)} sx={{ height: "32px", borderRadius: "16px", background: "#F3F5F6" }}>
          <hr style={{ width: "16px", border: "2px solid grey", transform: "translateX(8px)" }} />
          <hr style={{ width: "16px", border: "2px solid grey", transform: `translateX(-8px) rotate(${isOpened ? "0" : "90"}deg)`, transition: "all 300ms" }} />
        </ButtonBase>
      </div>
      <div style={{ height: isOpened ? "100px" : "0", transition: "all 300ms ease-out", overflow: "hidden", textIndent: '8px', padding: '0 1rem', color: "#484848", fontSize: "20px" }}>{answer}</div>
    </Stack>
  )
}

export default FAQItem