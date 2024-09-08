import React, { useState } from 'react';
import { publicClient } from '../../clients';
import { contract } from './CollateralManagerAbi'; // Đổi tên file ABI của bạn nếu cần
import { useAccount } from 'wagmi'; 
import { Address } from 'viem';

const GetCollateralFee = () => {
    const [collateralFee, setCollateralFee] = useState<number | null>(null); 
    const account = useAccount();

    const fetchCollateralFee = async () => {
        try {
            const feeResult = await publicClient.readContract({
                abi: contract.abi,
                address: contract.address as Address, 
                functionName: 'addCollateralFee',
                args: [],
            });
            setCollateralFee(feeResult as number); 
        } catch (error) {
            console.error('Error fetching collateral fee:', error);
        }
    }

    return (
        <div className="form-container">
            <h2>Get Collateral Fee</h2>
            <button type='button' onClick={fetchCollateralFee}>Get Collateral Fee</button>
            <div className="collateral-fee">
                <h6>Collateral Fee: {collateralFee !== null ? collateralFee : 'N/A'}</h6>
            </div>
        </div>
    );
};

export default GetCollateralFee;
