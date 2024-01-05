HOW TO SETUP AND RUN SCRIPTS - TO ADD METADATA TO SOLANA TOKEN VIA METAPLEX

### Note that I made this script because of 3 reasons:
- Solana / Metaplex keep changing the Metadata versions/processes and it has become a nightmare to create metadata for your Solana Token
- Everytime I tried to find a 'how to' online, it either didn't work (for whatever reason) or it was using the older version updateV1 or updateV2
- Everybody I asked, had no idea
- No support from Solana or Metaplex, especially through their documentation which is Vague at best
- There is a total lack of information in the metaplex documentation which prohibits a dev to efficiently develop code
- There is no help ANYWHERE online so it was left up to me and GPT4 and google to find a solution :-)

#############################################################################################################
#################### Follow these instructions to implement the metadata via metaplex #######################
# Note that it is assumed:                                                                                  #
# a) You have already created your token                                                                    #
# b) You have added a number of tokens to the account                                                       #
# c) You have at least 0.01 SOL in your primary Solana Account that you use to create the tokens            #
# d) You have a general knowledge on how to navigate through Linux CLI and Create Solana Tokens             #
# e) You know that I do not offer support for this, its provided to you AS IS with no warranties whatsoever #
#############################################################################################################

DO THESE STEPS IN SEQUENCE:

1/ Make folder in /home directory (within Linux) in the name of your Token
2/ Open a terminal in the folder you just made
3/ Issue the following commands via terminal / cli to install required apps:
# yarn init --yes (then okay the install of yarn)
# npm init --yes (allow it to write to the pakage.json file)
# tsc -init --resolveJsonModule true (Creates a new tsconfig.json)
# sudo npm install -g typescript
# npm install @metaplex-foundation/js
# npm install @solana/web3.js @metaplex-foundation/mpl-token-metadata @metaplex-foundation/umi @metaplex-foundation/umi-bundle-defaults
4/ Put these 3 files in a the folder you just made, overwriting the 'tsconfig.json' file
5/ Then Issue the following commands:
# tsc -p tsconfig.json
# tsc mpl_metadata.ts
# node mpl_metadata.js

6/ If all goes well, you should have no errors and your Solana Token you created should now have metadata displayed on Solscan.io
7/ Note that when you run the last command node mpl_metadata.js, the script has a logging feature which will output lots of information, including the private keys.
Make sure you keep these keys private and do not show anyone these keys.
Note that if there is an error after you run the mpl_metadata.js command, it will be listed together with the output.
Usually errors are due to either (a) Not enough balance in your primary Solana wallet OR (b) you are using the wrong Public Key for the Token you created and want to update the metadata to.

ENJOY !

End
