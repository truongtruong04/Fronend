import React, { useState } from 'react';
import { publicClient } from '../../clients';
import { contract } from './BorrowerAbi'; // Đảm bảo đường dẫn ABI chính xác
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const GetUserLoan = () => {
    const [loanAmount, setLoanAmount] = useState<string | null>(null); 
    const account = useAccount();
    const [loanIndex, setLoanIndex] = useState<string>(''); 

    const getUserLoan = async () => {
        try {
            const loanResult = await publicClient.readContract({
                abi: contract.abi,
                address: contract.address as Address, 
                functionName: 'userLoans',
                args: [account.address as Address, BigInt(loanIndex)], // Chuyển loanIndex thành BigInt
            });

            // Thêm kiểu chuyển đổi cho loanResult
            const loanAmountBigInt = loanResult as bigint; // Xác định loanResult là kiểu bigint
            setLoanAmount(loanAmountBigInt.toString()); // Hiển thị kết quả dưới dạng chuỗi
        } catch (error) {
            console.error('Error fetching user loan:', error);
        }
    }

    return (
        <div className="form-container">
            <h2>Get User Loan</h2>
            <label htmlFor='loanIndex'>Loan Index</label>
            <input
                type='text'
                name='loanIndex'
                value={loanIndex}
                onChange={(e) => setLoanIndex(e.target.value)}
            />
            <button type='button' onClick={getUserLoan}>Get Loan</button>
            <div className="loan-amount">
                <h6>Loan Amount: {loanAmount ? loanAmount : 'N/A'}</h6>
            </div>
        </div>
    );
};

export default GetUserLoan;
