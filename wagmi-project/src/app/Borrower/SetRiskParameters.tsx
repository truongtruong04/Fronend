import React, { useState } from 'react';
import { publicClient, walletClient } from '../../clients';
import { contract } from './BorrowerAbi'; // Đảm bảo đường dẫn chính xác
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const SetRiskParameters = () => {
  const [assetAddress, setAssetAddress] = useState<string>('');
  const [loanRate, setLoanRate] = useState<string>(''); 
  const account = useAccount();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!assetAddress || !loanRate) {
      alert('Please provide both asset address and loan rate.');
      return;
    }

    try {
      const { request } = await publicClient.simulateContract({
        abi: contract.abi,
        address: contract.address as Address, 
        functionName: 'setRiskParameters',
        args: [assetAddress, BigInt(loanRate)],  // Chuyển loanRate thành BigInt
        account: account.address as Address,
      });

      const hash = await walletClient.writeContract(request);
      console.log('Transaction hash:', hash);
    } catch (error) {
      console.error('Error calling setRiskParameters:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Set Risk Parameters</h2>
      <form onSubmit={submit}>
        <label htmlFor='assetAddress'>Asset Address</label>
        <input
          type='text'
          name='assetAddress'
          value={assetAddress}
          onChange={(e) => setAssetAddress(e.target.value)}
        />

        <label htmlFor='loanRate'>Loan Rate</label>
        <input
          type='text'
          name='loanRate'
          value={loanRate}
          onChange={(e) => setLoanRate(e.target.value)}
        />

        <button type='submit'>Set Risk Parameters</button>
      </form>
    </div>
  );
};

export default SetRiskParameters;
