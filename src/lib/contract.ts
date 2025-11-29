import { Abi } from "viem";

export const paymentsAddress = "0xA97Cb465cf77b1f31a9b554491451cc94871E0A1" as const;

export const paymentsAbi: Abi = [
  {
    "type": "function",
    "name": "pay",
    "stateMutability": "payable",
    "inputs": [{ "name": "merchant", "type": "address" }],
    "outputs": []
  },
  {
    "type": "event",
    "name": "PaymentReceived",
    "inputs": [
      { "indexed": true, "name": "merchant", "type": "address" },
      { "indexed": true, "name": "payer", "type": "address" },
      { "indexed": false, "name": "amount", "type": "uint256" },
      { "indexed": false, "name": "timestamp", "type": "uint256" }
    ]
  }
];

export const merchantAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e" as const;

