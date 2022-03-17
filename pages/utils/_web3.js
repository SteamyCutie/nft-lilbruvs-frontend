import { InjectedConnector } from '@web3-react/injected-connector'
import Web3 from 'web3'
import lilBruvsConfig from '../../configs/LilBruvsConfig.json'
import lilBruvsABI from '../../configs/LilBruvsABI.json'

const web3 = new Web3(Web3.givenProvider)

const acceptedChains = lilBruvsConfig.lilBruvsEnv === 'DEVELOPMENT' ? [1, 3, 4, 5, 42] : [1, 2]

export const lilBruvsNFT = new web3.eth.Contract(lilBruvsABI.abi, lilBruvsConfig.lilBruvsAddr)

export const injected = new InjectedConnector({
  supportedChainIds: acceptedChains,
})

export const mintWhiteList = async (account, proof) => {
  console.log('minting whitelist...')
  const amount = mintConfig.whiteListMintPrice
  const amountToWei = web3.utils.toWei(amount, 'ether')
  const result = lilBruvsNFT.methods.whiteListMint(proof).send({ from: account, value: amountToWei }).then((result) => {
    let resAddr = `✅ Check out your transaction on Etherscan: https://${lilBruvsConfig.lilBruvsEnv === 'DEVELOPMENT' ? 'rinkeby.' : ''}etherscan.io/tx/${result.transactionHash}`

    console.log(resAddr)
    return {
      success: true,
      status: resAddr
    }
  }).catch((err) => {
    console.log("Mint transaction failed!");
    return {
      success: false,
      status: "😥 Something went wrong: " + err.message
    }
  }).finally((result) => {
    return result
  })
  return result
}

export const mintPublic = async (account, numberOfTokens) => {
  console.log('minting publicMint...')
  const amount = (numberOfTokens * mintConfig.publicMintPrice).toString()
  const amountToWei = web3.utils.toWei(amount, 'ether')
  const result = lilBruvsNFT.methods
    .publicMint(numberOfTokens)
    .send({ from: account, value: amountToWei })
    .then((result) => {
      let resAddr = `✅ Check out your transaction on Etherscan: https://${lilBruvsConfig.lilBruvsEnv === 'DEVELOPMENT' ? 'rinkeby.' : ''}etherscan.io/tx/${result.transactionHash}`
      return {
        success: true,
        status: resAddr,
      }
    })
    .catch((err) => {
      console.log('Mint transaction failed!')
      return {
        success: false,
        status: '😥 Something went wrong: ' + err.message,
      }
    })
  return result
}

export function abridgeAddress(hex, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(hex.length - length)}`
}

export default function blank() {
  return <></>
}
