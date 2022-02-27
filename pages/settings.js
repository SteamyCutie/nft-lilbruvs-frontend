import {
  Box,
  Button,
  Container,
  Stack,
  Card,
  CardHeader,
  CardContent,
  Input,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import Notiflix from 'notiflix'
import CircularProgress from '@mui/material/CircularProgress'
import Switch from '@mui/material/Switch'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { lilBruvsNFT } from './utils/_web3'

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 56,
  height: 32,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 30,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(18px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 4,
    '&.Mui-checked': {
      transform: 'translateX(24px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 24,
    height: 24,
    borderRadius: 12,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 32 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,.35)'
        : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}))

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

const Admin = () => {
  const { active, account } = useWeb3React()
  const [tokenBalance, setTokenBalance] = useState(0)
  const [contractOwner, setContractOwner] = useState('')
  const [isPaused, setIsPaused] = useState(false)
  const [pending, setPending] = useState(false)
  const [metaURI, setMetaURI] = useState(
    'https://gateway.pinata.cloud/ipfs/QmSmKSeTHNBE2ob45MQ2DqC7Mg2zFcQUZXp5i47BvuNRrB/',
  )

  async function getContractOwner() {
    lilBruvsNFT.methods
      .owner()
      .call()
      .then((result) => {
        setContractOwner(result)
      })
      .catch((err) => {
        console.error('err', err)
        setContractOwner('')
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
        console.error('err', err)
        setIsPaused(false)
      })
  }
  async function checkNFTBalance() {
    lilBruvsNFT.methods
      .balanceOf(account)
      .call()
      .then((result) => {
        const resultFloat = parseFloat(result, 10)
        setTokenBalance(resultFloat)
      })
      .catch((err) => {
        console.error('err', err)
        setTokenBalance(0)
      })
  }

  async function setMintPaused(paused) {
    setPending(true)
    await lilBruvsNFT.methods
      .setPaused(paused)
      .send({ from: account })
      .then((result) => {
        showNotify(true, 'Change mint statues Succeeded!')
        setIsPaused(paused)
      })
      .catch((err) => {
        showNotify(false, 'Changing mint statues failed!')
      })
    setPending(false)
  }

  async function setBaseURI() {
    console.log(metaURI)
    setPending(true)
    await lilBruvsNFT.methods
      .setBaseURI(metaURI)
      .send({ from: account })
      .then((result) => {
        showNotify(true, 'Change URI succeeded!')
        setPending(false)
      })
      .catch((err) => {
        showNotify(false, 'Change URL failed!')
        setPending(false)
      })
  }

  async function getBaseURI() {
    setPending(true)
    await lilBruvsNFT.methods
      .tokenURI(1)
      .call()
      .then((result) => {
        console.log(result)
      })
    setPending(false)
  }

  useEffect(() => {
    if (!active || !account) {
      return
    }
    getContractOwner()
    getMintPaused()
    checkNFTBalance()
  }, [account])

  const handleSwitch = (val) => {
    setMintPaused(val)
  }

  return (
    <Container sx={{ py: 5, minHeight: '80vh' }}>
      <Stack spacing={2}>
        <Card>
          <CardHeader
            title={account + (contractOwner === account ? '(Owner)' : '')}
            subheader={'Minted ' + tokenBalance + ' tokens totally.'}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas along
              with the mussels, if you like.
            </Typography>
          </CardContent>
        </Card>
        <h1>Contract Settings</h1>
        <Card>
          <CardHeader
            title="Minting status"
            subheader={
              'Currently minting is ' + (!isPaused ? 'Active!' : 'Paused!')
            }
          />
          <CardContent>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>Deactivate</Typography>
              <AntSwitch
                disabled={!active || pending}
                inputProps={{ 'aria-label': 'ant design' }}
                onChange={(evt, val) => {
                  handleSwitch(val)
                }}
                defaultChecked={!isPaused}
              />
              <Typography>Activate</Typography>
            </Stack>
            {pending && <CircularProgress />}
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Metadata URL" />
          <CardContent>
            <Input
              onChange={(e) => setMetaURI(e.target.value)}
              style={{ width: 500 }}
              defaultValue={metaURI}
            />
            <Button
              onClick={getBaseURI}
              style={{ marginLeft: '30px' }}
              variant="contained"
            >
              Get URL
            </Button>
            <Button
              onClick={setBaseURI}
              style={{ marginLeft: '30px' }}
              variant="contained"
            >
              Change URL
            </Button>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  )
}

export default Admin
