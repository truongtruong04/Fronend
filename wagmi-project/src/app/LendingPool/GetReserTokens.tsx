import React, { useState } from 'react';
import { publicClient } from '../../clients';
import { contract } from './LendingPoolAbi';  // Đảm bảo đường dẫn đến ABI là chính xác
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const GetReserveTokens = () => {
  const [tokenId, setTokenId] = useState<number | ''>('');
  const [symbol, setSymbol] = useState<string | null>(null);
  const [assetAddress, setAssetAddress] = useState<string | null>(null);
  const account = useAccount();

  const getReserveTokens = async () => {
    if (tokenId === '') {
      alert('Please provide a token ID.');
      return;
    }

    try {
      const result = await publicClient.readContract({
        abi: contract.abi,
        address: contract.address as Address,
        functionName: 'reserveTokens',
        args: [tokenId],
      });

      // Giải nén kết quả
      const [symbolResult, assetAddressResult] = result as [string, string];
      setSymbol(symbolResult);
      setAssetAddress(assetAddressResult);
    } catch (error) {
      console.error('Error fetching reserve tokens:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Get Reserve Tokens</h2>
      <form onSubmit={(e) => { e.preventDefault(); getReserveTokens(); }}>
        <label htmlFor='tokenId'>Token ID</label>
        <input
          type='number'
          name='tokenId'
          value={tokenId}
          onChange={(e) => setTokenId(Number(e.target.value))}
        />
        <button type='submit'>Get Reserve Tokens</button>
      </form>
      <div className="reserve-tokens">
        <h6>Symbol: {symbol ? symbol : 'N/A'}</h6>
        <h6>Asset Address: {assetAddress ? assetAddress : 'N/A'}</h6>
      </div>
    </div>
  );
};

export default GetReserveTokens;
