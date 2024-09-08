import React, { useState } from 'react';
import { publicClient } from '../../clients';
import { contract } from './CollateralManagerAbi'; // Thay thế với tệp ABI thực tế của bạn
import { useAccount } from 'wagmi'; 
import { Address } from 'viem';

const GetPriceOracle = () => {
    const [priceOracleAddress, setPriceOracleAddress] = useState<string | null>(null); 
    const account = useAccount();

    const getPriceOracle = async () => {
        try {
            const priceOracleResult = await publicClient.readContract({
                abi: contract.abi,
                address: contract.address as Address, 
                functionName: 'priceOracle',
                args: [],
            });
            setPriceOracleAddress(priceOracleResult as string); 
        } catch (error) {
            console.error('Error fetching priceOracle:', error);
        }
    }

    return (
        <div className="form-container">
            <h2>Get Price Oracle Address</h2>
            <button type='button' onClick={getPriceOracle}>Get Price Oracle</button>
            <div className="price-oracle">
                <h6>Price Oracle Address: {priceOracleAddress ? priceOracleAddress : 'N/A'}</h6>
            </div>
        </div>
    );
};

export default GetPriceOracle;
