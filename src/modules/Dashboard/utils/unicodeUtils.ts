// Utility functions for handling Unicode encoding/decoding for emoji support

/**
 * Encode emojis and special UTF-8 characters as unicode escape sequences
 * This is used before sending data to API to ensure emojis are preserved
 */
export const encodeUnicodeForStorage = (text: string): string => {
    try {
        if (!text) return text;
        // Convert emojis and non-ASCII characters to unicode escape sequences
        return text.replace(/[\u0080-\uFFFF]/g, (match) => {
            return '\\u' + ('0000' + match.charCodeAt(0).toString(16)).substr(-4);
        });
    } catch (error) {
        console.warn("Unicode encoding issue, using original text:", error);
        return text;
    }
};

/**
 * Decode unicode escape sequences back to emojis and UTF-8 characters
 * This is used when displaying data from API to show emojis properly
 */
export const decodeUnicodeFromStorage = (text: string): string => {
    try {
        if (!text) return text;
        // Convert unicode escape sequences back to actual characters
        return text.replace(/\\u[\dA-F]{4}/gi, (match) => {
            return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
        });
    } catch (error) {
        console.warn("Unicode decoding issue, using original text:", error);
        return text;
    }
};

/**
 * Helper function to ensure UTF-8 encoding is preserved (fallback method)
 */
export const preserveUTF8Encoding = (text: string): string => {
    try {
        if (!text) return text;
        // This ensures proper UTF-8 encoding by converting to bytes and back
        return new TextDecoder('utf-8').decode(new TextEncoder().encode(text));
    } catch (error) {
        console.warn("UTF-8 encoding issue, using original text:", error);
        return text;
    }
};
