# Memory Card Game

A React + TypeScript memory card game built with Vite and Tailwind CSS. The game fetches GIF images from the Giphy API and challenges players to select all unique cards without clicking the same card twice.

## How the Game Works

### Objective

Click on cards to select them, but don't click the same card twice! The cards reshuffle after every click, so you need to remember which ones you've already selected.

### Game Flow

1. **Menu Screen** - Choose a deck (search term for GIFs) and difficulty level
2. **Difficulty Options:**
   - Easy: 4 cards to remember
   - Medium: 8 cards to remember
   - Hard: 12 cards to remember
3. **Playing** - Click cards one at a time. After each click, cards reshuffle to new positions
4. **Win** - Successfully select all unique cards without repeating
5. **Lose** - Click a card you've already selected

## Coding Features & Concepts Used

### React Hooks

**useState** - Managing component state

```tsx
const [playing, setPlaying] = useState(false);
const [selectedCards, setSelectedCards] = useState<string[]>([]);
```

**useEffect** - Side effects like API calls and initialization

```tsx
// Fetch data on component mount (empty dependency array)
useEffect(() => {
  fetchDecks();
}, []);

// Shuffle cards once when game starts
useEffect(() => {
  shuffleCards();
}, []);
```

### API Integration with fetch and async/await

Fetching GIFs from the Giphy API:

```tsx
const response = await fetch(
  `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${term}&limit=20`,
);
const data = await response.json();
```

### Promise.all for Parallel Requests

Fetching multiple decks simultaneously:

```tsx
const results = await Promise.all(
  searchTerms.map(async (term) => {
    const response = await fetch(url);
    const data = await response.json();
    return [term, data.data.map((gif) => gif.images.preview_gif.url)];
  }),
);
```

### Object.fromEntries()

Converting an array of key-value pairs into an object:

```tsx
const decks = Object.fromEntries(results);
// Turns [["cats", [...urls]], ["dogs", [...urls]]]
// into { cats: [...urls], dogs: [...urls] }
```

### Array Methods

**map()** - Transforming arrays

```tsx
deck.map((card, index) => (
  <Card key={index} card={card} onClick={handleClick} />
));
```

**includes()** - Checking if item exists in array

```tsx
if (selectedCards.includes(clickedCard)) {
  setResult("lost");
}
```

**slice()** - Getting a portion of an array

```tsx
const gameDeck = fullDeck.slice(0, numberOfCards);
```

**fill()** - Creating arrays with placeholder values (used for loops)

```tsx
Array(20).fill(null).map((_, i) => /* ... */)
```

### Component Composition

Parent components pass data and callbacks to children:

```tsx
// App.tsx passes deck and callbacks to Game
<Game
  deck={decks[selectedDeck]}
  difficulty={selectedDifficulty}
  setPlaying={setPlaying}
/>

// Game.tsx passes individual card data to Card
<Card card={cardUrl} onClick={() => handleCardClick(cardUrl)} />
```

### Conditional Rendering

Showing different UI based on state:

```tsx
{
  playing ? <Game deck={deck} /> : <MenuScreen />;
}

{
  result && <EndScreen result={result} />;
}
```

### Dynamic Styling with Template Literals

Changing styles based on props/state:

```tsx
className={`border-4 ${
  result === "lost"
    ? "bg-red-900/50 border-red-500"
    : "bg-green-900/50 border-green-500"
}`}
```

---

## Styling Concepts (Tailwind CSS)

### Glassmorphism Effect

Combining backdrop blur with semi-transparent backgrounds:

```css
backdrop-blur-3xl bg-white/10 border-white/20
```

### Custom CSS Variables

Responsive spacing that changes at breakpoints:

```css
@theme {
  --spacing-gutter: 1rem;
}
@media (min-width: 640px) {
  :root {
    --spacing-gutter: 2rem;
  }
}
```

### Hover Transitions

Smooth animations on hover:

```css
hover: -translate-y-2 transition-all duration-200;
```

### Aspect Ratio

Maintaining card proportions:

```tsx
style={{ aspectRatio: "3/4" }}
```

---

## Card Shuffle Algorithm

A simple shuffle that picks random cards without duplicates:

```tsx
function shuffleCards() {
  const shuffled: string[] = [];
  while (shuffled.length < displayedCards.length) {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const card = deck[randomIndex];
    if (!shuffled.includes(card)) {
      shuffled.push(card);
    }
  }
  setDisplayedCards(shuffled);
}
```

---

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety (relaxed mode for learning)
- **Vite** - Build tool with hot module replacement
- **Tailwind CSS 4** - Utility-first styling
- **Giphy API** - Dynamic GIF content

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## Key Takeaways

1. **useState vs useEffect** - useState holds data, useEffect runs side effects
2. **Empty dependency array `[]`** - Effect runs once on mount
3. **Prop drilling** - Passing data/callbacks through component hierarchy
4. **Controlled components** - React state drives what's displayed
5. **Async/await** - Clean way to handle promises and API calls
6. **Array methods** - map, filter, includes, slice are essential for React
