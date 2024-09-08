import React, { useState } from 'react';
import { publicClient, walletClient } from '../../clients';
import { contract } from './BorrowerAbi'; // Điều chỉnh đường dẫn và tên ABI nếu cần
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const CreateLoan = () => {
  const [amount, setAmount] = useState<number>(0);
  const [collateralAsset, setCollateralAsset] = useState<string>('');
  const [collateralAmount, setCollateralAmount] = useState<number>(0);
  const account = useAccount();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (amount <= 0 || !collateralAsset || collateralAmount <= 0) {
      alert('Please provide valid inputs for loan amount, collateral asset, and collateral amount.');
      return;
    }

    try {
      const { request } = await publicClient.simulateContract({
        abi: contract.abi,
        address: contract.address as Address,
        functionName: 'createLoan',
        args: [amount, collateralAsset, collateralAmount],
        account: account.address as Address,
      });

      const hash = await walletClient.writeContract(request);
      console.log('Transaction hash:', hash);
    } catch (error) {
      console.error('Error calling createLoan:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Create Loan</h2>
      <form onSubmit={submit}>
        <label htmlFor='amount'>Loan Amount</label>
        <input
          type='number'
          name='amount'
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          min="0"
        />

        <label htmlFor='collateralAsset'>Collateral Asset Address</label>
        <input
          type='text'
          name='collateralAsset'
          value={collateralAsset}
          onChange={(e) => setCollateralAsset(e.target.value)}
        />

        <label htmlFor='collateralAmount'>Collateral Amount</label>
        <input
          type='number'
          name='collateralAmount'
          value={collateralAmount}
          onChange={(e) => setCollateralAmount(Number(e.target.value))}
          min="0"
        />

        <button type='submit'>Create Loan</button>
      </form>
    </div>
  );
};

export default CreateLoan;
