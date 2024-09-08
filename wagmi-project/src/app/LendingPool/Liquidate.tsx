import React, { useState } from 'react';
import { publicClient, walletClient } from '../../clients';
import { contract } from './LendingPoolAbi';
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const Liquidate = () => {
  const [userAddress, setUserAddress] = useState<string>('');
  const account = useAccount();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userAddress) {
      alert('Please provide a user address.');
      return;
    }

    try {
      // Gọi hàm liquidate trên hợp đồng
      const { request } = await publicClient.simulateContract({
        abi: contract.abi,
        address: contract.address as Address, 
        functionName: 'liquidate',
        args: [userAddress],
        account: account.address as Address,
      });

      // Ghi giao dịch lên blockchain
      const hash = await walletClient.writeContract(request);
      console.log('Transaction hash:', hash);
      alert('Transaction sent! Hash: ' + hash);
    } catch (error) {
      // Xử lý lỗi để đảm bảo loại lỗi được xử lý chính xác
      if (error instanceof Error) {
        console.error('Error calling liquidate:', error.message);
        alert('Error occurred: ' + error.message);
      } else {
        console.error('Unexpected error:', error);
        alert('Unexpected error occurred');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Liquidate</h2>
      <form onSubmit={submit}>
        <label htmlFor='userAddress'>User Address</label>
        <input
          type='text'
          name='userAddress'
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        />
        <button type='submit'>Liquidate</button>
      </form>
    </div>
  );
};

export default Liquidate;
