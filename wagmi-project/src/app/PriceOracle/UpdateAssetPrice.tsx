import React, { useState } from 'react';
import { publicClient, walletClient } from '../../clients';
import { contract } from './PriceOracleAbi'; // Thay đổi đường dẫn tới ABI của bạn
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const UpdateAssetPrice = () => {
  const [assetAddress, setAssetAddress] = useState<string>('');
  const [price, setPrice] = useState<number | string>('');
  const account = useAccount();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!assetAddress || !price) {
      alert('Please provide both asset address and price.');
      return;
    }

    try {
      const { request } = await publicClient.simulateContract({
        abi: contract.abi,
        address: contract.address as Address, 
        functionName: 'updateAssetPrice',
        args: [assetAddress, price],
        account: account.address as Address,
      });

      const hash = await walletClient.writeContract(request);
      console.log('Transaction hash:', hash);
    } catch (error) {
      console.error('Error calling updateAssetPrice:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Update Asset Price</h2>
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor='assetAddress'>Asset Address</label>
          <input
            type='text'
            name='assetAddress'
            value={assetAddress}
            onChange={(e) => setAssetAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor='price'>Price</label>
          <input
            type='number'
            name='price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type='submit'>Update Price</button>
      </form>
    </div>
  );
};

export default UpdateAssetPrice;
