import  {
  getTokenPairInfo,
  TestnetTokenPairs,
} from '../../folks-finance-js-sdk';
import { indexerClient} from "../../config";

export default async function pairs() {
let allPairs = [];
try{
  for (let pairName in TestnetTokenPairs) {
    const tokenPair = TestnetTokenPairs[pairName];
    const tokenPairInfo = await getTokenPairInfo(indexerClient, tokenPair);
    allPairs.push({
      symbol: pairName,
      borrowSymbol: pairName.split("-")[0],
      collateralSymbol: pairName.split("-")[1],
      ...tokenPair,
      ...tokenPairInfo,
    });
    }
    console.log(allPairs)
    return allPairs
    }catch(err){
      console.log(err)
  }
}
