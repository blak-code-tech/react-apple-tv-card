# React Apple TV Card

A React implementation of the elegant Apple TV card effect with 3D rotation and parallax movement. This component is designed to work seamlessly with React and Next.js applications.

![React Apple TV Card Demo](https://your-repo/demo.gif)

## Features

- ✨ Smooth 3D rotation effect on hover
- 🖼️ Beautiful parallax movement
- 🚀 Built with Framer Motion for performant animations
- 📱 Responsive and customizable
- 🧩 TypeScript support
- ⚡ Next.js ready (works with both Pages and App Router)

## Installation

```bash
npm install react-apple-tv-card
# or
yarn add react-apple-tv-card
```

## Requirements

This package requires:

- React 16.8.0 or newer (for Hooks support)
- Framer Motion 5.0.0 or newer

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
| `backgroundImage` | `string` | _Required_ | URL for the background image |
| `width` | `number` | `300` | Width of the card in pixels |
| `height` | `number` | `170` | Height of the card in pixels |
| `rotateIntensity` | `number` | `15` | Maximum rotation angle in degrees |
| `moveIntensity` | `number` | `1.5` | Intensity of the parallax movement |
| `children` | `ReactNode` | `undefined` | Content to display with parallax effect |
| `className` | `string` | `''` | Optional CSS class name for the card container |
| `style` | `React.CSSProperties` | `{}` | Optional style object for the card container |
| `onClick` | `() => void` | `undefined` | Optional callback when the card is clicked |
| `isHovered` | `boolean` | `undefined` | Optional hover state override (for controlled components) |
| `onHoverChange` | `(isHovering: boolean) => void` | `undefined` | Optional callback when hover state changes |

## Advanced Examples

### Card with Custom Content

```jsx
<AppleTVCard
  title="Movie Title"
  backgroundImage="/movie-poster.jpg"
  width={350}
  height={200}
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

### Grid of Cards

```jsx
<div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
  {movies.map(movie => (
    <AppleTVCard
      key={movie.id}
      title={movie.title}
      backgroundImage={movie.posterUrl}
      onClick={() => playMovie(movie.id)}
    />
  ))}
</div>
```

## TypeScript Usage

This package includes TypeScript definitions. You can import the types like this:

```tsx
import AppleTVCard, { AppleTVCardProps } from 'react-apple-tv-card';

// Now you can use AppleTVCardProps for type checking
const MyCardWrapper: React.FC<Omit<AppleTVCardProps, 'backgroundImage'> & { imageId: string }> = 
  ({ imageId, ...props }) => {
    const imageUrl = `/images/${imageId}.jpg`;
    return <AppleTVCard {...props} backgroundImage={imageUrl} />;
  };
```

## Next.js Usage

This component works perfectly with Next.js. If using the App Router, make sure to use the component in a Client Component:

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

## Performance Tips

- Use appropriately sized images for better performance
- Consider using Next.js Image component or other optimized image solutions for the `backgroundImage`
- For multiple cards, consider implementing virtualization for better performance

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Your Name]

---

This component was inspired by the [apple-tv-card](https://github.com/marcreichel/apple-tv-card) library.