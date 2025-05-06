import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { v4 as uuidv4 } from "uuid";

export const generateKitToken = (roomID) => {
  const appID = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
  const appSecret = process.env.NEXT_PUBLIC_ZEGO_APP_SECRET;

  if (!appID || isNaN(appID)) {
    throw new Error("Zego app ID is missing or invalid.");
  }

  if (!appSecret) {
    throw new Error("Zego app secret is missing.");
  }

  return ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    appSecret,
    roomID,
    uuidv4(),
    "Enter Your name"
  );
};
