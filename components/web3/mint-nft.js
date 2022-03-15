import { Button, ButtonBase, Card, CardActions, CardContent, Input, Grid, Stack, Tooltip, Typography, Zoom } from '@mui/material'
import { styled } from '@mui/system'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import Notiflix from 'notiflix'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import { mintPublic, lilBruvsNFT } from '../../pages/utils/_web3'
import Image from 'next/image'
import Web3 from 'web3'

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  positive: 'relative',
  minWidth: '30px',
  minHeight: '30px',
  borderRadius: '999px',
}))

const MintNFT = () => {
  const web3 = new Web3(Web3.givenProvider)

  const fetcher = (url) => fetch(url).then((res) => res.json())
  const { active, account, chainId } = useWeb3React()

  const [publicMintStatus, setPublicMintStatus] = useState()
  const [isPaused, setIsPaused] = useState(false)
  const [minted, setMinted] = useState(0)
  const [numToMint, setNumToMint] = useState(1)

  const [minActive, setMinActive] = useState(false);
  const [plusActive, setPlusActive] = useState(true);

  useEffect(() => {
    if (!active || !account) {
      return
    }
    async function getMintPaused() {
      lilBruvsNFT.methods
        .isPaused()
        .call()
        .then((result) => {
          setIsPaused(result)
        })
        .catch((err) => {
          console.error('err', err)
          setIsPaused(false)
        })
    }
    getMintPaused()
  }, [account])

  useEffect(() => {
    setMinActive(numToMint > 1)
    setPlusActive(numToMint < 300)
  }, [numToMint]);
  const showNotify = (success, status) => {
    let param = {
      width: '500px',
      timeout: 3000,
      pauseOnHover: true,
      cssAnimation: true,
      cssAnimationDuration: 500,
      cssAnimationStyle: 'fade',
    }
    if (success) Notiflix.Notify.success(status, param)
    else Notiflix.Notify.failure(status, param)
  }

  const onPublicMint = async () => {
    const { success, status } = await mintPublic(account, numToMint)
    showNotify(success, status)
    setPublicMintStatus(success)
  }

  return (
    <>
      <Stack id="mint" sx={{ mt: 2 }}>
        <Grid container spacing={5} justifyContent="center" alignItems="center" gridTemplateColumns='repeat(2, 1fr)'>
          <Grid item>
            <Image
              alt="Lil Bruvs NFT"
              src="/promo.gif"
              className="promoGif"
              width={500}
              height={500}
            />
          </Grid>
          <Grid item>
            <Card sx={{ maxWidth: 560, boxShadow: 0 }}>
              <CardContent>
                <Typography sx={{ fontSize: "45px", fontFamily: "Chubby Choo", fontWeight: "bold", color: "text.primary", textTransform: 'capitalize' }} gutterBottom>
                  Mint for Whitelist only
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', display: 'grid' }}>
                <Stack direction="row" sx={{ border: '1px solid #737373', width: '270px', height: '51px', borderRadius: '10px', justifySelf: "center", justifyContent: "space-between", alignItems: 'center', px: '32px' }}>
                  <ImageButton disabled={!minActive} onClick={() => setNumToMint(numToMint - 1)}>
                    <Image src={`/patterns/minus${minActive ? "" : "-grey"}.svg`} layout="fill" alt="minus" />
                  </ImageButton>
                  <span style={{ marginTop: '-12px', fontFamily: "Chubby Choo", fontSize: '32px' }}>{numToMint}</span>
                  <ImageButton disabled={!plusActive} onClick={() => setNumToMint(numToMint + 1)}>
                    <Image src={`/patterns/plus${plusActive ? "" : "-grey"}.svg`} layout="fill" alt="plus" />
                  </ImageButton>
                </Stack>
                <Tooltip
                  TransitionComponent={Zoom}
                  disabled={!(active & !isPaused)}
                  title={
                    active & !isPaused
                      ? 'Minting is now available'
                      : 'Minting is not currently available with due to some problems!'
                  }
                  arrow
                >
                  <span>
                    <ImageButton
                      disabled={!(active & !isPaused)}
                      onClick={onPublicMint}
                      variant="contained"
                      sx={{ m: 1, width: "277px", height: "74px" }}
                    >
                      <Image src="/patterns/bg-mint.png" layout="fill" alt="mint" />
                      <span style={{ zIndex: 10, marginTop: '-5px', fontSize: '24px' }}>Mint Free</span>
                    </ImageButton>
                  </span>
                </Tooltip>
                <span style={{ zIndex: 10, marginTop: '-5px', justifySelf: "center", fontSize: '24px', textShadow: "0px 1px 1px #0000001F" }}>{minted} Minted</span>
              </CardActions>
            </Card >
          </Grid>
        </Grid>
      </Stack>
    </>
  )
}

export default MintNFT
