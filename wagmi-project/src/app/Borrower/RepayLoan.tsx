import React, { useState } from 'react';
import { publicClient, walletClient } from '../../clients'; // Đảm bảo đường dẫn chính xác
import { contract } from './BorrowerAbi'; // Đam bảo đường dẫn chính xác
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const RepayLoan = () => {
  const [loanId, setLoanId] = useState<string>('');
  const account = useAccount();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loanId) {
      alert('Please provide a loan ID.');
      return;
    }

    try {
      const { request } = await publicClient.simulateContract({
        abi: contract.abi,
        address: contract.address as Address,
        functionName: 'repayLoan',
        args: [loanId],
        account: account.address as Address,
      });

      const hash = await walletClient.writeContract(request);
      console.log('Transaction hash:', hash);
    } catch (error) {
      console.error('Error calling repayLoan:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Repay Loan</h2>
      <form onSubmit={submit}>
        <label htmlFor='loanId'>Loan ID</label>
        <input
          type='text'
          name='loanId'
          value={loanId}
          onChange={(e) => setLoanId(e.target.value)}
        />
        <button type='submit'>Repay Loan</button>
      </form>
    </div>
  );
};

export default RepayLoan;
