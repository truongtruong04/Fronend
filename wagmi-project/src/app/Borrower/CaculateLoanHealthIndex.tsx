import React, { useState } from 'react';
import { publicClient } from '../../clients';
import { contract } from './BorrowerAbi';
import { useAccount } from 'wagmi'; 
import { Address } from 'viem';

const CalculateLoanHealthIndex = () => {
    const [healthIndex, setHealthIndex] = useState<number | null>(null); 
    const [userAddress, setUserAddress] = useState<string>('');
    const account = useAccount();

    const calculateHealthIndex = async () => {
        try {
            const result = await publicClient.readContract({
                abi: contract.abi,
                address: contract.address as Address, 
                functionName: 'calculateLoanHealthIndex',
                args: [userAddress],
            });
            setHealthIndex(result as number); 
        } catch (error) {
            console.error('Error calculating loan health index:', error);
        }
    }

    return (
        <div className="form-container">
            <h2>Calculate Loan Health Index</h2>
            <input
                type="text"
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
                placeholder="Enter user address"
            />
            <button type='button' onClick={calculateHealthIndex}>Calculate</button>
            <div className="health-index">
                <h6>Loan Health Index: {healthIndex !== null ? healthIndex : 'N/A'}</h6>
            </div>
        </div>
    );
};

export default CalculateLoanHealthIndex;
