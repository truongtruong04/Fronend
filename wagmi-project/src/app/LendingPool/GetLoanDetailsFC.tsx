import React, { useState } from 'react';
import { publicClient } from '../../clients';
import { contract } from './LendingPoolAbi'; // Update this to your actual ABI file
import { useAccount } from 'wagmi';
import { Address } from 'viem';

interface Collateral {
    assetAddress: string;
    amount: string;
}

interface LoanDetails {
    user: string;
    loanAmount: string;
    interestRate: string;
    repaymentPeriod: string;
    collateral: Collateral;
    startTime: string;
    isApproved: boolean;
    isRejected: boolean;
    dueTime: string;
    liquidationThreshold: string;
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
            const loanResult = await publicClient.readContract({
                abi: contract.abi,
                address: contract.address as Address, 
                functionName: 'loans',
                args: [userAddress],
            });

            // Ensure loanResult is correctly typed as an array
            const [
                user,
                loanAmount,
                interestRate,
                repaymentPeriod,
                collateral,
                startTime,
                isApproved,
                isRejected,
                dueTime,
                liquidationThreshold
            ] = loanResult as [
                string, 
                bigint, 
                bigint, 
                bigint, 
                { assetAddress: string; amount: bigint }, 
                bigint, 
                boolean, 
                boolean, 
                bigint, 
                bigint
            ];

            const formattedDetails: LoanDetails = {
                user,
                loanAmount: loanAmount.toString(),
                interestRate: interestRate.toString(),
                repaymentPeriod: repaymentPeriod.toString(),
                collateral: {
                    assetAddress: collateral.assetAddress,
                    amount: collateral.amount.toString()
                },
                startTime: startTime.toString(),
                isApproved,
                isRejected,
                dueTime: dueTime.toString(),
                liquidationThreshold: liquidationThreshold.toString()
            };

            setLoanDetails(formattedDetails);
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error fetching loan details:', error.message);
                alert('Error occurred: ' + error.message);
            } else {
                console.error('Unexpected error:', error);
                alert('Unexpected error occurred');
            }
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
            {loanDetails && (
                <div className="loan-details">
                    <h3>Loan Details:</h3>
                    <pre>{JSON.stringify(loanDetails, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default GetLoanDetails;
