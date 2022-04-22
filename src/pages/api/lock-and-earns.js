import  {
  getLockAndEarns,
  TestnetPools,
  
} from '../../folks-finance-js-sdk/dist';
import { indexerClient} from "../../config";

export default async function getLockEarn() {
  let allPoolsInfo = [];
  try{
    for (let poolName in TestnetPools) {
      const tokenPair = TestnetPools;
      const { pool } = tokenPair;
      // console.log(poolName);
      let info = await getLockAndEarns(indexerClient, pool);
      allPoolsInfo.push({ symbol: pairName, ...info });
    }
    console.log(allPoolsInfo)
    return allPoolsInfo
  }catch(err){
    console.log(err)
  }
} 