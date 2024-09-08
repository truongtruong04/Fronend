import React, { useState } from 'react';
import { publicClient } from '../../clients'; // Đảm bảo đường dẫn chính xác
import { contract } from './BorrowerAbi'; // Đảm bảo đường dẫn chính xác
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const GetServiceFee = () => {
  const [serviceFee, setServiceFee] = useState<number | null>(null);
  const account = useAccount();

  const getServiceFee = async () => {
    try {
      const result = await publicClient.readContract({
        abi: contract.abi,
        address: contract.address as Address,
        functionName: 'serviceFee',
        args: [],
      });
      setServiceFee(result as number); 
    } catch (error) {
      console.error('Error fetching service fee:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Get Service Fee</h2>
      <button type='button' onClick={getServiceFee}>Get Service Fee</button>
      <div className="service-fee">
        <h6>Service Fee: {serviceFee !== null ? serviceFee : 'N/A'}</h6>
      </div>
    </div>
  );
};

export default GetServiceFee;
