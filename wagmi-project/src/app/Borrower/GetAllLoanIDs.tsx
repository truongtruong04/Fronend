import React, { useState } from 'react';
import { publicClient } from '../../clients';
import { contract } from './BorrowerAbi'; // Điều chỉnh đường dẫn và tên ABI nếu cần
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const GetAllLoanIDs = () => {
  const [loanIDs, setLoanIDs] = useState<number[] | null>(null); 
  const [userAddress, setUserAddress] = useState<string>('');
  const account = useAccount();

  const fetchLoanIDs = async () => {
    if (!userAddress) {
      alert('Please provide a user address.');
      return;
    }

    try {
      const loanIDsResult = await publicClient.readContract({
        abi: contract.abi,
        address: contract.address as Address, 
        functionName: 'getAllLoanIDs',
        args: [userAddress],
      });

      setLoanIDs(loanIDsResult as number[]); 
    } catch (error) {
      console.error('Error fetching loan IDs:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Get All Loan IDs</h2>
      <form onSubmit={(e) => { e.preventDefault(); fetchLoanIDs(); }}>
        <label htmlFor='userAddress'>User Address</label>
        <input
          type='text'
          name='userAddress'
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        />
        <button type='submit'>Fetch Loan IDs</button>
      </form>
      <div className="loan-ids">
        <h6>Loan IDs:</h6>
        <ul>
          {loanIDs ? loanIDs.map((id, index) => (
            <li key={index}>{id}</li>
          )) : <p>No loan IDs found.</p>}
        </ul>
      </div>
    </div>
  );
};

export default GetAllLoanIDs;
