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
    /** Whether to always show the title (default: false) */
    alwaysShowTitle?: boolean;
    /** Content to display with parallax effect */
    children?: ReactNode;
    /** Optional CSS class name for the card container */
    className?: string;
    /** Optional style object for the card container */
    style?: React.CSSProperties;
    /** Optional callback when the card is clicked */
    onClick?: () => void;
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