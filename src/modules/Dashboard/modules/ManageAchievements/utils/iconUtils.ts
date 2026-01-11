/**
 * Achievement Icon Utility Functions
 * 
 * Provides consistent URL handling for achievement icons across the application.
 */

/**
 * Constructs the full URL for an achievement icon.
 * 
 * @param icon - The icon value from the API (can be a full URL, relative path, or undefined)
 * @param iconUrl - Optional icon_url field from the API serializer (already includes MEDIA_URL)
 * @returns The full URL to display the icon, or null if no valid icon is available
 */
export const getAchievementIconUrl = (
    icon: string | undefined | null,
    iconUrl?: string | undefined | null
): string | null => {
    // Prefer icon_url from serializer if available (it already has MEDIA_URL)
    if (iconUrl) {
        // If it's already a full URL, use it directly
        if (iconUrl.startsWith('http://') || iconUrl.startsWith('https://')) {
            return iconUrl;
        }
        // Otherwise, prepend backend URL
        const backendUrl = (import.meta.env.VITE_BACKEND_URL as string).replace(/\/$/, '');
        return `${backendUrl}${iconUrl.startsWith('/') ? '' : '/'}${iconUrl}`;
    }

    // Fallback to icon field
    if (!icon) return null;

    // If it's already a full URL, use it directly
    if (icon.startsWith('http://') || icon.startsWith('https://')) {
        return icon;
    }

    // Handle relative paths from backend (e.g., "achievements/icons/uuid.png")
    const backendUrl = (import.meta.env.VITE_BACKEND_URL as string).replace(/\/$/, '');
    
    // If path starts with "media/" or is a relative media path, add /media/ prefix
    if (icon.startsWith('media/')) {
        return `${backendUrl}/${icon}`;
    }
    
    // If it's a relative path without media prefix, add /media/
    if (icon.includes('/') && !icon.startsWith('/')) {
        return `${backendUrl}/media/${icon}`;
    }

    // For other cases (like emoji strings), return null to trigger fallback
    if (!icon.includes('/') && !icon.includes('.')) {
        return null;
    }

    return `${backendUrl}${icon.startsWith('/') ? '' : '/'}${icon}`;
};

/**
 * Default placeholder icon component styles
 */
export const iconPlaceholderStyles = {
    container: {
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6',
        borderRadius: '8px',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'contain' as const,
        borderRadius: '8px',
    },
    fallbackText: {
        fontSize: '24px',
        color: '#9ca3af',
    },
};
