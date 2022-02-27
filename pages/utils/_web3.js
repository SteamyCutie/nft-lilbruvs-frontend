import { InjectedConnector } from '@web3-react/injected-connector'
import { useEffect, useState } from 'react'
import Web3 from 'web3'

const NFT_ADDRESS = process.env.NEXT_PUBLIC_NFT_ADDRESS
const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT

const web3 = new Web3(Web3.givenProvider)
const contractABI = require('../../data/LilBruvsNFT.json')

const acceptedChains = ENVIRONMENT === 'development' ? [1, 3, 4, 5, 42] : [1, 2]

export const lilBruvsNFT = new web3.eth.Contract(contractABI.abi, NFT_ADDRESS)

export const injected = new InjectedConnector({
  supportedChainIds: acceptedChains,
})

export const mintPublic = async (account, numberOfTokens) => {
  console.log('minting publicMint...')
  const amount = (numberOfTokens * 0.0).toString()
  const amountToWei = web3.utils.toWei(amount, 'ether')
  const result = lilBruvsNFT.methods
    .publicMint(numberOfTokens)
    .send({ from: account, value: amountToWei })
    .then((result) => {
      let resAddr = `✅ Check out your transaction on Etherscan: https://${
        ENVIRONMENT === 'development' ? 'rinkeby.' : ''
      }etherscan.io/tx/${result.transactionHash}`
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
