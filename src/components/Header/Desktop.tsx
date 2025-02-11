import { XIcon } from '@heroicons/react/solid'
import { NATIVE } from '@sushiswap/core-sdk'
import Container from 'app/components/Container'
import { NAV_CLASS } from 'app/components/Header/styles'
import useMenu from 'app/components/Header/useMenu'
import Web3Network from 'app/components/Web3Network'
import Web3Status from 'app/components/Web3Status'
import useIsCoinbaseWallet from 'app/hooks/useIsCoinbaseWallet'
import { useActiveWeb3React } from 'app/services/web3'
import { useNativeCurrencyBalances } from 'app/state/wallet/hooks'
import Image from 'next/image'
import React, { FC } from 'react'

import safeswapLogo from '../../../public/safeswapLogo.png'
import Dots from '../Dots'
import Typography from '../Typography'
import { NavigationItem } from './NavigationItem'
const HEADER_HEIGHT = 64

const Desktop: FC = () => {
  const menu = useMenu()
  const { account, chainId, library } = useActiveWeb3React()
  const userEthBalance = useNativeCurrencyBalances(account ? [account] : [])?.[account ?? '']
  const isCoinbaseWallet = useIsCoinbaseWallet()
  const [showBanner, setShowBanner] = React.useState<boolean>(true)

  return (
    <>
      <header className="fixed z-20 hidden w-full lg:block" style={{ height: HEADER_HEIGHT }}>
        <nav className={NAV_CLASS}>
          <Container maxWidth="full" className="mx-auto">
            <div className="flex items-center justify-between gap-4 px-6">
              <div className="flex gap-4">
                <div className="flex items-center w-20 mr-4">
                  {/* <Image src="https://app.sushi.com/images/logo.svg" alt="Sushi logo" width="24px" height="24px" /> */}
                  <Image
                    // src={'/safeswapLogo.png'}
                    src={safeswapLogo}
                    // layout="fixed"
                    alt="Safeswap logo"
                    // width={100}
                    // height={100}
                  />
                </div>
                {menu.map((node) => {
                  return <NavigationItem node={node} key={node.key} />
                })}
              </div>

              <div className="flex items-center justify-end w-auto shadow select-none whitespace-nowrap">
                {account && chainId && (
                  <Typography weight={700} variant="sm" className="px-2 py-5 font-bold">
                    {userEthBalance ? (
                      `${userEthBalance?.toSignificant(4)} ${NATIVE[chainId].symbol}`
                    ) : (
                      <Dots>FETCHING</Dots>
                    )}
                  </Typography>
                )}

                {library && (library.provider.isMetaMask || isCoinbaseWallet) && (
                  <div className="hidden sm:inline-block">
                    <Web3Network />
                  </div>
                )}

                <Web3Status />

                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg> */}
              </div>
            </div>
          </Container>
        </nav>
        {/* {showBanner && ( */}
        {/* turning the following to false hides the banner */}
        {false && (
          <div className="relative bg-opaque-blue">
            <div className="px-3 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="pr-16 sm:text-center sm:px-16">
                <p className="font-medium text-white">
                  <span className="md:hidden">We announced SushiXSwap!</span>
                  <span className="hidden md:inline">
                    Big news! We&apos;re excited to announce SushiXSwap, a world first cross-chain AMM.
                  </span>
                  <span className="block sm:ml-2 sm:inline-block">
                    <a href="https://sushi.com/swap" className="font-bold text-white underline">
                      {' '}
                      Learn more <span aria-hidden="true">&rarr;</span>
                    </a>
                  </span>
                </p>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-start pt-1 pr-1 sm:pt-1 sm:pr-2 sm:items-start">
                <button
                  onClick={() => setShowBanner(false)}
                  type="button"
                  className="flex p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span className="sr-only">Dismiss</span>
                  <XIcon className="w-6 h-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
      <div style={{ height: HEADER_HEIGHT + 48, minHeight: HEADER_HEIGHT }} />
    </>
  )
}

export default Desktop
