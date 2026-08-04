import crypto from "crypto";

const UPLOAD_URL_PREFIX = "/uploads/appointments";

function getEncryptionKey() {
    return crypto.createHash("sha256").update(process.env.ACCESS_TOKEN_SECRET).digest();

}

export function createProtectedFilename(filename, patientId) {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv("aes-256-gcm",getEncryptionKey(), iv);
    const plaintext = `${filename}_${patientId}`;
    const encrypted = Buffer.concat([
        cipher.update(plaintext, "utf8"),
        cipher.final(),
    ]);
    const authTag = cipher.getAuthTag();
    return Buffer.concat([iv, authTag, encrypted]).toString("base64url");
}

export async function decryptFilename(encryptedFilename) {
    const encryptedData = Buffer.from(encryptedFilename, "base64url");

    if (encryptedData.length < 29) {
        throw new Error("Invalid encrypted filename");
    }

    const iv = encryptedData.subarray(0, 12);
    const authTag = encryptedData.subarray(12, 28);
    const ciphertext = encryptedData.subarray(28);
    const decipher = crypto.createDecipheriv("aes-256-gcm", getEncryptionKey(), iv);

    decipher.setAuthTag(authTag);

    return Buffer.concat([
        decipher.update(ciphertext),
        decipher.final(),
    ]).toString("utf8");
}

export function protectedUploadUrl(filename) {
    return `${UPLOAD_URL_PREFIX}${filename}`;
}
