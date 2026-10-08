import {isIP} from "node:net";
import {getContext} from "@netlify/functions";

type NetlifyContextReader = () => {ip?: string | null};

export function getTrustedClientIp(
  readContext: NetlifyContextReader = getContext
): string | null {
  try {
    const address = readContext().ip?.trim();
    return address && isIP(address) ? address : null;
  } catch {
    return null;
  }
}
