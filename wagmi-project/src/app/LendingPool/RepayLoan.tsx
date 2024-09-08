import React, { useState } from 'react';
import { publicClient, walletClient } from '../../clients'; // Đảm bảo đường dẫn này là chính xác
import { contract } from './LendingPoolAbi'; // Cập nhật theo tên ABI thực tế
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const RepayLoan = () => {
  const [amount, setAmount] = useState<string>(''); // Lưu số lượng repay
  const account = useAccount();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!amount) {
      alert('Please provide an amount to repay.');
      return;
    }

    try {
      const parsedAmount = BigInt(amount); // Chuyển đổi thành BigInt cho số lượng lớn
      const { request } = await publicClient.simulateContract({
        abi: contract.abi,
        address: contract.address as Address,
        functionName: 'repay',
        args: [parsedAmount], // Truyền số lượng repay
        account: account.address as Address,
      });

      const hash = await walletClient.writeContract(request);
      console.log('Transaction hash:', hash);
    } catch (error) {
      console.error('Error calling repay:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Repay Loan</h2>
      <form onSubmit={submit}>
        <label htmlFor='amount'>Amount to Repay</label>
        <input
          type='text'
          name='amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)} // Cập nhật số lượng repay
        />
        <button type='submit'>Repay Loan</button>
      </form>
    </div>
  );
};

export default RepayLoan;
