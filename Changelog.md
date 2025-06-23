# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.5] - 2025-06-23

### 🚀 Added
- **Badge Support**: Added `showBadge` and `badgeCount` props to display a badge in the top-right corner of the card. See README for usage.

### 📝 Updated
- Documentation and examples updated to demonstrate badge usage.

## [Unreleased]

## [1.0.4] - 2025-06-11

### 🚀 Added
- **Enhanced Control Props**: Added `maxRotation`, `maxTranslation`, and `intensity` props for fine-tuned animation control
- **Auto-sizing Support**: New `autoSize` prop for responsive card behavior in grid layouts
- **Title Control**: Added `shouldShowTitle` prop for better title display management
- **Boundary Clamping**: Mouse position is now properly clamped to card boundaries, preventing excessive transformations
- **Smooth Easing**: Implemented cubic easing function for more natural edge transitions
- **Improved Shadow Calculation**: Shadow opacity now calculates based on distance from center for more realistic effects

### 🐛 Fixed
- **Critical**: Fixed excessive translation when cursor lands at bottom edge of card
- **Touch Events**: Improved touch event handling with better boundary detection
- **Performance**: Optimized calculations to reduce unnecessary re-renders
- **Edge Cases**: Better handling of mouse positions outside card boundaries

### ⚡ Improved
- **Animation Quality**: Smoother transitions with improved spring physics
- **Mobile Experience**: Better touch responsiveness and gesture handling
- **Accessibility**: Enhanced support for reduced motion preferences
- **Type Safety**: Updated TypeScript definitions to match all component features

### 🔧 Changed
- **BREAKING**: Updated minimum Framer Motion requirement to 6.0.0+
- **BREAKING**: Changed default `intensity` calculation method (may affect existing implementations)
- Shadow effect now uses distance-based calculation instead of Y-position only
- Improved reflection positioning algorithm for more realistic light effects

### 📚 Documentation
- Updated README with comprehensive examples and new prop documentation
- Added troubleshooting section and performance tips
- Enhanced TypeScript usage examples
- Added accessibility guidelines

---

## [1.0.3] - 2025-05-15

### 🚀 Added
- TypeScript support with full type definitions
- `alwaysShowTitle` prop for persistent title display
- Better keyboard navigation support

### 🐛 Fixed
- Memory leaks in event listeners
- Focus management issues
- Minor animation glitches on rapid hover changes

### ⚡ Improved
- Reduced bundle size by optimizing dependencies
- Better performance on mobile devices

---

## [1.0.1] - 2025-04-20

### 🚀 Added
- Reflection effect with `withReflection` prop
- Shadow effect with `withShadow` prop
- `rounded` prop for corner radius control
- Touch device support

### 🐛 Fixed
- Safari compatibility issues
- Animation performance on lower-end devices

### ⚡ Improved
- Smoother animations with better spring configuration
- Reduced motion respect for accessibility

---

## [1.0.0] - 2025-03-10

### 🚀 Added
- Initial release of React Apple TV Card
- Basic 3D rotation effect on hover
- Parallax movement for child content
- Framer Motion integration
- Next.js compatibility
- Basic props: `title`, `backgroundImage`, `width`, `height`, `children`, `onClick`

### 📚 Documentation
- Comprehensive README with usage examples
- TypeScript definitions
- Basic API documentation

---

## Legend

- 🚀 **Added** - New features
- 🐛 **Fixed** - Bug fixes
- ⚡ **Improved** - Performance improvements or enhancements
- 🔧 **Changed** - Changes that may affect existing code
- 📚 **Documentation** - Documentation updates
- 🗑️ **Removed** - Removed features or dependencies