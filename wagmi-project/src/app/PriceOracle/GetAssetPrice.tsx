import React, { useState } from 'react';
import { publicClient } from '../../clients'; // Client để giao tiếp với blockchain
import { contract } from './PriceOracleAbi'; // ABI của contract
import { useAccount } from 'wagmi'; // Hook để lấy thông tin tài khoản
import { Address } from 'viem'; // Thư viện xử lý địa chỉ
const GetAssetPrice = () => {
    const [assetPrice, setAssetPrice] = useState<string | null>(null); // State để lưu giá tài sản
    const [assetAddress, setAssetAddress] = useState<string>(''); // State để lưu địa chỉ tài sản
    const account = useAccount(); // Lấy thông tin tài khoản

    // Hàm để lấy giá tài sản
    const getAssetPrice = async () => {
        try {
            // Đọc dữ liệu từ contract
            const priceResult = await publicClient.readContract({
                abi: contract.abi,
                address: contract.address as Address, 
                functionName: 'getAssetPrice', // Tên hàm trong ABI
                args: [assetAddress], // Địa chỉ tài sản cần truyền vào
            });

            // Chuyển đổi kết quả thành chuỗi
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
                value={assetAddress}
                onChange={(e) => setAssetAddress(e.target.value)} // Cập nhật địa chỉ tài sản khi người dùng nhập
            />
            <button type="button" onClick={getAssetPrice}>Get Asset Price</button>
            <div className="asset-price">
                <h6>Asset Price: {assetPrice ? assetPrice : 'N/A'}</h6>
            </div>
        </div>
    );
};

export default GetAssetPrice;