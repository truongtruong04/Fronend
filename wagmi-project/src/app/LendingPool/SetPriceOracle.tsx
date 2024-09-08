import React, { useState } from 'react';
import { publicClient, walletClient } from '../../clients';
import { contract } from './LendingPoolAbi';
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const SetPriceOracle = () => {
  const [priceOracleAddress, setPriceOracleAddress] = useState<string>('');
  const account = useAccount();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!priceOracleAddress) {
      alert('Please provide a price oracle address.');
      return;
    }

    try {
      const { request } = await publicClient.simulateContract({
        abi: contract.abi,
        address: contract.address as Address, 
        functionName: 'setPriceOracle',
        args: [priceOracleAddress],
        account: account.address as Address,
      });

      const hash = await walletClient.writeContract(request);
      console.log('Transaction hash:', hash);
    } catch (error) {
      console.error('Error calling setPriceOracle:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Set Price Oracle</h2>
      <form onSubmit={submit}>
        <label htmlFor='priceOracleAddress'>Price Oracle Address</label>
        <input
          type='text'
          name='priceOracleAddress'
          value={priceOracleAddress}
          onChange={(e) => setPriceOracleAddress(e.target.value)}
        />
        <button type='submit'>Set Price Oracle</button>
      </form>
    </div>
  );
};

export default SetPriceOracle;
