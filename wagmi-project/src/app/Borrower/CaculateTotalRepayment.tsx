import React, { useState } from 'react';
import { publicClient } from '../../clients';
import { contract } from './BorrowerAbi';
import { useAccount } from 'wagmi'; 
import { Address } from 'viem';


const CalculateTotalRepayment = () => {
    const [totalRepayment, setTotalRepayment] = useState<number | null>(null); 
    const [loanAmount, setLoanAmount] = useState<string>('');
    const [interestRate, setInterestRate] = useState<string>('');
    const account = useAccount();

    const calculateTotalRepayment = async () => {
        try {
            const result = await publicClient.readContract({
                abi: contract.abi,
                address: contract.address as Address, 
                functionName: 'calculateTotalRepayment',
                args: [loanAmount, interestRate],
            });
            setTotalRepayment(result as number); 
        } catch (error) {
            console.error('Error calculating total repayment:', error);
        }
    }

    return (
        <div className="form-container">
            <h2>Calculate Total Repayment</h2>
            <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="Enter loan amount"
            />
            <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="Enter interest rate"
            />
            <button type='button' onClick={calculateTotalRepayment}>Calculate</button>
            <div className="total-repayment">
                <h6>Total Repayment: {totalRepayment !== null ? totalRepayment : 'N/A'}</h6>
            </div>
        </div>
    );
};

export default CalculateTotalRepayment;
