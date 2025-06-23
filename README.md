# React Apple TV Card

A React implementation of the elegant Apple TV card effect with 3D rotation and parallax movement. This component is designed to work seamlessly with React and Next.js applications.

![React Apple TV Card Demo](https://your-repo/demo.gif)

## Features

- ✨ Smooth 3D rotation effect on hover
- 🖼️ Beautiful parallax movement with depth layers
- 🎛️ Customizable intensity and rotation limits
- 🌟 Reflection and shadow effects
- 🚀 Built with Framer Motion for performant animations
- 📱 Responsive and mobile-friendly
- 🧩 Full TypeScript support
- ♿ Accessibility features with reduced motion support
- ⚡ Next.js ready (works with both Pages and App Router)

## Installation

```bash
npm install react-apple-tv-card
# or
yarn add react-apple-tv-card
# or
pnpm add react-apple-tv-card
```

## Requirements

This package requires:

- React 16.8.0 or newer (for Hooks support)
- Framer Motion 6.0.0 or newer

## Basic Usage

```jsx
import AppleTVCard from 'react-apple-tv-card';

function MyComponent() {
  return (
    <AppleTVCard
      title="My Awesome Card"
      backgroundImage="/path/to/image.jpg"
      width={300}
      height={170}
    >
      {/* Optional content with parallax effect */}
      <div style={{ 
        width: '5em', 
        height: '5em', 
        border: '1em dashed white' 
      }} />
    </AppleTVCard>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `undefined` | Title displayed below the card |
| `backgroundImage` | `string` | `undefined` | URL for the background image |
| `width` | `number` | `300` | Width of the card in pixels |
| `height` | `number` | _auto (16:9)_ | Height of the card in pixels |
| `autoSize` | `boolean` | `false` | Whether to size the card relative to its container |
| `withShadow` | `boolean` | `true` | Whether to show dynamic shadow effects |
| `withReflection` | `boolean` | `true` | Whether to show reflection effects |
| `rounded` | `boolean` | `true` | Whether to use rounded corners |
| `alwaysShowTitle` | `boolean` | `false` | Whether to always show the title |
| `shouldShowTitle` | `boolean` | `true` | Whether to show the title at all |
| `maxRotation` | `number` | `10` | Maximum rotation angle in degrees |
| `maxTranslation` | `number` | `10` | Maximum translation distance in pixels |
| `intensity` | `number` | `1` | Overall intensity of the 3D effect (0-1) |
| `showBadge` | `boolean` | `false` | Whether to show a badge in the top-right corner |
| `badgeCount` | `number` | `0` | The count to display inside the badge |
| `children` | `ReactNode` | `undefined` | Content to display with parallax effect |
| `className` | `string` | `''` | Optional CSS class name for the card container |
| `style` | `React.CSSProperties` | `{}` | Optional style object for the card container |
| `onClick` | `() => void` | `undefined` | Optional callback when the card is clicked |

## Advanced Examples

### Card with Custom Content and Effects

```jsx
<AppleTVCard
  title="Movie Title"
  backgroundImage="/movie-poster.jpg"
  width={350}
  height={200}
  maxRotation={15}
  intensity={0.8}
  withShadow={true}
  withReflection={true}
>
  <div style={{
    padding: '1rem',
    background: 'rgba(0,0,0,0.6)',
    color: 'white',
    borderRadius: '0.5rem',
    textAlign: 'center'
  }}>
    <h3>Now Playing</h3>
    <p>Click to watch</p>
  </div>
</AppleTVCard>
```

### Interactive Card with Click Handler

```jsx
<AppleTVCard
  title="Click Me"
  backgroundImage="/background.jpg"
  onClick={() => alert('Card clicked!')}
  maxRotation={12}
  maxTranslation={8}
>
  <button 
    style={{
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '4px',
      background: 'white',
      cursor: 'pointer'
    }}
  >
    Play Now
  </button>
</AppleTVCard>
```

### Subtle Effect for Professional Use

```jsx
<AppleTVCard
  title="Product Card"
  backgroundImage="/product.jpg"
  intensity={0.4}
  maxRotation={5}
  maxTranslation={3}
  withReflection={false}
>
  <div className="product-overlay">
    <h4>Premium Product</h4>
    <span className="price">$99.99</span>
  </div>
</AppleTVCard>
```

### Grid of Cards with Auto-sizing

```jsx
<div style={{ 
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '2rem' 
}}>
  {movies.map(movie => (
    <AppleTVCard
      key={movie.id}
      title={movie.title}
      autoSize={true}
      backgroundImage={movie.posterUrl}
      onClick={() => playMovie(movie.id)}
    />
  ))}
</div>
```

### Accessibility-Friendly Implementation

```jsx
<AppleTVCard
  title="Accessible Card"
  backgroundImage="/image.jpg"
  onClick={() => navigate('/details')}
  // The component automatically respects prefers-reduced-motion
  // and provides keyboard navigation support
>
  <div role="button" aria-label="View details">
    <span>Learn More</span>
  </div>
</AppleTVCard>
```

### Card with Badge

```jsx
<AppleTVCard
  title="Notifications"
  backgroundImage="/notification-bg.jpg"
  width={320}
  showBadge={true}
  badgeCount={5}
>
  <div style={{ color: 'white', fontWeight: 'bold' }}>Inbox</div>
</AppleTVCard>
```

## TypeScript Usage

This package includes comprehensive TypeScript definitions:

```tsx
import AppleTVCard, { AppleTVCardProps } from 'react-apple-tv-card';

// Type-safe wrapper component
const MovieCard: React.FC<{
  movie: Movie;
  onPlay: (id: string) => void;
}> = ({ movie, onPlay }) => {
  return (
    <AppleTVCard
      title={movie.title}
      backgroundImage={movie.posterUrl}
      width={300}
      height={169}
      onClick={() => onPlay(movie.id)}
      maxRotation={12}
      intensity={0.9}
    >
      <div className="movie-overlay">
        <span className="duration">{movie.duration}</span>
        <span className="rating">{movie.rating}</span>
      </div>
    </AppleTVCard>
  );
};
```

## Next.js Usage

### App Router (Client Component)

```jsx
'use client';

import AppleTVCard from 'react-apple-tv-card';

export default function MyPage() {
  return (
    <div>
      <h1>My Gallery</h1>
      <AppleTVCard 
        title="Next.js Card" 
        backgroundImage="/my-image.jpg" 
      />
    </div>
  );
}
```

### With Next.js Image Optimization

```jsx
'use client';

import AppleTVCard from 'react-apple-tv-card';
import Image from 'next/image';

export default function OptimizedCard() {
  return (
    <AppleTVCard
      title="Optimized Image"
      width={400}
      height={225}
    >
      <Image
        src="/hero-image.jpg"
        alt="Hero"
        fill
        style={{ objectFit: 'cover' }}
        priority
      />
    </AppleTVCard>
  );
}
```

## Performance Tips

- **Image Optimization**: Use appropriately sized images and consider WebP format for better performance
- **Reduced Motion**: The component automatically respects `prefers-reduced-motion` settings
- **Intensity Control**: Use lower `intensity` values for better performance on mobile devices
- **Virtualization**: For large grids, consider implementing virtualization
- **Memory Management**: The component automatically cleans up event listeners and motion values

## Accessibility Features

- ✅ Keyboard navigation support (Tab, Enter, Space)
- ✅ Respects `prefers-reduced-motion` preference
- ✅ Focus management with visual indicators
- ✅ Screen reader compatible
- ✅ Touch device optimization

## Browser Support

- Chrome 88+
- Firefox 87+
- Safari 14+
- Edge 88+

## Troubleshooting

### Common Issues

**Card not rotating properly**: Ensure the parent container has enough space and doesn't have `overflow: hidden` set.

**Performance issues**: Try reducing the `intensity` prop or disabling `withReflection` on mobile devices.

**TypeScript errors**: Make sure you have the latest version of @types/react installed.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. See our [Contributing Guide](CONTRIBUTING.md) for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed list of changes.

## License

MIT © BlakCode

---

Inspired by the elegant card interactions in Apple's tvOS interface.