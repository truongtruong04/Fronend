import React, { useState } from 'react';
import { publicClient } from '../../clients';
import { contract } from './PriceOracleAbi'; // Giả định rằng bạn đã định nghĩa ABI của contract ở đây
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const GetLiquidationThreshold = () => {
    const [threshold, setThreshold] = useState<number | null>(null); 
    const [assetAddress, setAssetAddress] = useState<string>(''); // Input address từ người dùng
    const account = useAccount();

    const getLiquidationThreshold = async () => {
        try {
            const thresholdResult = await publicClient.readContract({
                abi: contract.abi,
                address: contract.address as Address, 
                functionName: 'getLiquidationThreshold',
                args: [assetAddress], // Truyền địa chỉ tài sản vào args
            });
            setThreshold(thresholdResult as number); 
        } catch (error) {
            console.error('Error fetching liquidation threshold:', error);
        }
    }

    return (
        <div className="form-container">
            <h2>Get Liquidation Threshold</h2>
            <input
                type="text"
                value={assetAddress}
                onChange={(e) => setAssetAddress(e.target.value)}
                placeholder="Enter asset address"
            />
            <button type='button' onClick={getLiquidationThreshold}>
                Get Threshold
            </button>
            <div className="threshold">
                <h6>Threshold: {threshold !== null ? threshold : 'N/A'}</h6>
            </div>
        </div>
    );
};

export default GetLiquidationThreshold;
