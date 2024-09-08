import React, { useState } from 'react';
import { publicClient, walletClient } from '../../clients'; // Đảm bảo đường dẫn chính xác
import { contract } from './LendingPoolAbi'; // Cập nhật theo tên ABI thực tế
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const RequestLoan = () => {
  const [amount, setAmount] = useState<string>(''); // Số lượng vay
  const [interestRate, setInterestRate] = useState<string>(''); // Lãi suất
  const [repaymentPeriod, setRepaymentPeriod] = useState<string>(''); // Thời hạn trả nợ
  const [collateralAsset, setCollateralAsset] = useState<string>(''); // Địa chỉ tài sản thế chấp
  const [collateralAmount, setCollateralAmount] = useState<string>(''); // Số lượng tài sản thế chấp
  const account = useAccount();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!amount || !interestRate || !repaymentPeriod || !collateralAsset || !collateralAmount) {
      alert('Please provide all required fields.');
      return;
    }

    try {
      const { request } = await publicClient.simulateContract({
        abi: contract.abi,
        address: contract.address as Address, 
        functionName: 'requestLoan',
        args: [
          BigInt(amount), 
          BigInt(interestRate),
          BigInt(repaymentPeriod),
          collateralAsset as Address,
          BigInt(collateralAmount),
        ],
        account: account.address as Address,
      });

      const hash = await walletClient.writeContract(request);
      console.log('Transaction hash:', hash);
    } catch (error) {
      console.error('Error calling requestLoan:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Request Loan</h2>
      <form onSubmit={submit}>
        <label htmlFor='amount'>Loan Amount</label>
        <input
          type='text'
          name='amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)} // Cập nhật số lượng vay
        />

        <label htmlFor='interestRate'>Interest Rate</label>
        <input
          type='text'
          name='interestRate'
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)} // Cập nhật lãi suất
        />

        <label htmlFor='repaymentPeriod'>Repayment Period</label>
        <input
          type='text'
          name='repaymentPeriod'
          value={repaymentPeriod}
          onChange={(e) => setRepaymentPeriod(e.target.value)} // Cập nhật thời hạn trả nợ
        />

        <label htmlFor='collateralAsset'>Collateral Asset Address</label>
        <input
          type='text'
          name='collateralAsset'
          value={collateralAsset}
          onChange={(e) => setCollateralAsset(e.target.value)} // Cập nhật địa chỉ tài sản thế chấp
        />

        <label htmlFor='collateralAmount'>Collateral Amount</label>
        <input
          type='text'
          name='collateralAmount'
          value={collateralAmount}
          onChange={(e) => setCollateralAmount(e.target.value)} // Cập nhật số lượng tài sản thế chấp
        />

        <button type='submit'>Request Loan</button>
      </form>
    </div>
  );
};

export default RequestLoan;
