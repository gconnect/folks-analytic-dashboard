import  {
  getLockAndEarnInfo,
  TestnetPools,
} from '../../folks-finance-js-sdk';
import { indexerClient} from "../../config";

export default async function lockEarn() {
  let allPoolsInfo = [];
  try{
    for (let poolName in TestnetPools) {
      console.log(poolName);
      let info = await getLockAndEarnInfo(indexerClient, TestnetPools[poolName].appId);
      allPoolsInfo.push({ symbol: poolName, ...info });
    }
    console.log(allPoolsInfo)
    return allPoolsInfo
  }catch(err){
    console.log(err)
  }
} 