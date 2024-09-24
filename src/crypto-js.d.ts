declare module 'crypto-js/sha256' {
    import { Hash } from 'crypto-js';
    export default function sha256(message: string | ArrayBuffer): Hash;
}

declare module 'crypto-js/hmac-sha256' {
    import { WordArray } from 'crypto-js';
  
    export default function HmacSHA256(message: string | ArrayBuffer, key: string | ArrayBuffer): WordArray;
}