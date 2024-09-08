import React, { useState } from 'react';
import { publicClient } from '../../clients'; // Đảm bảo đường dẫn chính xác
import { contract } from './BorrowerAbi'; // Đảm bảo đường dẫn chính xác
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const GetRiskParameters = () => {
  const [userAddress, setUserAddress] = useState<string>('');
  const [loanRate, setLoanRate] = useState<number | null>(null);
  const account = useAccount();

  const getRiskParameters = async () => {
    if (!userAddress) {
      alert('Please provide a user address.');
      return;
    }

    try {
      const result = await publicClient.readContract({
        abi: contract.abi,
        address: contract.address as Address,
        functionName: 'riskParameters',
        args: [userAddress],
      });
      setLoanRate(result as number); 
    } catch (error) {
      console.error('Error fetching risk parameters:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Get Risk Parameters</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getRiskParameters();
        }}
      >
        <label htmlFor='userAddress'>User Address</label>
        <input
          type='text'
          name='userAddress'
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        />
        <button type='submit'>Get Loan Rate</button>
      </form>
      <div className="risk-parameters">
        <h6>Loan Rate: {loanRate !== null ? loanRate : 'N/A'}</h6>
      </div>
    </div>
  );
};

export default GetRiskParameters;
