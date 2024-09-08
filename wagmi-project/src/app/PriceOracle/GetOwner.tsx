import React, { useState } from 'react';
import { publicClient } from '../../clients';
import { contract } from './PriceOracleAbi';  // Bạn có thể thay đổi PriceOracleAbi thành tên ABI thực tế
import { useAccount } from 'wagmi'; 
import { Address } from 'viem';

const GetOwner = () => {
    const [owner, setOwner] = useState<string | null>(null); 
    const account = useAccount();

    const getOwner = async () => {
        try {
            const ownerResult = await publicClient.readContract({
                abi: contract.abi,
                address: contract.address as Address, 
                functionName: 'owner',
                args: [], // Không có tham số đầu vào
            });
            setOwner(ownerResult as string); 
        } catch (error) {
            console.error('Error fetching owner:', error);
        }
    }

    return (
        <div className="form-container">
            <h2>Get Owner</h2>
            <button type='button' onClick={getOwner}>Get Owner</button>
            <div className="owner">
                <h6>Owner: {owner ? owner : 'N/A'}</h6>
            </div>
        </div>
    );
};

export default GetOwner;
