import React, { useState } from 'react';
import { publicClient } from '../../clients'; // Đảm bảo đường dẫn chính xác
import { contract } from './BorrowerAbi'; // Đảm bảo đường dẫn chính xác
import { useAccount } from 'wagmi'; 
import { Address } from 'viem';

const GetPriceOracle = () => {
    const [priceOracle, setPriceOracle] = useState<string | null>(null); 
    const account = useAccount();

    const getPriceOracle = async () => {
        try {
            const priceOracleResult = await publicClient.readContract({
                abi: contract.abi,
                address: contract.address as Address, 
                functionName: 'priceOracle',
                args: [],
            });
            setPriceOracle(priceOracleResult as string); 
        } catch (error) {
            console.error('Error fetching priceOracle:', error);
        }
    }

    return (
        <div className="form-container">
            <h2>Get Price Oracle</h2>
            <button type='button' onClick={getPriceOracle}>Get Price Oracle</button>
            <div className="price-oracle">
                <h6>Price Oracle: {priceOracle ? priceOracle : 'N/A'}</h6>
            </div>
        </div>
    );
};

export default GetPriceOracle;
