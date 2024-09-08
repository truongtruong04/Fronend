import React, { useState } from 'react';
import { publicClient } from '../../clients';
import { contract } from './CollateralManagerAbi'; // Thay thế với tệp ABI thực tế của bạn
import { useAccount } from 'wagmi'; 
import { Address } from 'viem';

const GetRemoveCollateralFee = () => {
    const [removeCollateralFee, setRemoveCollateralFee] = useState<number | null>(null); 
    const account = useAccount();

    const fetchRemoveCollateralFee = async () => {
        try {
            const feeResult = await publicClient.readContract({
                abi: contract.abi,
                address: contract.address as Address, 
                functionName: 'removeCollateralFee',
                args: [],
            });
            setRemoveCollateralFee(feeResult as number); 
        } catch (error) {
            console.error('Error fetching removeCollateralFee:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Get Remove Collateral Fee</h2>
            <button type='button' onClick={fetchRemoveCollateralFee}>Get Fee</button>
            <div className="fee">
                <h6>Remove Collateral Fee: {removeCollateralFee !== null ? removeCollateralFee.toString() : 'N/A'}</h6>
            </div>
        </div>
    );
};

export default GetRemoveCollateralFee;
