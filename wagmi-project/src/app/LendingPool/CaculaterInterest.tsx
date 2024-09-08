import React, { useState } from 'react';
import { publicClient } from '../../clients';
import { contract } from './LendingPoolAbi';
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const CalculateInterest = () => {
  const [loanAmount, setLoanAmount] = useState<number | ''>('');
  const [interestRate, setInterestRate] = useState<number | ''>('');
  const [startTime, setStartTime] = useState<number | ''>('');
  const [interest, setInterest] = useState<number | null>(null);
  const account = useAccount();

  const calculateInterest = async () => {
    if (loanAmount === '' || interestRate === '' || startTime === '') {
      alert('Please provide all inputs.');
      return;
    }

    try {
      const interestResult = await publicClient.readContract({
        abi: contract.abi,
        address: contract.address as Address,
        functionName: 'calculateInterest',
        args: [loanAmount, interestRate, startTime],
      });
      setInterest(Number(interestResult)); // Ensure the result is treated as a number
    } catch (error) {
      console.error('Error calculating interest:', error);
      setInterest(null); // Set interest to null in case of error
    }
  }

  return (
    <div className="form-container">
      <h2>Calculate Interest</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='loanAmount'>Loan Amount</label>
        <input
          type='number'
          name='loanAmount'
          value={loanAmount}
          onChange={(e) => setLoanAmount(Number(e.target.value))}
        />
        <label htmlFor='interestRate'>Interest Rate</label>
        <input
          type='number'
          name='interestRate'
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
        />
        <label htmlFor='startTime'>Start Time</label>
        <input
          type='number'
          name='startTime'
          value={startTime}
          onChange={(e) => setStartTime(Number(e.target.value))}
        />
        <button type='button' onClick={calculateInterest}>Calculate Interest</button>
      </form>
      <div className="result">
        <h6>Calculated Interest: {interest !== null ? interest.toString() : 'N/A'}</h6>
      </div>
    </div>
  );
};

export default CalculateInterest;
