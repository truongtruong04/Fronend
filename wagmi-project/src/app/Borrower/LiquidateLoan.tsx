import React, { useState } from 'react';
import { publicClient, walletClient } from '../../clients';
import { contract } from './BorrowerAbi'; // Thay đổi đường dẫn nếu cần
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const LiquidateLoan = () => {
  const [userAddress, setUserAddress] = useState<string>('');
  const account = useAccount();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userAddress) {
      alert('Please provide a user address.');
      return;
    }

    try {
      const { request } = await publicClient.simulateContract({
        abi: contract.abi,
        address: contract.address as Address, 
        functionName: 'liquidateLoan',
        args: [userAddress],
        account: account.address as Address,
      });

      const hash = await walletClient.writeContract(request);
      console.log('Transaction hash:', hash);
    } catch (error) {
      console.error('Error calling liquidateLoan:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Liquidate Loan</h2>
      <form onSubmit={submit}>
        <label htmlFor='userAddress'>User Address</label>
        <input
          type='text'
          name='userAddress'
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        />
        <button type='submit'>Liquidate Loan</button>
      </form>
    </div>
  );
};

export default LiquidateLoan;
