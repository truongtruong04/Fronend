import React, { useState } from 'react';
import { publicClient } from '../../clients';
import { contract } from './LendingPoolAbi'; // Đảm bảo rằng bạn đã cấu hình đúng ABI
import { useAccount } from 'wagmi'; 
import { Address } from 'viem';

// Định nghĩa kiểu dữ liệu cho loan details
interface LoanDetails {
    loanAmount: number;
    interestRate: number;
    repaymentPeriod: number;
    collateralAsset: string;
    collateralAmount: number;
    startTime: number;
    isApproved: boolean;
    isRejected: boolean;
}

const GetLoanDetails = () => {
    const [loanDetails, setLoanDetails] = useState<LoanDetails | null>(null);
    const [userAddress, setUserAddress] = useState<string>('');
    const account = useAccount();

    const getLoanDetails = async () => {
        if (!userAddress) {
            alert('Please provide a user address.');
            return;
        }

        try {
            // Thực hiện gọi hợp đồng
            const result = await publicClient.readContract({
                abi: contract.abi,
                address: contract.address as Address,
                functionName: 'getLoanDetails',
                args: [userAddress],
            });

            // Xác định kiểu dữ liệu trả về
            const [loanAmount, interestRate, repaymentPeriod, collateralAsset, collateralAmount, startTime, isApproved, isRejected] = result as [
                string, // loanAmount
                string, // interestRate
                string, // repaymentPeriod
                string, // collateralAsset
                string, // collateralAmount
                string, // startTime
                boolean, // isApproved
                boolean  // isRejected
            ];

            // Chuyển đổi kiểu dữ liệu
            const loanResult: LoanDetails = {
                loanAmount: Number(loanAmount),
                interestRate: Number(interestRate),
                repaymentPeriod: Number(repaymentPeriod),
                collateralAsset: collateralAsset as string,
                collateralAmount: Number(collateralAmount),
                startTime: Number(startTime),
                isApproved: isApproved,
                isRejected: isRejected,
            };

            setLoanDetails(loanResult);
        } catch (error) {
            console.error('Error fetching loan details:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Get Loan Details</h2>
            <form onSubmit={(e) => { e.preventDefault(); getLoanDetails(); }}>
                <label htmlFor='userAddress'>User Address</label>
                <input
                    type='text'
                    name='userAddress'
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                />
                <button type='submit'>Get Loan Details</button>
            </form>
            <div className="loan-details">
                <h6>Loan Details:</h6>
                {loanDetails ? (
                    <ul>
                        <li><strong>Loan Amount:</strong> {loanDetails.loanAmount.toString()}</li>
                        <li><strong>Interest Rate:</strong> {loanDetails.interestRate.toString()}</li>
                        <li><strong>Repayment Period:</strong> {loanDetails.repaymentPeriod.toString()}</li>
                        <li><strong>Collateral Asset:</strong> {loanDetails.collateralAsset}</li>
                        <li><strong>Collateral Amount:</strong> {loanDetails.collateralAmount.toString()}</li>
                        <li><strong>Start Time:</strong> {new Date(loanDetails.startTime * 1000).toLocaleString()}</li>
                        <li><strong>Approved:</strong> {loanDetails.isApproved ? 'Yes' : 'No'}</li>
                        <li><strong>Rejected:</strong> {loanDetails.isRejected ? 'Yes' : 'No'}</li>
                    </ul>
                ) : (
                    <p>No loan details available</p>
                )}
            </div>
        </div>
    );
};

export default GetLoanDetails;
