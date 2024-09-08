import React, { useState } from 'react';
import { publicClient } from '../../clients'; // Client để giao tiếp với blockchain
import { contract } from './PriceOracleAbi'; // ABI của contract
import { useAccount } from 'wagmi'; // Hook để lấy thông tin tài khoản
import { Address } from 'viem'; // Thư viện xử lý địa chỉ

const GetAssetPrice = () => {
    const [assetPrice, setAssetPrice] = useState<string | null>(null); // State để lưu giá tài sản
    const account = useAccount(); // Lấy thông tin tài khoản

    // Hàm để lấy giá tài sản
    const getAssetPrice = async (address: string) => {
        try {
            // Đọc dữ liệu từ contract
            const priceResult = await publicClient.readContract({
                abi: contract.abi,
                address: contract.address as Address, 
                functionName: 'assetPrices', // Tên hàm trong ABI
                args: [address], // Địa chỉ tài sản cần truyền vào
            });

            // Chuyển đổi kết quả thành kiểu chuỗi
            setAssetPrice((priceResult as bigint).toString()); // Chuyển kiểu 'unknown' sang 'bigint' rồi sang 'string'
        } catch (error) {
            console.error('Error fetching asset price:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Get Asset Price</h2>
            <input
                type="text"
                placeholder="Enter asset address"
                onBlur={(e) => getAssetPrice(e.target.value)} // Lấy giá trị sau khi người dùng nhập
            />
            <div className="asset-price">
                <h6>Asset Price: {assetPrice ? assetPrice : 'N/A'}</h6>
            </div>
        </div>
    );
};

export default GetAssetPrice;