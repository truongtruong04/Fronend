import React, { useState } from 'react';
import { publicClient, walletClient } from '../../clients';
import { contract } from './CollateralManagerAbi'; // Thay thế với tệp ABI thực tế của bạn
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const SetContractAddress = () => {
  const [priceOracleAddress, setPriceOracleAddress] = useState<string>('');
  const [mockTokenAddress, setMockTokenAddress] = useState<string>('');
  const account = useAccount();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!priceOracleAddress || !mockTokenAddress) {
      alert('Please provide both Price Oracle and Mock Token addresses.');
      return;
    }

    try {
      const { request } = await publicClient.simulateContract({
        abi: contract.abi,
        address: contract.address as Address, 
        functionName: 'setContractAddress',
        args: [priceOracleAddress, mockTokenAddress],
        account: account.address as Address,
      });

      const hash = await walletClient.writeContract(request);
      console.log('Transaction hash:', hash);
    } catch (error) {
      console.error('Error calling setContractAddress:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Set Contract Address</h2>
      <form onSubmit={submit}>
        <label htmlFor='priceOracleAddress'>Price Oracle Address</label>
        <input
          type='text'
          name='priceOracleAddress'
          value={priceOracleAddress}
          onChange={(e) => setPriceOracleAddress(e.target.value)}
        />
        <label htmlFor='mockTokenAddress'>Mock Token Address</label>
        <input
          type='text'
          name='mockTokenAddress'
          value={mockTokenAddress}
          onChange={(e) => setMockTokenAddress(e.target.value)}
        />
        <button type='submit'>Set Addresses</button>
      </form>
    </div>
  );
};

export default SetContractAddress;
