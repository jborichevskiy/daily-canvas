import type { PonderConfig } from "@ponder/core";

export const config: PonderConfig = {
  networks: [
    { name: "goerli", chainId: 5, rpcUrl: process.env.PONDER_RPC_URL_5 },
  ],
  contracts: [
    {
      name: "Garden",
      network: "goerli",
      abi: "./abis/Garden.json",
      address: "0x4cBFE96932855727Ae9bD6CCcF94beb366299249",
      startBlock: 9240228,
    },
  ],
};
