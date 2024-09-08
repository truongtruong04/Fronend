import React, { useState } from 'react';
import { publicClient, walletClient } from '../../clients';
import { contract } from './PriceOracleAbi'; // Import ABI của hợp đồng
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const UpdateLiquidationThreshold = () => {
  const [assetAddress, setAssetAddress] = useState<string>('');
  const [threshold, setThreshold] = useState<number>(0);
  const account = useAccount();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!assetAddress || threshold <= 0) {
      alert('Please provide a valid asset address and threshold.');
      return;
    }

    try {
      const { request } = await publicClient.simulateContract({
        abi: contract.abi,
        address: contract.address as Address, 
        functionName: 'updateLiquidationThreshold',
        args: [assetAddress, threshold],
        account: account.address as Address,
      });

      const hash = await walletClient.writeContract(request);
      console.log('Transaction hash:', hash);
    } catch (error) {
      console.error('Error calling updateLiquidationThreshold:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Update Liquidation Threshold</h2>
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor='assetAddress'>Asset Address</label>
          <input
            type='text'
            name='assetAddress'
            value={assetAddress}
            onChange={(e) => setAssetAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor='threshold'>Threshold</label>
          <input
            type='number'
            name='threshold'
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
          />
        </div>
        <button type='submit'>Update Threshold</button>
      </form>
    </div>
  );
};

export default UpdateLiquidationThreshold;
