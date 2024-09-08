import React, { useState } from 'react';
import { publicClient, walletClient } from '../../clients';
import { contract } from './BorrowerAbi'; // Đảm bảo đường dẫn chính xác
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const SetServiceFee = () => {
  const [serviceFee, setServiceFee] = useState<string>(''); 
  const account = useAccount();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!serviceFee) {
      alert('Please provide a service fee.');
      return;
    }

    try {
      const { request } = await publicClient.simulateContract({
        abi: contract.abi,
        address: contract.address as Address,
        functionName: 'setServiceFee',
        args: [BigInt(serviceFee)],  // Chuyển serviceFee thành BigInt
        account: account.address as Address,
      });

      const hash = await walletClient.writeContract(request);
      console.log('Transaction hash:', hash);
    } catch (error) {
      console.error('Error calling setServiceFee:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Set Service Fee</h2>
      <form onSubmit={submit}>
        <label htmlFor='serviceFee'>Service Fee (in wei)</label>
        <input
          type='text'
          name='serviceFee'
          value={serviceFee}
          onChange={(e) => setServiceFee(e.target.value)}
        />
        <button type='submit'>Set Service Fee</button>
      </form>
    </div>
  );
};

export default SetServiceFee;
