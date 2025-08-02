

// export const GetIpfsUrlFromPinata = (pinataUrl) => {
//     var IPFSUrl = pinataUrl.split("/");
//     const lastIndex = IPFSUrl.length;
//     IPFSUrl = "https://ipfs.io/ipfs/"+IPFSUrl[lastIndex-1];
//     return IPFSUrl;
// };



export const GetIpfsUrlFromPinata = (pinataUrl) => {
    if (!pinataUrl) return "";

    if (pinataUrl.startsWith("ipfs://")) {
        return pinataUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
    }

    const match = pinataUrl.match(/(?:ipfs\/)([^\/]+(?:\/[^\/]+)*)/);
    if (match && match[1]) {
        return `https://ipfs.io/ipfs/${match[1]}`;
    }

    return pinataUrl; 
};






