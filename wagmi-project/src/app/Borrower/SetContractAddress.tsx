import React, { useState } from 'react';
import { publicClient, walletClient } from '../../clients';
import { contract } from './BorrowerAbi'; // Đảm bảo đường dẫn chính xác
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const SetContractAddress = () => {
  const [priceOracle, setPriceOracle] = useState<string>('');
  const [collateralManager, setCollateralManager] = useState<string>('');
  const [lendingPool, setLendingPool] = useState<string>('');
  const account = useAccount();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!priceOracle || !collateralManager || !lendingPool) {
      alert('Please provide all contract addresses.');
      return;
    }

    try {
      const { request } = await publicClient.simulateContract({
        abi: contract.abi,
        address: contract.address as Address, 
        functionName: 'setContractAddress',
        args: [priceOracle, collateralManager, lendingPool],
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
      <h2>Set Contract Addresses</h2>
      <form onSubmit={submit}>
        <label htmlFor='priceOracle'>Price Oracle Address</label>
        <input
          type='text'
          name='priceOracle'
          value={priceOracle}
          onChange={(e) => setPriceOracle(e.target.value)}
        />

        <label htmlFor='collateralManager'>Collateral Manager Address</label>
        <input
          type='text'
          name='collateralManager'
          value={collateralManager}
          onChange={(e) => setCollateralManager(e.target.value)}
        />

        <label htmlFor='lendingPool'>Lending Pool Address</label>
        <input
          type='text'
          name='lendingPool'
          value={lendingPool}
          onChange={(e) => setLendingPool(e.target.value)}
        />

        <button type='submit'>Set Addresses</button>
      </form>
    </div>
  );
};

export default SetContractAddress;
