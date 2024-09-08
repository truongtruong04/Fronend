import React, { useState } from 'react';
import { publicClient, walletClient } from '../../clients';
import { contract } from './LendingPoolAbi';
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const SetToken = () => {
  const [tokenAddress, setTokenAddress] = useState<string>('');
  const account = useAccount();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!tokenAddress) {
      alert('Please provide a token address.');
      return;
    }

    try {
      const { request } = await publicClient.simulateContract({
        abi: contract.abi,
        address: contract.address as Address, 
        functionName: 'setToken',
        args: [tokenAddress],
        account: account.address as Address,
      });

      const hash = await walletClient.writeContract(request);
      console.log('Transaction hash:', hash);
    } catch (error) {
      console.error('Error calling setToken:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Set Token</h2>
      <form onSubmit={submit}>
        <label htmlFor='tokenAddress'>Token Address</label>
        <input
          type='text'
          name='tokenAddress'
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
        />
        <button type='submit'>Set Token</button>
      </form>
    </div>
  );
};

export default SetToken;
