"use client";

import "./globals.css";
import Script from "next/script";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// <------------- rainbow kit imports ------------->
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { filecoinHyperspace, gnosis, polygonMumbai, scrollTestnet, optimismGoerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

// <-------------  setting up rainbow kit ------------->
const { chains, provider } = configureChains(
  [filecoinHyperspace, gnosis, polygonMumbai, scrollTestnet, optimismGoerli],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  connectors,
  provider,
});

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <link
          href='https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.4/flowbite.min.css'
          rel='stylesheet'
        />
      </head>
      <body>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            coolMode
            chains={chains}
            theme={darkTheme({
              accentColor: "#E09F1A",
              borderRadius: "large",
              fontStack: "system",
            })}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {children}
            </LocalizationProvider>
          </RainbowKitProvider>
        </WagmiConfig>

        <Script src='./TW-ELEMENTS-PATH/dist/js/index.min.js'></Script>
      </body>
    </html>
  );
}
