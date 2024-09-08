import React, { useState } from 'react';
import { publicClient } from '../../clients';
import { contract } from './CollateralManagerAbi'; // Thay thế với tệp ABI thực tế của bạn
import { useAccount } from 'wagmi'; 
import { Address } from 'viem';

const GetMockToken = () => {
    const [mockTokenAddress, setMockTokenAddress] = useState<string | null>(null); 
    const account = useAccount();

    const getMockToken = async () => {
        try {
            const mockTokenResult = await publicClient.readContract({
                abi: contract.abi,
                address: contract.address as Address, 
                functionName: 'mockToken',
                args: [],
            });
            setMockTokenAddress(mockTokenResult as string); 
        } catch (error) {
            console.error('Error fetching mockToken:', error);
        }
    }

    return (
        <div className="form-container">
            <h2>Get Mock Token Address</h2>
            <button type='button' onClick={getMockToken}>Get Mock Token</button>
            <div className="mock-token">
                <h6>Mock Token Address: {mockTokenAddress ? mockTokenAddress : 'N/A'}</h6>
            </div>
        </div>
    );
};

export default GetMockToken;
