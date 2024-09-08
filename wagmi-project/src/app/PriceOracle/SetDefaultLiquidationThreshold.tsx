import React, { useState } from 'react';
import { publicClient, walletClient } from '../../clients';
import { contract } from './PriceOracleAbi';  // Bạn có thể thay đổi PriceOracleAbi thành tên ABI thực tế
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const SetDefaultLiquidationThreshold = () => {
  const [assetAddress, setAssetAddress] = useState<string>('');
  const [percentage, setPercentage] = useState<number>(0);
  const account = useAccount();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!assetAddress || percentage === 0) {
      alert('Please provide asset address and percentage.');
      return;
    }

    try {
      const { request } = await publicClient.simulateContract({
        abi: contract.abi,
        address: contract.address as Address,
        functionName: 'setDefaultLiquidationThreshold',
        args: [assetAddress, percentage],
        account: account.address as Address,
      });

      const hash = await walletClient.writeContract(request);
      console.log('Transaction hash:', hash);
    } catch (error) {
      console.error('Error calling setDefaultLiquidationThreshold:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Set Default Liquidation Threshold</h2>
      <form onSubmit={submit}>
        <label htmlFor='assetAddress'>Asset Address</label>
        <input
          type='text'
          name='assetAddress'
          value={assetAddress}
          onChange={(e) => setAssetAddress(e.target.value)}
        />
        <label htmlFor='percentage'>Percentage</label>
        <input
          type='number'
          name='percentage'
          value={percentage}
          onChange={(e) => setPercentage(Number(e.target.value))}
        />
        <button type='submit'>Set Threshold</button>
      </form>
    </div>
  );
};

export default SetDefaultLiquidationThreshold;
