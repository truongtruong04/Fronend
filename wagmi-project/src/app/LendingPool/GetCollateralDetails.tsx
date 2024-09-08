import React, { useState } from 'react';
import { publicClient } from '../../clients';
import { contract } from './LendingPoolAbi';
import { useAccount } from 'wagmi';
import { Address } from 'viem';

const GetCollateralDetails = () => {
  const [collateral, setCollateral] = useState<{ assetAddress: string, amount: number }[]>([]);
  const [userAddress, setUserAddress] = useState<string>('');
  const account = useAccount();

  const getCollateralDetails = async () => {
    if (!userAddress) {
      alert('Please provide a user address.');
      return;
    }

    try {
      const collateralResult = await publicClient.readContract({
        abi: contract.abi,
        address: contract.address as Address,
        functionName: 'getCollateralDetails',
        args: [userAddress],
      });

      // collateralResult should be an array of objects with assetAddress and amount
      setCollateral(collateralResult as { assetAddress: string, amount: number }[]);
    } catch (error) {
      console.error('Error fetching collateral details:', error);
    }
  }

  return (
    <div className="form-container">
      <h2>Get Collateral Details</h2>
      <form onSubmit={(e) => { e.preventDefault(); getCollateralDetails(); }}>
        <label htmlFor='userAddress'>User Address</label>
        <input
          type='text'
          name='userAddress'
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        />
        <button type='submit'>Get Collateral</button>
      </form>
      <div className="collateral">
        <h6>Collateral Details:</h6>
        <ul>
          {collateral.length > 0 ? (
            collateral.map((item, index) => (
              <li key={index}>
                <strong>Asset Address:</strong> {item.assetAddress} <br />
                <strong>Amount:</strong> {item.amount.toString()}
              </li>
            ))
          ) : (
            <li>No collateral details available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default GetCollateralDetails;
