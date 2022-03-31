import { AvaxLogo, PolygonLogo, BSCLogo, ETHLogo } from "../components/Common/Logos";

export const LIMIT = 10;
export const TOKEN = "token";
export const PERMISSIONS = "permissions";
export const AUTH_CRED = "AUTH_CRED";
export const menuItems = [
    {
        key: "0x1",
        value: "Ethereum",
        icon: <ETHLogo />,
    },
    {
        key: "0x4",
        value: "Rinkeby Testnet",
        icon: <ETHLogo />,
    },
    {
        key: "0x38",
        value: "Binance",
        icon: <BSCLogo />,
    },
    {
        key: "0x61",
        value: "Smart Chain Testnet",
        icon: <BSCLogo />,
    },
    {
        key: "0x89",
        value: "Polygon",
        icon: <PolygonLogo />,
    },
    {
        key: "0x13881",
        value: "Mumbai",
        icon: <PolygonLogo />,
    },
    {
        key: "0xa86a",
        value: "Avalanche",
        icon: <AvaxLogo />,
    },
    {
        key: "0xa869",
        value: "Avalanche Testnet",
        icon: <AvaxLogo />,
    }
];