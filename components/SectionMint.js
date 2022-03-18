import { ButtonBase, Card, CardActions, CardContent, Grid, Stack, Tooltip, Typography, Fade, Link } from '@mui/material'
import { styled } from '@mui/system'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import Notiflix from 'notiflix'
import Image from 'next/image'
import Web3 from 'web3'
import MerkleTree from 'merkletreejs'
import keccak256 from 'keccak256'
import { mintPublic, mintWhiteList, lilBruvsNFT } from '../pages/utils/_web3'
import whiteList from '../configs/LilBruvsWhiteList.json'
import lilBruvsConfig from '../configs/LilBruvsConfig.json'

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  positive: 'relative',
  minWidth: '30px',
  minHeight: '30px',
  borderRadius: '999px',
}))

const SectionMint = () => {
  const web3 = new Web3(Web3.givenProvider)

  const fetcher = (url) => fetch(url).then((res) => res.json())
  const { active, account, chainId } = useWeb3React()

  const [alreadyClaimed, setAlreadyClaimed] = useState(false)

  const hashedAddrs = whiteList.map(addr => keccak256(addr))
  const merkleTree = new MerkleTree(hashedAddrs, keccak256, { sortPairs: true })

  const [wlProof, setWLProof] = useState()
  const [isValid, setIsValid] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [minted, setMinted] = useState(0)
  const [numToMint, setNumToMint] = useState(1)

  const [minActive, setMinActive] = useState(false)
  const [plusActive, setPlusActive] = useState(false)

  const [sectTitle, setSectTitle] = useState("Free Mint Now")
  const [tipText, setTipText] = useState("Mint is available.")

  useEffect(() => {
    async function getPublicMintId() {
      lilBruvsNFT.methods
        .publicMintId()
        .call()
        .then((result) => {
          setMinted(result - 1)
        })
        .catch((err) => {
          console.error('err', err)
          setMinted(0)
        })
    }
    getPublicMintId()

    let sectionTitle = sectTitle
    sectionTitle = (lilBruvsConfig.lilBruvsMode === "WL MODE" ? "Mint for Whitelist Only" : sectionTitle)
    sectionTitle = (lilBruvsConfig.lilBruvsMode === "PRE MODE" ? "Free Mint Incoming" : sectionTitle)
    setSectTitle(sectionTitle)

    let toolTipText = tipText
    toolTipText = (alreadyClaimed && lilBruvsConfig.lilBruvsMode === "WL MODE" ? "You have already claimed" : toolTipText)
    toolTipText = (isPaused ? "Minting is Paused." : toolTipText)
    toolTipText = (!active ? "Please connect wallet" : toolTipText)
    setTipText(toolTipText)
  }, [])

  useEffect(() => {
    let counterActive = lilBruvsConfig.lilBruvsMode === "FREE MODE"
    setMinActive(numToMint > 1 && counterActive)
    setPlusActive(numToMint < 3 && counterActive)
  }, [numToMint])

  useEffect(() => {
    if (!active || !account) {
      setAlreadyClaimed(false)
      return
    }
    async function checkIfClaimed() {
      lilBruvsNFT.methods
        .isClaimed(account)
        .call({ from: account })
        .then((result) => {
          setAlreadyClaimed(result)
        }).catch((err) => {
          setAlreadyClaimed(false)
        })
    }
    async function getMintPaused() {
      lilBruvsNFT.methods
        .isPaused()
        .call()
        .then((result) => {
          setIsPaused(result)
        })
        .catch((err) => {
          setIsPaused(false)
        })
    }
    checkIfClaimed()
    getMintPaused()

    let hashedAddr = keccak256(account)
    let proof = merkleTree.getHexProof(hashedAddr)
    let root = merkleTree.getHexRoot()
    let valid = merkleTree.verify(proof, hashedAddr, root)
    setIsValid(valid)
    setWLProof(proof)

    let sectionTitle = sectTitle
    sectionTitle = (lilBruvsConfig.lilBruvsMode === "WL MODE" ? "Mint for Whitelist Only" : sectionTitle)
    sectionTitle = (lilBruvsConfig.lilBruvsMode === "PRE MODE" ? "Free Mint Incoming" : sectionTitle)
    setSectTitle(sectionTitle)

    let toolTipText = tipText
    toolTipText = (alreadyClaimed && lilBruvsConfig.lilBruvsMode === "WL MODE" ? "You have already claimed" : toolTipText)
    toolTipText = (isPaused ? "Minting is Paused." : toolTipText)
    toolTipText = (!active ? "Please connect wallet" : toolTipText)
    setTipText(toolTipText)
  }, [account])

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

  const onWhiteListMint = async () => {
    const { success, status } = await mintWhiteList(account, wlProof)
    showNotify(success, status)
  };

  const onPublicMint = async () => {
    const { success, status } = await mintPublic(account, numToMint)
    showNotify(success, status)
  }

  return (
    <>
      <Stack id="mint">
        <Grid container sx={{ mt: 1 }} spacing={5} justifyContent="center" alignItems="center" gridTemplateColumns='repeat(2, 1fr)'>
          <Grid item>
            <Image
              alt="Lil Bruvs NFT"
              src="/promo.gif"
              className="promoGif"
              width={500}
              height={500}
            />
          </Grid>
          <Grid item sx={{ mt: -1 }}>
            <Card sx={{ maxWidth: 560, boxShadow: 0 }}>
              <CardContent>
                <Typography sx={{ fontSize: (lilBruvsConfig.lilBruvsMode === "PRE MODE" ? "85px" : "45px"), lineHeight: (lilBruvsConfig.lilBruvsMode === "PRE MODE" ? "86px" : "50px"), fontFamily: "Chubby Choo", fontWeight: "bold", textAlign: "center", color: "text.primary", textTransform: 'capitalize' }} gutterBottom>
                  {sectTitle}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', display: 'grid' }}>
                {lilBruvsConfig.lilBruvsMode === "PRE MODE"
                  ?
                  <div style={{ justifySelf: "center", justifyContent: "space-between", textAlign: 'center', fontSize: "24px", color: "#6D6D6D", px: '32px' }}>
                    Our first batch will be dropping soon. <Link href='https://www.twitter.com/lilbruvs' target='_blank' sx={[{ textDecoration: "underline", transition: "all ease-in 100ms", color: "#4A4A4A" }, { '&:hover': { color: '#6B6B6B' } }, { '&:active': { color: '#5B5B5B' } }]}>Follow our Twitter</Link> with notifications on and <Link href='https://discord.gg/xpG88auaUY' target='_blank' sx={[{ textDecoration: "underline", transition: "all ease-in 100ms", color: "#4A4A4A" }, { '&:hover': { color: '#6B6B6B' } }, { '&:active': { color: '#5B5B5B' } }]}>Join the Discord</Link>.
                  </div>
                  :
                  <><Stack direction="row" sx={{ border: '1px solid #737373', width: '270px', height: '51px', borderRadius: '10px', justifySelf: "center", justifyContent: "space-between", alignItems: 'center', px: '32px' }}>
                    <ImageButton disabled={!minActive} onClick={() => setNumToMint(numToMint - 1)}>
                      <Image src={`/patterns/minus${minActive ? "" : "-grey"}.svg`} layout="fill" alt="minus" />
                    </ImageButton>
                    <span style={{ marginTop: '-12px', fontFamily: "Chubby Choo", fontSize: '32px' }}>{numToMint}</span>
                    <ImageButton disabled={!plusActive} onClick={() => setNumToMint(numToMint + 1)}>
                      <Image src={`/patterns/plus${plusActive ? "" : "-grey"}.svg`} layout="fill" alt="plus" />
                    </ImageButton>
                  </Stack>
                    <Tooltip
                      TransitionComponent={Fade}
                      disabled={!(active & !isPaused)}
                      followCursor={true}
                      placement="right"
                      title={!active ? "Please connect wallet" : (isPaused ? "Minting is Paused" : (isValid ? "Mint is available" : "You are not WhiteListed"))}
                    >
                      <span>
                        <ImageButton
                          disabled={!(active & !isPaused)}
                          onClick={lilBruvsConfig.lilBruvsMode === "FREE MODE" ? onPublicMint : onWhiteListMint}
                          variant="contained"
                          sx={{ m: 1, width: "277px", height: "74px" }}
                        >
                          <Image src="/patterns/bg-mint.png" layout="fill" alt="mint" />
                          <span style={{ zIndex: 10, marginTop: '-5px', fontSize: '24px' }}>Mint Free</span>
                        </ImageButton>
                      </span>
                    </Tooltip>
                    <span style={{ zIndex: 10, marginTop: '-5px', justifySelf: "center", fontSize: '24px', textShadow: "0px 1px 1px #0000001F" }}>{minted} Minted</span>
                  </>
                }
              </CardActions>
            </Card >
          </Grid>
        </Grid>
      </Stack>
    </>
  )
}

export default SectionMint
