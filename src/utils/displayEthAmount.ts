import { BigNumberish, ethers } from "ethers";

export function displayEthAmount(value: BigNumberish, maxDecimals = 4) {
  const asEtherString = ethers.utils.formatEther(value);
  const formatter = new Intl.NumberFormat("en-GB", {
    maximumSignificantDigits: maxDecimals,
  });
  return formatter.format(parseFloat(asEtherString));
}
