import {
  Button,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  Tooltip,
  Input,
  Stack,
  Typography,
  Zoom,
} from '@mui/material'
import { styled } from '@mui/system'
import { Image } from 'next/image'
import { useState } from 'react'

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  positive: 'relative',
  width: '30px',
  height: '30px',
  borderRadius: '999px',
}))

const MintNFTCard = ({
  action,
  canMint,
  showNumToMint,
  setNumToMint,
}) => {
  const [minActive, setMinActive] = useState(false);
  const [plusActive, setPlusActive] = useState(true);
  const handleChange = (event) => {
    const numToMint = parseInt(event.target.value)
    setNumToMint(numToMint)
  }

  return (
    <Card sx={{ maxWidth: 560, boxShadow: 0 }}>
      <CardContent>
        <Typography sx={{ fontSize: "45px", fontFamily: "Chubby Choo", fontWeight: "bold", color: "text.primary", textTransform: 'capitalize' }} gutterBottom>
          Mint for Whitelist only
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        {showNumToMint && (
          <Stack direction="row" sx={{ gap: "2px" }}>
            <ImageButton>
              {/* <Image src="/patterns/minus-grey.svg" width={"30px"} height={"30px"} alt="minus" /> */}
            </ImageButton>
            <Input
              onChange={handleChange}
              defaultValue={1}
              type="number"
              label="number to mint"
              sx={{ mx: 3 }}
            />
            <ImageButton>+</ImageButton>
          </Stack>
        )}
        <Tooltip
          TransitionComponent={Zoom}
          disabled={!canMint}
          title={
            canMint
              ? 'Minting is now available'
              : 'Minting is not currently available with due to some problems!'
          }
          arrow
        >
          <span>
            <Button
              disabled={!canMint}
              sx={{ m: 1 }}
              onClick={action}
              variant="contained"
            >
              Mint
            </Button>
          </span>
        </Tooltip>
      </CardActions>
    </Card >
  )
}

export default MintNFTCard
