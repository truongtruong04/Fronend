import React, { useState } from 'react';
import { publicClient } from '../../clients';
import { contract } from './BorrowerAbi'; // Thay đổi đường dẫn nếu cần
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const GetLendingPool = () => {
  const [lendingPoolAddress, setLendingPoolAddress] = useState<string | null>(null); 
  const account = useAccount();

  const fetchLendingPool = async () => {
    try {
      const lendingPoolResult = await publicClient.readContract({
        abi: contract.abi,
        address: contract.address as Address, 
        functionName: 'lendingPool',
        args: [],
      });
      setLendingPoolAddress(lendingPoolResult as string); 
    } catch (error) {
      console.error('Error fetching lending pool address:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Get Lending Pool</h2>
      <button type='button' onClick={fetchLendingPool}>Get Lending Pool</button>
      <div className="lending-pool">
        <h6>Lending Pool Address: {lendingPoolAddress ? lendingPoolAddress : 'N/A'}</h6>
      </div>
    </div>
  );
};

export default GetLendingPool;
