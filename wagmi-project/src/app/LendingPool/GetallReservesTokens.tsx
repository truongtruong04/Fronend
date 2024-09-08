import React, { useState } from 'react';
import { publicClient } from '../../clients';
import { contract } from './LendingPoolAbi';
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const GetAllReservesTokens = () => {
  const [tokens, setTokens] = useState<{ symbol: string, assetAddress: string }[]>([]);
  const account = useAccount();

  const getAllReservesTokens = async () => {
    try {
      const tokensResult = await publicClient.readContract({
        abi: contract.abi,
        address: contract.address as Address,
        functionName: 'getAllReservesTokens',
        args: [],
      });

      // tokensResult should be an array of objects with symbol and assetAddress
      setTokens(tokensResult as { symbol: string, assetAddress: string }[]);
    } catch (error) {
      console.error('Error fetching reserves tokens:', error);
    }
  }

  return (
    <div className="form-container">
      <h2>Get All Reserves Tokens</h2>
      <button type='button' onClick={getAllReservesTokens}>Get Tokens</button>
      <div className="tokens">
        <h6>Tokens:</h6>
        <ul>
          {tokens.length > 0 ? (
            tokens.map((token, index) => (
              <li key={index}>
                <strong>Symbol:</strong> {token.symbol} <br />
                <strong>Address:</strong> {token.assetAddress}
              </li>
            ))
          ) : (
            <li>No tokens available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default GetAllReservesTokens;
