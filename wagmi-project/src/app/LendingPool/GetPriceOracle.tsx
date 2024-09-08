import React, { useState } from 'react';
import { publicClient } from '../../clients'; // Đảm bảo đường dẫn này là chính xác
import { contract } from './LendingPoolAbi'; // Cập nhật theo tên ABI thực tế
import { useAccount } from 'wagmi'; 
import { Address } from 'viem';

const GetPriceOracleAddress = () => {
    const [priceOracleAddress, setPriceOracleAddress] = useState<string | null>(null); 
    const account = useAccount();

    const fetchPriceOracleAddress = async () => {
        try {
            // Gọi hàm priceOracleAddress từ hợp đồng
            const result = await publicClient.readContract({
                abi: contract.abi,
                address: contract.address as Address, 
                functionName: 'priceOracleAddress',
                args: [], // Hàm không nhận tham số
            });
            setPriceOracleAddress(result as string); 
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error fetching price oracle address:', error.message);
                alert('Error occurred: ' + error.message);
            } else {
                console.error('Unexpected error:', error);
                alert('Unexpected error occurred');
            }
        }
    }

    return (
        <div className="form-container">
            <h2>Get Price Oracle Address</h2>
            <button type='button' onClick={fetchPriceOracleAddress}>Get Price Oracle Address</button>
            <div className="address">
                <h6>Price Oracle Address: {priceOracleAddress ? priceOracleAddress : 'N/A'}</h6>
            </div>
        </div>
    );
};

export default GetPriceOracleAddress;
