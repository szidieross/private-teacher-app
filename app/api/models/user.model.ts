export interface UserModel {
    userId: number;
    username: string;
    password: string;
    email: string;
    phone: string;
    createdAt: string;
    firstName: string;
    lastName: string;
    role: string;
}

// export interface TokensRequestModel {
//   chainId: number;
//   tokenAddress: string;
//   ownerAddress: string;
// }

// export interface CollectionInfo {
//   collectionId: number;
//   collectionName: string;
//   chainId: number;
//   smartContractAddress: string;
// }