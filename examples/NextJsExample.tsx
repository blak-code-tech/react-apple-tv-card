import React, { useState } from 'react';
import AppleTVCard from '../src/AppleTVCard';

// Define an interface for our card data
interface CardData {
    id: number;
    title: string;
    image: string;
    content: React.ReactNode;
    noShadow?: boolean;
    noReflection?: boolean;
    alwaysShowTitle?: boolean;
}

const NextJsExample: React.FC = () => {
    // Sample data for the cards
    const cards: CardData[] = [
        {
            id: 1,
            title: "Nature Scene",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
            content: (
                <div
                    style={{
                        width: '5em',
                        height: '5em',
                        border: '1em dashed white',
                        borderRadius: '50%',
                        opacity: 0.8
                    }}
                />
            )
        },
        {
            id: 2,
            title: "City Skyline",
            image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df",
            content: (
                <div style={{
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}>
                    EXPLORE
                </div>
            ),
            noReflection: true
        },
        {
            id: 3,
            title: "Mountain Range",
            image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
            content: (
                <div style={{
                    padding: '1rem',
                    background: 'rgba(0,0,0,0.6)',
                    color: 'white',
                    borderRadius: '0.5rem',
                    maxWidth: '60%',
                    textAlign: 'center'
                }}>
                    <h3 style={{ margin: '0 0 8px 0' }}>Epic Views</h3>
                    <p style={{ margin: 0 }}>Visit our mountains</p>
                </div>
            ),
            noShadow: true,
            alwaysShowTitle: true
        }
    ];

    const [clickedCard, setClickedCard] = useState<number | null>(null);

    const handleCardClick = (id: number): void => {
        setClickedCard(id === clickedCard ? null : id);
    };

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            background: '#f0f0f0'
        }}>
            <h1>Apple TV-style Cards with React and TypeScript</h1>
            <p>A React/Next.js implementation of the Apple TV card effect with 3D rotation and parallax movement.</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
                {cards.map((card) => (
                    <AppleTVCard
                        key={card.id}
                        title={card.title}
                        backgroundImage={card.image}
                        width={320}
                        withShadow={!card.noShadow}
                        withReflection={!card.noReflection}
                        alwaysShowTitle={card.alwaysShowTitle}
                        onClick={() => handleCardClick(card.id)}
                    >
                        {card.content}
                    </AppleTVCard>
                ))}
            </div>

            <h2>Variants and Options</h2>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
                {/* Square Card (no rounded corners) */}
                <AppleTVCard
                    title="Square Card"
                    backgroundImage="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee"
                    width={280}
                    rounded={false}
                >
                    <div style={{
                        padding: '0.8rem',
                        background: 'rgba(0,0,0,0.6)',
                        color: 'white',
                        maxWidth: '80%',
                        textAlign: 'center'
                    }}>
                        <p>No rounded corners</p>
                    </div>
                </AppleTVCard>

                {/* Wide Card (custom aspect ratio) */}
                <AppleTVCard
                    title="Wide Format (21:9)"
                    backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
                    width={420}
                    height={180}
                >
                    <div style={{
                        padding: '0.8rem',
                        background: 'rgba(255,255,255,0.8)',
                        color: 'black',
                        borderRadius: '8px',
                        maxWidth: '70%',
                        textAlign: 'center'
                    }}>
                        <p>Custom aspect ratio</p>
                    </div>
                </AppleTVCard>
            </div>

            {/* Card without a background image */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <AppleTVCard
                    title="Gradient Background"
                    width={320}
                    height={200}
                >
                    <div style={{
                        color: 'white',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                    }}>
                        No background image<br />
                        <span style={{ fontSize: '1rem', opacity: 0.8 }}>
                            Uses default gradient
                        </span>
                    </div>
                </AppleTVCard>
            </div>

            {clickedCard && (
                <div style={{
                    padding: '1rem',
                    background: 'white',
                    borderRadius: '8px',
                    marginTop: '1rem',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                    <h3>Card {clickedCard} Clicked!</h3>
                    <p>You can add onClick handlers to make the cards interactive.</p>
                    <button
                        onClick={() => setClickedCard(null)}
                        style={{
                            padding: '0.5rem 1rem',
                            background: '#007AFF',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

export default NextJsExample;