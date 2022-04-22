import  {
  getPoolInfo,
  TestnetPools,
} from '../../folks-finance-js-sdk/src';
import { indexerClient} from "../../config";

export default async function getPool() {
  let allPoolsInfo = [];
  try{
    for (let poolName in TestnetPools) {
      console.log(poolName);
      let info = await getPoolInfo(indexerClient, TestnetPools[poolName]);
      allPoolsInfo.push({ symbol: poolName, ...info });
    }
    console.log(allPoolsInfo)
    return allPoolsInfo
  }catch(err){
    console.log(err)
  }
}  
