import React, { useState } from 'react';
import { publicClient, walletClient } from '../../clients';
import { contract } from './CollateralManagerAbi'; // Đổi tên file ABI của bạn nếu cần
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const AddCollateral = () => {
  const [assetAddress, setAssetAddress] = useState<string>('');
  const [amount, setAmount] = useState<number | string>('');
  const account = useAccount();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!assetAddress || !amount) {
      alert('Please provide both asset address and amount.');
      return;
    }

    try {
      const { request } = await publicClient.simulateContract({
        abi: contract.abi,
        address: contract.address as Address, 
        functionName: 'addCollateral',
        args: [assetAddress, amount],
        account: account.address as Address,
      });

      const hash = await walletClient.writeContract(request);
      console.log('Transaction hash:', hash);
    } catch (error) {
      console.error('Error calling addCollateral:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Collateral</h2>
      <form onSubmit={submit}>
        <div className="input-group">
          <label htmlFor='assetAddress'>Asset Address</label>
          <input
            type='text'
            name='assetAddress'
            value={assetAddress}
            onChange={(e) => setAssetAddress(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor='amount'>Amount</label>
          <input
            type='number'
            name='amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button type='submit'>Add Collateral</button>
      </form>
    </div>
  );
};

export default AddCollateral;
