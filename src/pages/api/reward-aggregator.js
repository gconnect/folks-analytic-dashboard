import {
  getOraclePrices,
  TestnetOracle,
  TestnetPools,
  getRewardsAggregatorInfo,
} from "../../folks-finance-js-sdk";
import { indexerClient} from "../../config";

export default async function rewardValue() {
  const oracle = TestnetOracle;
  let allRewardsInfo = [];
  let totalRewardsValue = 0;
    for (let poolName in TestnetPools) {
      console.log(poolName);
      try {
        let reward = await getRewardsAggregatorInfo(
          indexerClient,
          TestnetPools[poolName].appId
        );
        const oraclePrices = await getOraclePrices(indexerClient, oracle, [
          TestnetPools[poolName].assetId,
        ]);
        let price = oraclePrices.prices[TestnetPools[poolName].assetId].price;
        console.log(price);
        let limit =
        reward.assetsRewards.length && reward.assetsRewards[0].periodRewards[0].limit;
        let value = Math.round(Number(limit * price) / 1e14);
        totalRewardsValue += value;
        allRewardsInfo.push({
          assetId: TestnetPools[poolName].assetId,
          poolName,
          amount: limit,
          value,
        });
        return {totalRewardsValue, allRewardsInfo}
      } catch (e) {
        console.log(e);
      }
    }
}