import React, { useState } from 'react';
import { publicClient } from '../../clients'; // Đảm bảo bạn đã cấu hình publicClient đúng cách
import { contract } from './CollateralManagerAbi'; // Thay đổi tên file để phù hợp với ABI của bạn
import { useAccount } from 'wagmi'; 
import { Address } from 'viem';

const GetCollateralAssets = () => {
    const [collateral, setCollateral] = useState<{ amount: string; isLocked: boolean; aTokenAmount: string } | null>(null); 
    const account = useAccount();

    const getCollateralAssets = async (address1: string, address2: string) => {
        try {
            const collateralResult = await publicClient.readContract({
                abi: contract.abi,
                address: contract.address as Address, 
                functionName: 'collateralAssets',
                args: [address1, address2], // Thay đổi các tham số phù hợp với hàm của bạn
            });
            const [amount, isLocked, aTokenAmount] = collateralResult as [string, boolean, string];
            setCollateral({ amount, isLocked, aTokenAmount }); 
        } catch (error) {
            console.error('Error fetching collateral assets:', error);
        }
    }

    return (
        <div className="form-container">
            <h2>Get Collateral Assets</h2>
            <button 
                type='button' 
                onClick={() => getCollateralAssets('0xAddress1', '0xAddress2')} // Thay đổi các địa chỉ hợp lệ
            >
                Get Collateral Assets
            </button>
            <div className="collateral">
                <h6>Amount: {collateral ? collateral.amount : 'N/A'}</h6>
                <h6>Is Locked: {collateral ? (collateral.isLocked ? 'Yes' : 'No') : 'N/A'}</h6>
                <h6>aToken Amount: {collateral ? collateral.aTokenAmount : 'N/A'}</h6>
            </div>
        </div>
    );
};

export default GetCollateralAssets;
