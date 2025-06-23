import React, { useRef, useState, useEffect, ReactNode } from 'react';
import { motion, useMotionValue, useTransform, useSpring, MotionStyle } from 'framer-motion';

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
    /** Whether to always show the title (default: false) */
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
interface MousePosition {
    x: number;
    y: number;
    posX: number;
    posY: number;
    width: number;
    height: number;
}

/**
 * AppleTVCard component - Creates an interactive card with 3D rotation and parallax effects
 * similar to the cards used in Apple TV UI.
 */
const AppleTVCard: React.FC<AppleTVCardProps> = ({
    title,
    backgroundImage,
    width = 300,
    height,
    autoSize = false,
    withShadow = true,
    withReflection = true,
    rounded = true,
    alwaysShowTitle = false,
    shouldShowTitle = true,
    children,
    className = '',
    style = {},
    onClick,
    maxRotation = 10,
    maxTranslation = 10,
    intensity = 1,
    showBadge = false,
    badgeCount = 0,
}) => {
    // Refs
    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // State
    const [perspective, setPerspective] = useState<number>(1000);
    const [fontSize, setFontSize] = useState<number>(16);
    const [mousePosition, setMousePosition] = useState<MousePosition>({
        x: 0, y: 0, posX: 0, posY: 0, width: 0, height: 0
    });
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const prefersReducedMotion = useRef<boolean>(false);

    // Motion values for rotation, translation and effects
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const translateX = useMotionValue(0);
    const translateY = useMotionValue(0);
    const translateZ = useMotionValue(0);
    const reflectionX = useMotionValue(0);
    const reflectionY = useMotionValue(0);
    const reflectionSize = useMotionValue(0);
    const shadowOpacity = useMotionValue(0);

    // Spring physics for smoother animation
    const springConfig = { damping: 20, stiffness: 200 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);
    const springTranslateX = useSpring(translateX, springConfig);
    const springTranslateY = useSpring(translateY, springConfig);
    const springTranslateZ = useSpring(translateZ, springConfig);

    // Calculate optimal size on mount and resize
    useEffect(() => {
        const handleResize = (): void => {
            if (!cardRef.current) return;

            const size = Math.max(cardRef.current.clientWidth, cardRef.current.clientHeight);
            setPerspective(size * 2.5);
            setFontSize(size / 3.5);
        };

        // Check for reduced motion preference
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        prefersReducedMotion.current = mediaQuery.matches;

        const mediaQueryListener = (): void => {
            prefersReducedMotion.current = mediaQuery.matches;
        };

        mediaQuery.addEventListener('change', mediaQueryListener);

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            mediaQuery.removeEventListener('change', mediaQueryListener);
        };
    }, []);

    // Utility function to clamp values within a range
    const clamp = (value: number, min: number, max: number): number => {
        return Math.min(Math.max(value, min), max);
    };

    // Utility function for smooth easing
    const easeOutCubic = (t: number): number => {
        return 1 - Math.pow(1 - t, 3);
    };

    // Handle mouse/touch movement
    const handleMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>): void => {
        if (!cardRef.current || prefersReducedMotion.current) return;

        // Prevent default for touch events
        if (e.type === 'touchmove') {
            e.preventDefault();
        }

        let posX: number, posY: number;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        if (e.type === 'touchmove' || e.type === 'touchstart') {
            const touchEvent = e as React.TouchEvent<HTMLDivElement>;
            const touch = touchEvent.touches[0];
            posX = touch.clientX - rect.left;
            posY = touch.clientY - rect.top;

            // Check if touch is still within the card
            const elementFromPoint = document.elementFromPoint(touch.clientX, touch.clientY);
            if (!elementFromPoint || !cardRef.current.contains(elementFromPoint)) {
                handleEnd();
                return;
            }
        } else {
            const mouseEvent = e as React.MouseEvent<HTMLDivElement>;
            posX = mouseEvent.nativeEvent.offsetX;
            posY = mouseEvent.nativeEvent.offsetY;
        }

        // Clamp positions to ensure they're within bounds
        posX = clamp(posX, 0, width);
        posY = clamp(posY, 0, height);

        // Calculate normalized positions (-1 to 1)
        const normalizedX = (posX / width) * 2 - 1;
        const normalizedY = (posY / height) * 2 - 1;

        // Apply easing for smoother transitions at edges
        const easedX = normalizedX * easeOutCubic(Math.abs(normalizedX));
        const easedY = normalizedY * easeOutCubic(Math.abs(normalizedY));

        // Calculate transforms with intensity multiplier and bounds
        const angleY = clamp(easedX * maxRotation * intensity, -maxRotation, maxRotation);
        const angleX = clamp(-easedY * maxRotation * intensity, -maxRotation, maxRotation);
        const transX = clamp(-easedX * maxTranslation * intensity, -maxTranslation, maxTranslation);
        const transY = clamp(-easedY * maxTranslation * intensity, -maxTranslation, maxTranslation);

        // Update motion values
        rotateY.set(angleY);
        rotateX.set(angleX);
        translateX.set(transX);
        translateY.set(transY);
        translateZ.set(64 * intensity); // 4rem in pixels scaled by intensity

        // Update reflection position if enabled
        if (withReflection) {
            reflectionX.set((width * 0.1) + (posX * 0.8));
            reflectionY.set(posY - (height / 2));
            reflectionSize.set(perspective * 1.5);
        }

        // Update shadow opacity if enabled with better calculation
        if (withShadow) {
            const distanceFromCenter = Math.sqrt(
                Math.pow(normalizedX, 2) + Math.pow(normalizedY, 2)
            );
            const shadowValue = clamp(1 - distanceFromCenter, 0, 0.6) * intensity;
            shadowOpacity.set(shadowValue);
        }

        // Update mouse position for parallax effect
        setMousePosition({
            x: transX,
            y: transY,
            posX,
            posY,
            width,
            height
        });
    };

    const handleStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>): void => {
        if (contentRef.current) {
            contentRef.current.focus();
        }
        setIsHovering(true);
        handleMove(e);
    };

    const handleEnd = (): void => {
        if (contentRef.current) {
            contentRef.current.blur();
        }
        setIsHovering(false);

        // Reset all motion values
        rotateX.set(0);
        rotateY.set(0);
        translateX.set(0);
        translateY.set(0);
        translateZ.set(0);
        shadowOpacity.set(0);
    };

    const handleFocus = (): void => {
        setIsFocused(true);
    };

    const handleBlur = (): void => {
        setIsFocused(false);
        handleEnd();
    };

    // Calculate aspect ratio - default is 16:9 (56.25%)
    const aspectRatio = height ? (height / width) * 100 : 56.25;

    // Create styles for the container
    const containerStyle: React.CSSProperties = {
        position: 'relative',
        width: autoSize ? '100%' : `${width}px`,
        paddingBottom: (shouldShowTitle && title) ? '3.5rem' : 0,
        perspective: `${perspective}px`,
        ...style
    };

    // CSS for the card
    const cardStyle: MotionStyle = {
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        borderRadius: rounded ? 'min(max(2vmax, 2rem), 3rem)' : 0,
        boxShadow: (isHovering || isFocused)
            ? '0 1.5rem 2rem 0.25rem rgba(0, 0, 0, 0.3)'
            : '0 0.25rem 0.25rem rgba(0, 0, 0, 0.1)',
        transformStyle: 'preserve-3d',
        transformOrigin: '50%',
        transition: prefersReducedMotion.current ? 'none' : 'transform 50ms ease-in-out',
        rotateX: springRotateX,
        rotateY: springRotateY,
        translateX: springTranslateX,
        translateY: springTranslateY,
        translateZ: springTranslateZ,
        zIndex: 0,
        fontSize: `${fontSize}px`,
        cursor: onClick ? 'pointer' : 'default'
    };

    // CSS for the title
    const titleStyle: React.CSSProperties = {
        position: 'absolute',
        bottom: (isHovering || isFocused) ? '0.9rem' : '1.3rem',
        left: 0,
        right: 0,
        opacity: (isHovering || isFocused || alwaysShowTitle) ? 1 : 0,
        textAlign: 'center',
        fontSize: '1.3rem',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: 'white',
        textShadow: '0 1px 2px black',
        transition: prefersReducedMotion.current
            ? 'none'
            : 'opacity 0.12s ease-in-out, bottom 0.09s ease-in-out',
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        pointerEvents: 'none'
    };

    // CSS for the badge
    const badgeStyle: React.CSSProperties = {
        position: 'absolute',
        top: '0.5rem',
        right: '0.5rem',
        backgroundColor: 'red',
        color: 'white',
        borderRadius: '1rem',
        padding: '0.25rem 0.5rem',
        fontSize: '0.875rem',
        fontWeight: 'bold',
        pointerEvents: 'none',
        zIndex: 5
    };

    // Check if the component is active (hovering or focused)
    const isActive = isHovering || isFocused;

    return (
        <div
            style={containerStyle}
            className={className}
            data-testid="apple-tv-card-container"
        >
            <motion.div
                ref={cardRef}
                style={cardStyle}
                onMouseMove={handleMove}
                onMouseEnter={handleStart}
                onMouseLeave={handleEnd}
                onTouchStart={handleStart}
                onTouchMove={handleMove}
                onTouchEnd={handleEnd}
                onTouchCancel={handleEnd}
                onClick={onClick}
                data-testid="apple-tv-card"
            >
                {/* Content/Background */}
                <motion.div
                    ref={contentRef}
                    tabIndex={0}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{
                        display: 'block',
                        width: '100%',
                        border: 'none',
                        outline: 'none',
                        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(to bottom, #555, #000)',
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                        paddingBottom: `${aspectRatio}%`,
                        position: 'relative',
                        zIndex: 1
                    }}
                    data-testid="apple-tv-card-content"
                />

                {/* Shadow Effect */}
                {withShadow && (
                    <motion.div
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                            pointerEvents: 'none',
                            background: 'rgba(0, 0, 0, 0.1)',
                            opacity: shadowOpacity,
                            zIndex: 3,
                            boxShadow: useTransform(
                                shadowOpacity,
                                (value: number) => `inset 0 ${value * -2}em 1em -0.5em rgba(0, 0, 0, ${Math.min(value, 0.35)})`
                            )
                        }}
                        data-testid="apple-tv-card-shadow"
                    />
                )}

                {/* Reflection Effect */}
                {withReflection && (
                    <motion.div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: useTransform(reflectionSize, (size: number) => `${size}px`),
                            height: useTransform(reflectionSize, (size: number) => `${size}px`),
                            marginTop: useTransform(reflectionSize, (size: number) => `${size * -0.75}px`),
                            marginLeft: useTransform(reflectionSize, (size: number) => `${size * -0.75}px`),
                            pointerEvents: 'none',
                            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.5), transparent 70%)',
                            transform: useTransform(
                                [reflectionX, reflectionY],
                                ([x, y]) => `translate(${x}px, ${y}px)`
                            ),
                            zIndex: 4
                        }}
                        data-testid="apple-tv-card-reflection"
                    />
                )}

                {/* Parallax Content */}
                {children && (
                    <motion.div
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            pointerEvents: 'none',
                            transformStyle: 'preserve-3d',
                            transition: prefersReducedMotion.current ? 'none' : 'transform 50ms ease-in-out',
                            zIndex: 2
                        }}
                        animate={{
                            x: isActive && !prefersReducedMotion.current
                                ? mousePosition.x * -0.65 * 10
                                : 0,
                            y: isActive && !prefersReducedMotion.current
                                ? mousePosition.y * -0.65 * 10
                                : 0,
                            scale: 1.075
                        }}
                        data-testid="apple-tv-card-parallax-content"
                    >
                        {children}
                    </motion.div>
                )}

                {/* Badge */}
                {showBadge && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-sm rounded-full size-6 flex items-center justify-center" style={{ zIndex: 9999999999 }}>
                        {badgeCount}
                    </div>
                )}
            </motion.div>

            {/* Title */}
            {(shouldShowTitle && title) && (
                <motion.div
                    style={titleStyle}
                    data-testid="apple-tv-card-title"
                >
                    {title}
                </motion.div>
            )}
        </div>
    );
};

export default AppleTVCard;