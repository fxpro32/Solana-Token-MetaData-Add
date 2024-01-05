// #####################################################################
// ############### SOLANA TOKEN METADATA CREATOR SCRIPT ################
// #################### Copyright 2024 - FXPRO32 #######################
// #####################################################################
// ######### CREATE TOKEN METADATA DIRECT TO SOLANA MAINNET ############
// #####################################################################
// ################# You are free to use this script####################
// ############## No warranties are implied whatsoever #################
// ######################### GNU3.0 License ############################
// #####################################################################

// initialize
import * as fs from 'fs';
import * as path from 'path';
import { clusterApiUrl, Connection, PublicKey, Keypair } from "@solana/web3.js";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createMetadataAccountV3 } from "@metaplex-foundation/mpl-token-metadata";
import { fromWeb3JsKeypair, fromWeb3JsPublicKey } from "@metaplex-foundation/umi-web3js-adapters";
import { createSignerFromKeypair } from "@metaplex-foundation/umi";
import { base58 } from '@metaplex-foundation/umi/serializers';

const uploadMetadataForToken = async (offChainMetadata: any) => {
    console.log("Starting uploadMetadataForToken");

    const endpoint = clusterApiUrl('mainnet-beta');
    let connection = new Connection(endpoint);
    const umi = createUmi(endpoint);

    const walletPath = path.resolve('/PATH/TO/YOUR/PRIVATE/KEYS/SOLANA/ID.JSON'); // MAKE SURE YOU UPDATE THIS
    const secretKeyString = JSON.parse(fs.readFileSync(walletPath, 'utf8'));
    const secretKey = Uint8Array.from(secretKeyString);
    const web3jsKeyPair = Keypair.fromSecretKey(secretKey);

    console.log("Keypair loaded, public key: ", web3jsKeyPair.publicKey.toString());

    const keypair = fromWeb3JsKeypair(web3jsKeyPair);
    const signer = createSignerFromKeypair(umi, keypair);
    umi.identity = signer;
    umi.payer = signer;

    let CreateMetadataAccountV3Args = {
        mint: fromWeb3JsPublicKey(new PublicKey('YOUR-PUBLIC-KEY-OF-TOKEN')), // MAKE SURE YOU UPDATE THIS
        mintAuthority: signer,
        payer: signer,
        updateAuthority: signer.publicKey,
        data: {
            name: offChainMetadata.name,
            symbol: offChainMetadata.symbol,
            uri: offChainMetadata.uri,
            sellerFeeBasisPoints: 0,
            creators: null,
            collection: null,
            uses: null
        },
        isMutable: false,
        collectionDetails: null,
    };

    console.log("CreateMetadataAccountV3Args prepared", CreateMetadataAccountV3Args);

    try {
        const transaction = await createMetadataAccountV3(umi, CreateMetadataAccountV3Args).buildAndSign(umi);
        console.log("Transaction built", transaction);

        const transactionSignature = await umi.rpc.sendTransaction(transaction);
        console.log("Transaction sent, signature: ", transactionSignature);
    } catch (error) {
        console.error("Error during transaction", error);
    }
}

(async () => {
    const offChainMetadata = {
        name: "NAME-OF-YOUR-TOKEN", // MAKE SURE YOU UPDATE THIS
        symbol: "SYMBOL-OF-YOUR-TOKEN", // MAKE SURE YOU UPDATE THIS
        uri: "URL-OF-YOUR-METADATA-JSON-FILE-UPLOADED-TO-PUBLIC-SITE-SUCH-AS-PINATA" // MAKE SURE YOU UPDATE THIS
    };
    await uploadMetadataForToken(offChainMetadata);
})();
