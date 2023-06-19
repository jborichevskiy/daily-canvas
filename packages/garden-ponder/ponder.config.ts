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
      address: "0x7fA3bee4a3000A06D5a542471B17e6565BE6f297",
      startBlock: 8976809,
    },
  ],
};
