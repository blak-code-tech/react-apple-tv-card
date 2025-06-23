import { ReactNode } from 'react';

/**
 * Props for the AppleTVCard component
 */
export interface AppleTVCardProps {
    /** Title displayed below the card */
    title?: string;
    /** URL for the background image */
    backgroundImage?: string;
    /** Width of the card in pixels (default: 300) */
    width?: number;
    /** Height of the card (calculated using 16:9 ratio by default) */
    height?: number;
    /** Whether to show a shadow effect (default: true) */
    withShadow?: boolean;
    /** Whether to show a reflection effect (default: true) */
    withReflection?: boolean;
    /** Whether to use rounded corners (default: true) */
    rounded?: boolean;
    /** Whether to auto size the card (default: false) */
    autoSize?: boolean;
    /** Whether to always show the title (default: false) */
    alwaysShowTitle?: boolean;
    /** Whether to show the title (default: true) */
    shouldShowTitle?: boolean;
    /** Content to display with parallax effect */
    children?: ReactNode;
    /** Optional CSS class name for the card container */
    className?: string;
    /** Optional style object for the card container */
    style?: React.CSSProperties;
    /** Optional callback when the card is clicked */
    onClick?: () => void;
    /** Maximum rotation angle in degrees (default: 10) */
    maxRotation?: number;
    /** Maximum translation distance in pixels (default: 10) */
    maxTranslation?: number;
    /** Intensity of the 3D effect (0-1, default: 1) */
    intensity?: number;
    /** Whether to show a badge in the top-right corner */
    showBadge?: boolean;
    /** The count to display inside the badge */
    badgeCount?: number;
}

/**
 * Type for the mouse position state
 */
export interface MousePosition {
    x: number;
    y: number;
    posX: number;
    posY: number;
    width: number;
    height: number;
}