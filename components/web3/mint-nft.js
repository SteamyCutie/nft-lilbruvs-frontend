import { Grid, Stack } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import Notiflix from 'notiflix'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import { mintPublic, lilBruvsNFT } from '../../pages/utils/_web3'
import MintNFTCard from './mint-nft-card'
import Web3 from 'web3'

const NOT_CLAIMABLE = 0
const ALREADY_CLAIMED = 1
const CLAIMABLE = 2

const MintNFT = () => {
  const web3 = new Web3(Web3.givenProvider)

  const fetcher = (url) => fetch(url).then((res) => res.json())
  const { active, account, chainId } = useWeb3React()

  const [publicMintStatus, setPublicMintStatus] = useState()
  const [isPaused, setIsPaused] = useState(false)
  const [numToMint, setNumToMint] = useState(1)

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
      <Stack id="demo">
        <h2>Mint an NFT</h2>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item>
            <MintNFTCard
              title={'Public Mint'}
              description={
                'Mint this sample NFT to the connected wallet. Open for any wallet to mint. Cost: 0.00 ETH'
              }
              canMint={active & !isPaused}
              mintStatus={publicMintStatus}
              showNumToMint={false}
              setNumToMint={setNumToMint}
              action={onPublicMint}
            />
          </Grid>
        </Grid>
      </Stack>
    </>
  )
}

export default MintNFT
