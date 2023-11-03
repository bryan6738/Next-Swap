'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/button';
import { Input, Modal } from 'antd';
import { ChevronDown } from '@/components/icons/chevron-down';
// import { ArrowDownOutlined, DownOutlined } from '@ant-design/icons';
import { useAccount, useBalance, useDisconnect } from 'wagmi';
import tokenList from '@/data/static/tokenList.json';
import Trade from '@/components/ui/trade';
import Erc20 from '@/data/static/erc20.json';
import { useSendTransaction, useWaitForTransaction } from 'wagmi';
import Web3 from 'web3';
import qs from 'qs';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { SwapIcon } from '@/components/icons/swap-icon';
import { useTheme } from 'next-themes';
import axios from 'axios';

const SwapPage = () => {
  const { theme, setTheme } = useTheme();

  const { address } = useAccount();
  const [tokenOneAmount, setTokenOneAmount] = useState(0);
  const [gasprice, setgasprice] = useState(0);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(0);
  const [tokenOne, setTokenOne] = useState(tokenList[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTokens, setFilteredTokens] = useState([]);
  const [changeToken, setChangeToken] = useState(1);
  const [prices, setPrices] = useState(null);
  const [txDetails, setTxDetails] = useState({
    to: null,
    data: null,
    value: null,
  });
  const { data, sendTransaction } = useSendTransaction({
    request: {
      from: address,
      to: String(txDetails.to),
      data: String(txDetails.data),
      value: String(txDetails.value),
    },
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  function openModal(asset: any) {
    setChangeToken(asset);
    setIsOpen(true);
  }
  useEffect(() => {
    if (address == undefined) {
      setTokenOneAmount(0);
      setTokenTwoAmount(0);
      setgasprice(0);
    }
  }, [address]);
  useEffect(() => {
    getPrice();
  }, [tokenOneAmount]);

  function switchTokens() {
    setPrices(null);
    setTokenOneAmount(0);
    setTokenTwoAmount(0);
    setgasprice(0);
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
  }

  function modifyToken(i: any) {
    setPrices(null);
    setTokenOneAmount(0);
    setTokenTwoAmount(0);
    setgasprice(0);
    if (changeToken === 1) {
      setTokenOne(filteredTokens[i]);
    } else {
      setTokenTwo(filteredTokens[i]);
    }
    setIsOpen(false);
    setSearchQuery('');
  }

  function changeAmount(e: any) {
    setTokenOneAmount(e.target.value);
    if (e.target.value && prices) {
      setTokenTwoAmount(parseInt((e.target.value * 1).toFixed(2)));
    } else {
      setgasprice(0);
      setTokenTwoAmount(0);
    }
  }

  async function fetchDexSwap() {
    const allowance = await axios.get(
      `https://api.1inch.io/v5.0/1/approve/allowance?tokenAddress=${tokenOne.address}&walletAddress=${address}`
    );
    console.log('Allowance', allowance);

    if (allowance.data.allowance === '0') {
      const approve = await axios.get(
        `https://api.1inch.io/v5.0/1/approve/transaction?tokenAddress=${tokenOne.address}`
      );

      setTxDetails(approve.data);
      console.log('not approved');
      return;
    }

    const tx = await axios.get(
      `https://api.1inch.io/v5.0/1/swap?fromTokenAddress=${
        tokenOne.address
      }&toTokenAddress=${tokenTwo.address}&amount=${tokenOneAmount.padEnd(
        tokenOne.decimals + tokenOneAmount.length,
        '0'
      )}&fromAddress=${address}&slippage=${slippage}`
    );

    let decimals = Number(`1E${tokenTwo.decimals}`);
    setTokenTwoAmount(Number(tx.data.toTokenAmount) / decimals);

    setTxDetails(tx.data.tx);
  }

  async function getPrice() {
    console.log('Getting Price');
    if (!tokenOne.address || !tokenTwo.address || !tokenOneAmount) return;

    const params = {
      sellToken: tokenOne.address,
      buyToken: tokenTwo.address,
      sellAmount: tokenOneAmount * 10 ** tokenOne.decimals,
    };

    const headers = { '0x-api-key': process.env.ZEROSWAP_APIKEY }; // This is a placeholder. Get your live API key from the 0x Dashboard (https://dashboard.0x.org/apps)
    const apiUrl = `https://api.0x.org/swap/v1/price?${qs.stringify(params)}`;

    try {
      const response = await fetch(apiUrl, { headers });

      if (response.ok) {
        const swapPriceJSON = await response.json();
        console.log('Price:', swapPriceJSON);
        await setTokenTwoAmount(
          swapPriceJSON.buyAmount / 10 ** tokenTwo.decimals
        );
        await setgasprice(swapPriceJSON.estimatedGas);
      } else {
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  }

  async function getQuote() {
    console.log('Getting Quote');

    if (!tokenOne.address || !tokenTwo.address || !tokenOneAmount) return;

    const params = {
      sellToken: tokenOne.address,
      buyToken: tokenTwo.address,
      sellAmount: tokenOneAmount * 10 ** tokenOne.decimals,
    };

    const headers = { '0x-api-key': process.env.ZEROSWAP_APIKEY }; // This is a placeholder. Get your live API key from the 0x Dashboard (https://dashboard.0x.org/apps)
    const apiUrl = `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`;

    try {
      const response = await fetch(apiUrl, { headers });

      if (response.ok) {
        const swapQuoteJSON = await response.json();
        console.log('Quote:', swapQuoteJSON);
        setTokenTwoAmount(swapQuoteJSON.buyAmount / 10 ** tokenTwo.decimals);
        setgasprice(swapQuoteJSON.estimatedGas);
        return swapQuoteJSON;
      } else {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error: any) {
      // Handle network or other fetch-related errors
      console.error('Error:', error.message);
    }
  }

  useEffect(() => {
    const filtered = tokenList.filter((token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTokens(filtered);
  }, [searchQuery]);

  async function swapit() {
    if (!tokenOne.address || !tokenTwo.address || !tokenOneAmount) return;
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const web3 = new Web3(connection);
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const userWallet = await signer.getAddress();
    let amount = Number(tokenOneAmount * 10 ** tokenOne.decimals);
    const params = {
      sellToken: tokenOne.address,
      buyToken: tokenTwo.address,
      sellAmount: amount,
    };
    const headers = { '0x-api-key': process.env.ZEROSWAP_APIKEY }; // This is a placeholder. Get your live API key from the 0x Dashboard (https://dashboard.0x.org/apps)
    const apiUrl = `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`;

    try {
      const response = await fetch(apiUrl, { headers });
      if (response.ok) {
        const quote = await response.json();
        const proxy = quote.allowanceTarget;
        const amountstr = amount.toString();
        const ERC20Contract = new ethers.Contract(
          tokenOne.address,
          Erc20,
          signer
        );
        const approval = await ERC20Contract.approve(proxy, amountstr);
        await approval.wait();
        const txParams = {
          ...quote,
          from: userWallet,
          to: quote.to,
          value: quote.value.toString(16),
          gasPrice: null,
          gas: quote.gas,
        };
        await ethereum.request({
          method: 'eth_sendTransaction',
          params: [txParams],
        });
        setTokenOneAmount(0);
        setTokenTwoAmount(0);
        setgasprice(0);
      } else {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  }

  return (
    <>
      <Trade>
        <div className="tradeBox">
          <div className="inputs">
            <Input
              className={theme == 'dark' ? 'inp' : ''}
              disabled={address == undefined}
              placeholder="0"
              value={tokenOneAmount}
              onChange={changeAmount}
            />
            <Input
              className={theme == 'dark' ? 'inp' : ''}
              disabled={address == undefined}
              placeholder="0"
              value={tokenTwoAmount}
            />
            <div className="absolute left-1/2 top-1/2 z-[1] -ml-4 -mt-4 rounded-full bg-white shadow-large dark:bg-gray-600">
              <Button
                size="mini"
                color="gray"
                shape="circle"
                variant="transparent"
                onClick={switchTokens}
              >
                <SwapIcon className="h-auto w-3" />
              </Button>
            </div>
            <div className="assetOne" onClick={() => openModal(1)}>
              <Image
                width={22}
                height={22}
                src={tokenOne.logoURI}
                alt="assetOneLogo"
                className="assetLogo"
              />
              {tokenOne.symbol}
              <ChevronDown className="ltr:ml-1.5 rtl:mr-1.5" />
            </div>
            <div className="assetTwo" onClick={() => openModal(2)}>
              <Image
                width={22}
                height={22}
                src={tokenTwo.logoURI}
                alt="assetOneLogo"
                className="assetLogo"
              />
              {tokenTwo?.symbol}
              <ChevronDown className="ltr:ml-1.5 rtl:mr-1.5" />
            </div>
          </div>
          <div className="gas_estimate_label">
            Estimated Gas: <span id="gas_estimate">{gasprice}</span>
          </div>
          <Button
            disabled={address == undefined}
            size="large"
            onClick={fetchDexSwap}
            shape="rounded"
            fullWidth={true}
            className=" mt-6 uppercase xs:mt-8 xs:tracking-widest"
          >
            SWAP
          </Button>
        </div>

        <Modal
          open={isOpen}
          footer={null}
          onCancel={() => setIsOpen(false)}
          title="Select a token"
        >
          <div className="modalContent">
            <Input
              placeholder="Search tokens"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {filteredTokens?.map((e: any, i: any) => {
              return (
                <div
                  className="tokenChoice"
                  key={i}
                  onClick={() => modifyToken(i)}
                >
                  <Image
                    width={40}
                    height={40}
                    src={e.logoURI}
                    alt={e.symbol}
                    className="tokenLogo"
                  />
                  <div className="tokenChoiceNames">
                    <div className="tokenName">{e.name}</div>
                    <div className="tokenTicker">{e.symbol}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Modal>
      </Trade>
    </>
  );
};

export default SwapPage;
