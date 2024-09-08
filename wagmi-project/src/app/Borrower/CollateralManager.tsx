import React, { useState } from 'react';
import { publicClient } from '../../clients';
import { contract } from './BorrowerAbi';  // Điều chỉnh đường dẫn và tên ABI nếu cần
import { useAccount } from 'wagmi'; 
import { Address } from 'viem';

const GetCollateralManager = () => {
    const [collateralManager, setCollateralManager] = useState<string | null>(null); 
    const account = useAccount();

    const getCollateralManager = async () => {
        try {
            const result = await publicClient.readContract({
                abi: contract.abi,
                address: contract.address as Address, 
                functionName: 'collateralManager',
                args: [],
            });
            setCollateralManager(result as string); 
        } catch (error) {
            console.error('Error fetching collateral manager:', error);
        }
    }

    return (
        <div className="form-container">
            <h2>Get Collateral Manager</h2>
            <button type='button' onClick={getCollateralManager}>Get Collateral Manager</button>
            <div className="collateral-manager">
                <h6>Collateral Manager: {collateralManager ? collateralManager : 'N/A'}</h6>
            </div>
        </div>
    );
};

export default GetCollateralManager;
