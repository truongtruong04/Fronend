import React, { useState } from 'react';
import { publicClient } from '../../clients';
import { contract } from './LendingPoolAbi';
import { useAccount } from 'wagmi'; 
import { Address } from 'viem';

const GetServiceFee = () => {
    const [serviceFee, setServiceFee] = useState<number | null>(null); 
    const account = useAccount();

    const getServiceFee = async () => {
        try {
            const feeResult = await publicClient.readContract({
                abi: contract.abi,
                address: contract.address as Address, 
                functionName: 'serviceFee',
                args: [], // Hàm không yêu cầu tham số
            });
            
            // Chuyển kết quả từ BigInt sang số nguyên
            setServiceFee(Number(feeResult));
        } catch (error) {
            console.error('Error fetching service fee:', error);
        }
    }

    return (
        <div className="form-container">
            <h2>Get Service Fee</h2>
            <button type='button' onClick={getServiceFee}>Get Service Fee</button>
            <div className="service-fee">
                <h6>Service Fee: {serviceFee !== null ? serviceFee.toString() : 'N/A'}</h6>
            </div>
        </div>
    );
};

export default GetServiceFee;
