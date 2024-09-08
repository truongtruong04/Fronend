import React, { useState } from 'react';
import { publicClient } from '../../clients';
import { contract } from './CollateralManagerAbi';
import { useAccount } from 'wagmi'; 
import { Address } from 'viem';
const GetAssetPrice = () => {
    const [price, setPrice] = useState<string | null>(null); 
    const account = useAccount();

    const fetchAssetPrice = async (assetAddress: string) => {
        try {
            const priceResult = await publicClient.readContract({
                abi: contract.abi,
                address: contract.address as Address, 
                functionName: 'getAssetPrice',
                args: [assetAddress],
            });
            // Ép kiểu priceResult từ unknown thành string
            setPrice((priceResult as BigInt).toString()); 
        } catch (error) {
            console.error('Error fetching asset price:', error);
        }
    }

    return (
        <div className="form-container">
            <h2>Get Asset Price</h2>
            <input 
                type="text" 
                placeholder="Enter asset address" 
                onChange={(e) => fetchAssetPrice(e.target.value)}
            />
            <div className="price">
                <h6>Price: {price ? price : 'N/A'}</h6>
            </div>
        </div>
    );
};

export default GetAssetPrice;
