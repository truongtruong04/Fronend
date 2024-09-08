import React, { useState } from 'react';
import { publicClient, walletClient } from '../../clients';
import { contract } from './CollateralManagerAbi';
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const LockCollateral = () => {
  const [user, setUser] = useState<string>('');
  const [assetAddress, setAssetAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const account = useAccount();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user || !assetAddress || !amount) {
      alert('Please provide all required fields.');
      return;
    }

    try {
      const { request } = await publicClient.simulateContract({
        abi: contract.abi,
        address: contract.address as Address,
        functionName: 'lockCollateral',
        args: [user, assetAddress, amount],
        account: account.address as Address,
      });

      const hash = await walletClient.writeContract(request);
      console.log('Transaction hash:', hash);
    } catch (error) {
      console.error('Error calling lockCollateral:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Lock Collateral</h2>
      <form onSubmit={submit}>
        <label htmlFor='user'>User Address</label>
        <input
          type='text'
          id='user'
          name='user'
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <label htmlFor='assetAddress'>Asset Address</label>
        <input
          type='text'
          id='assetAddress'
          name='assetAddress'
          value={assetAddress}
          onChange={(e) => setAssetAddress(e.target.value)}
        />
        <label htmlFor='amount'>Amount</label>
        <input
          type='number'
          id='amount'
          name='amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type='submit'>Lock Collateral</button>
      </form>
    </div>
  );
};

export default LockCollateral;
