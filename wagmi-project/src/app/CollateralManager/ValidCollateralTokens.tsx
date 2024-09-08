import React, { useState } from 'react';
import { publicClient } from '../../clients';
import { contract } from './CollateralManagerAbi'; // Đảm bảo ABI của bạn được import đúng cách
import { useAccount } from 'wagmi'; 
import { Address } from 'viem';

const CheckValidCollateral = () => {
    const [isValid, setIsValid] = useState<boolean | null>(null); 
    const [inputAddress, setInputAddress] = useState<string>(''); // Địa chỉ cần kiểm tra
    const account = useAccount(); // Lấy thông tin người dùng hiện tại

    const checkCollateral = async () => {
        try {
            const result = await publicClient.readContract({
                abi: contract.abi, // ABI chứa hàm validCollateralTokens
                address: contract.address as Address, // Địa chỉ contract
                functionName: 'validCollateralTokens',
                args: [inputAddress], // Truyền địa chỉ của tài sản cần kiểm tra
            });
            setIsValid(result as boolean); // Kết quả trả về là boolean
        } catch (error) {
            console.error('Error checking valid collateral:', error);
            setIsValid(null);
        }
    }

    return (
        <div className="form-container">
            <h2>Check Valid Collateral Token</h2>
            <input
                type="text"
                value={inputAddress}
                onChange={(e) => setInputAddress(e.target.value)}
                placeholder="Enter asset address"
            />
            <button type='button' onClick={checkCollateral}>Check Collateral</button>
            <div className="result">
                <h6>Is Valid Collateral: {isValid !== null ? (isValid ? 'Yes' : 'No') : 'N/A'}</h6>
            </div>
        </div>
    );
};

export default CheckValidCollateral;
