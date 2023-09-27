# A Smart Contract Based Funding Request Solution attempt Built on Cardano

## Description

This repository houses a decentralized application that utilizes blockchain technology to streamline and secure the process of requesting funding. It aims to eliminate middlemen, lower fees, and enhance transparency throughout the funding process.

## Current Status

The system is capable of creating funding requests by signing transactions on-chain. Service fees are also paid on-chain, and data is sent via HTTPS POST requests to a backend server. This server maintains all the data and tracks the remaining time for each funding request. Donations are instantly transferred to the receiver's wallet, and the system administrator does not hold custody of any donated funds. Instead, the system merely records live donations and makes that information available through the user interface.

## Future Upgrades

The current initial phase relies on virtual machines that run 24/7 and store data on the backend. The entire system's security depends on the trustworthiness of the backend administrator. While the administrator doesn't hold the funds, they could change the receiver address, which could be fraudulent. Future expansions aim to employ smart contracts to manage all data, thereby eliminating the need for a backend operator.