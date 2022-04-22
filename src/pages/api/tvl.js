import {
  getPoolInfo,
  TestnetPools,
  TestnetOracle,
  getOraclePrices,
} from "../../folks-finance-js-sdk";
import { indexerClient } from "../../config";

export default async function totalValueLocked() {
  const oracle = TestnetOracle;
  let tvl = 0;
  let tvd = 0;
  let tvb = 0;
  let allPoolsInfo = [];
  try{
    for (let poolName in TestnetPools) {
      let info = await getPoolInfo(indexerClient, TestnetPools[poolName]);
      const oraclePrices = await getOraclePrices(indexerClient, oracle, [
        TestnetPools[poolName].assetId,
      ]);
      let price = oraclePrices.prices[TestnetPools[poolName].assetId].price;
      let totalDepositsValue = Math.round(
        Number(info.totalDeposits * price) / 1e14
      );
      let totalBorrowsValue = Math.round(
        Number(info.totalBorrows * price) / 1e14
      );
      let totalLockedValue = totalDepositsValue - totalBorrowsValue;
      let totalLocked = Number(info.totalDeposits - info.totalBorrows) / 1e6;
      tvl += totalDepositsValue - totalBorrowsValue;
      tvd += totalDepositsValue;
      tvb += totalBorrowsValue;
      allPoolsInfo.push({
        symbol: poolName,
        price,
        totalDepositsValue,
        totalBorrowsValue,
        totalLockedValue,
        totalLocked,
        ...info,
      });
    } 
    return { tvl, tvd, tvb, pools: [...allPoolsInfo] }
  }catch(err){
    console.log(err)
  }
}