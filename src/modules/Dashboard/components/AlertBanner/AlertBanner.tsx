import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styles from './AlertBanner.module.css';

export type AlertVariant = 'info' | 'warning' | 'success' | 'error';

export interface AlertBannerProps {
    /** Visual variant that determines the color scheme */
    variant: AlertVariant;
    /** Main title text */
    title: string;
    /** Optional description text */
    description?: string;
    /** Optional label for action button */
    actionLabel?: string;
    /** Callback when action button is clicked */
    onAction?: () => void;
    /** Whether the banner can be dismissed (default: true) */
    dismissible?: boolean;
    /** localStorage key for persisting dismissal state */
    dismissKey?: string;
    /** Optional custom icon */
    icon?: React.ReactNode;
    /** Optional className for custom styling */
    className?: string;
}

const variantIcons: Record<AlertVariant, string> = {
    info: 'fi fi-rr-info',
    warning: 'fi fi-rr-triangle-warning',
    success: 'fi fi-rr-check-circle',
    error: 'fi fi-rr-cross-circle',
};

/**
 * A reusable, production-grade alert banner component.
 * Supports multiple variants, dismissal with localStorage persistence,
 * and optional action buttons.
 */
const AlertBanner: React.FC<AlertBannerProps> = ({
    variant,
    title,
    description,
    actionLabel,
    onAction,
    dismissible = true,
    dismissKey,
    icon,
    className = '',
}) => {
    const [isDismissed, setIsDismissed] = useState<boolean>(false);
    const [isAnimatingOut, setIsAnimatingOut] = useState<boolean>(false);

    // Check localStorage for persisted dismissal state on mount
    useEffect(() => {
        if (dismissKey) {
            const dismissed = localStorage.getItem(`alertBanner_${dismissKey}`);
            if (dismissed === 'true') {
                setIsDismissed(true);
            }
        }
    }, [dismissKey]);

    const handleDismiss = useCallback(() => {
        setIsAnimatingOut(true);

        // Wait for animation to complete before fully dismissing
        setTimeout(() => {
            setIsDismissed(true);
            if (dismissKey) {
                localStorage.setItem(`alertBanner_${dismissKey}`, 'true');
            }
        }, 300);
    }, [dismissKey]);

    const handleAction = useCallback(() => {
        onAction?.();
    }, [onAction]);

    const iconElement = useMemo(() => {
        if (icon) return icon;
        return <i className={variantIcons[variant]}></i>;
    }, [icon, variant]);

    // Don't render if dismissed
    if (isDismissed) {
        return null;
    }

    return (
        <div
            className={`${styles.alertBanner} ${styles[variant]} ${isAnimatingOut ? styles.animatingOut : ''} ${className}`}
            role="alert"
            aria-live="polite"
        >
            <div className={styles.iconContainer}>
                {iconElement}
            </div>

            <div className={styles.content}>
                <span className={styles.title}>{title}</span>
                {description && (
                    <span className={styles.description}>{description}</span>
                )}
            </div>

            <div className={styles.actions}>
                {actionLabel && onAction && (
                    <button
                        type="button"
                        className={styles.actionButton}
                        onClick={handleAction}
                    >
                        {actionLabel}
                    </button>
                )}

                {dismissible && (
                    <button
                        type="button"
                        className={styles.dismissButton}
                        onClick={handleDismiss}
                        aria-label="Dismiss alert"
                    >
                        <i className="fi fi-rr-cross-small"></i>
                    </button>
                )}
            </div>
        </div>
    );
};

export default AlertBanner;
