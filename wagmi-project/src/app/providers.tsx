'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'
import { type State, WagmiProvider } from 'wagmi'
import GetAssetPrice from './PriceOracle/AssetPrices'
import GetAssetPrices from './PriceOracle/GetAssetPrice'
import GetLiquidationThreshold from './PriceOracle/GetLiquidationThreshold'
import GetLiquidationThresholds from './PriceOracle/LiquidationThresholds'
import GetOwner from './PriceOracle/GetOwner'
import SetDefaultLiquidationThreshold from './PriceOracle/SetDefaultLiquidationThreshold'
import UpdateAssetPrice from './PriceOracle/UpdateAssetPrice'
import UpdateLiquidationThreshold from './PriceOracle/UpdateLiquidationThreshold'
import  AddCollateral from './CollateralManager/AddCollateral'
import AddCollateralFee from './CollateralManager/AddCollateralFee'
import GetAdmin from './CollateralManager/GetAdmin'
import GetCollateralAssets from './CollateralManager/CollateralAssets'
import GetassetPrice from './CollateralManager/GetassetPrice'
import LockCollateral from './CollateralManager/LockCollateral'
import GetMockToken from './CollateralManager/GetMockToken'
import GetPriceOracle from './CollateralManager/GetPriceOracle'
import RemoveCollateral from './CollateralManager/RemoveCollateral'
import GetRemoveCollateralFee from './CollateralManager/GetRemoveCollateralFee'
import SetContractAddress from './CollateralManager/SetContractAddress'
import SetFee from './CollateralManager/SetFee'
import SetValidCollateral from './CollateralManager/SetValidCollateral'
import UnlockCollateral from './CollateralManager/UnLockCollateral'
import UpDateAssetPrice from './PriceOracle/UpdateAssetPrice'
import ValidCollateralTokens from './CollateralManager/ValidCollateralTokens'
import Getadmins from './Borrower/Getadmin'
import CalculateInterests from './Borrower/CaculateLoanHealthIndex'
import CaculateTotalInterest from './Borrower/CaculateTotalRepayment'
import CollateralManager from './Borrower/CollateralManager'
import CreateLoan from './Borrower/CreateLoan'
import GetAllLoans from './Borrower/GetAllLoanIDs'
import GetLendingPool from './Borrower/GetLendingPool'
import LiquidateLoan from './Borrower/LiquidateLoan'
import GetPriceOracles from './Borrower/GetPriceOralce'
import RepayLoan from './Borrower/RepayLoan'
import GetriskParameters from './Borrower/GetriskParameters'
import GetSeviceFee from './Borrower/GetSeviceFee'
import SetContractAddressBR from './Borrower/SetContractAddress'
import SetRiskParameters from './Borrower/SetRiskParameters'
import SetServiceFee from './Borrower/SetSServiceFee'
import GetUser from './Borrower/GetuserLoan'
import AddReserveToken from './LendingPool/AddReserveToken'
import GetAdminLD from './LendingPool/GetAdminLD'
import ApproveLoan from './LendingPool/ApprovedLoan'
import CalculateInterest from './LendingPool/CaculaterInterest'
import DepositFunds from './LendingPool/Deposit'
import GetAllReserveTokens from './LendingPool/GetAllReservesTokens'
import GetCollateralDetails from './LendingPool/GetCollateralDetails'
import GetLoanDetails from './LendingPool/GetLoanDetails'
import Liquidate from './LendingPool/Liquidate'
import GetLoanDetailsFC from './LendingPool/GetLoanDetails'
import GetPriceOracleAddress from './LendingPool/GetPriceOracle'
import RejectLoan from './LendingPool/RejectLoan'
import RepayLoanLD from './LendingPool/RepayLoan'
import RequestLoan from './LendingPool/RequestLoan'
import GetReserveTokens from './LendingPool/GetReserTokens'
import GetServiceFee from './LendingPool/GetSeviceFee'
import SetMockTokenAddress from './LendingPool/SetMockTokenAddress'
import SetPriceOracle from './LendingPool/SetPriceOracle'
import SetToken from './LendingPool/SetToken'
import Withdraw from './LendingPool/Withdraw'

import { getConfig } from '@/wagmi'


export function Providers(props: {
  children: ReactNode
  initialState?: State
}) {
  const [config] = useState(() => getConfig())
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={config} initialState={props.initialState}>
      <QueryClientProvider client={queryClient}>
        {props.children}
       <GetAssetPrice />
       <GetAssetPrices />
        <GetLiquidationThreshold /> 
        <GetLiquidationThresholds />
        <GetOwner />
        <SetDefaultLiquidationThreshold />
        <UpdateAssetPrice />
        <UpdateLiquidationThreshold />
        <AddCollateral /> 
        <AddCollateralFee />
        <GetAdmin />  
        <GetCollateralAssets />
        <GetassetPrice />
        <LockCollateral />
        <GetMockToken />
        <GetPriceOracle />
        <RemoveCollateral />
        <GetRemoveCollateralFee />
        <SetContractAddress />
        <SetFee />
        <SetValidCollateral />
        <UnlockCollateral />
        <UpDateAssetPrice />
        <ValidCollateralTokens />
        <Getadmins />
        <CalculateInterests />
        <CaculateTotalInterest />
        <CollateralManager />
        <CreateLoan />
        <GetAllLoans />
        <GetLendingPool />
        <LiquidateLoan />
        <GetPriceOracles />
        <RepayLoan />
        <GetriskParameters />
        <GetSeviceFee />
        <SetContractAddressBR />
        <SetRiskParameters />
        <SetServiceFee />
        <GetUser />
        <AddReserveToken />
        <GetAdminLD />
        <ApproveLoan />
        <CalculateInterest />
        <DepositFunds />
        <GetAllReserveTokens />
        <GetCollateralDetails />
        <GetLoanDetails />
        <Liquidate />
        <GetLoanDetailsFC />
        <GetPriceOracleAddress />
        <RejectLoan />
        <RepayLoanLD />
        <RequestLoan />
        <GetReserveTokens />
        <GetServiceFee />
        <SetMockTokenAddress />
        <SetPriceOracle />
        <SetToken />
        <Withdraw />

        </QueryClientProvider>
    </WagmiProvider>
  )
}
