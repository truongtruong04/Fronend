import React, { useState } from 'react';
import { publicClient, walletClient } from '../../clients';
import { contract } from './LendingPoolAbi';
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const SetMockTokenAddress = () => {
  const [mockTokenAddress, setMockTokenAddress] = useState<string>('');
  const account = useAccount();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!mockTokenAddress) {
      alert('Please provide a mock token address.');
      return;
    }

    try {
      const { request } = await publicClient.simulateContract({
        abi: contract.abi,
        address: contract.address as Address,
        functionName: 'setMockTokenAddress',
        args: [mockTokenAddress],
        account: account.address as Address,
      });

      const hash = await walletClient.writeContract(request);
      console.log('Transaction hash:', hash);
    } catch (error) {
      console.error('Error calling setMockTokenAddress:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Set Mock Token Address</h2>
      <form onSubmit={submit}>
        <label htmlFor='mockTokenAddress'>Mock Token Address</label>
        <input
          type='text'
          name='mockTokenAddress'
          value={mockTokenAddress}
          onChange={(e) => setMockTokenAddress(e.target.value)}
        />
        <button type='submit'>Set Mock Token Address</button>
      </form>
    </div>
  );
};

export default SetMockTokenAddress;
