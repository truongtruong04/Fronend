import React, { useState } from 'react';
import { publicClient, walletClient } from '../../clients';
import { contract } from './CollateralManagerAbi'; // Thay thế bằng ABI thực tế của bạn
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const UpdateValidCollateralTokens = () => {
  const [tokenAddresses, setTokenAddresses] = useState<string>(''); // Chuỗi địa chỉ token
  const [statuses, setStatuses] = useState<string>(''); // Chuỗi trạng thái (true/false) cho mỗi token
  const account = useAccount();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!tokenAddresses || !statuses) {
      alert('Please provide valid token addresses and statuses.');
      return;
    }

    try {
      // Chuyển đổi chuỗi địa chỉ và trạng thái thành mảng
      const tokenArray = tokenAddresses.split(',').map((address) => address.trim());
      const statusArray = statuses.split(',').map((status) => status.trim().toLowerCase() === 'true');

      const { request } = await publicClient.simulateContract({
        abi: contract.abi,
        address: contract.address as Address,
        functionName: 'updateValidCollateralTokens',
        args: [tokenArray, statusArray],
        account: account.address as Address,
      });

      const hash = await walletClient.writeContract(request);
      console.log('Transaction hash:', hash);
    } catch (error) {
      console.error('Error calling updateValidCollateralTokens:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Update Valid Collateral Tokens</h2>
      <form onSubmit={submit}>
        <label htmlFor='tokenAddresses'>Token Addresses (comma-separated)</label>
        <input
          type='text'
          name='tokenAddresses'
          value={tokenAddresses}
          onChange={(e) => setTokenAddresses(e.target.value)}
        />
        <label htmlFor='statuses'>Statuses (comma-separated true/false)</label>
        <input
          type='text'
          name='statuses'
          value={statuses}
          onChange={(e) => setStatuses(e.target.value)}
        />
        <button type='submit'>Update Tokens</button>
      </form>
    </div>
  );
};

export default UpdateValidCollateralTokens;
