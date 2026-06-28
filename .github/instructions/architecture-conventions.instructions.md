---
name: architecture-conventions
applyTo: "src/**/*.{ts,tsx}"
description: "Use when: writing new components, hooks, or services. Establishes conventions for state management, error handling, and architecture patterns to maintain consistency and reduce technical debt."
---

# Architecture & Conventions Guide

## State Management

### Rule 1: Use Contexts Only for Truly Global State

**Good:**

- Theme/color mode
- Authentication state
- User session info

**Bad:**

- Feature-specific data (use React Query or local hooks instead)
- Temporary UI state
- Data that belongs to a single page or feature

**Implementation:**

```tsx
// ✅ Correct: Feature-specific state stays local or in React Query
const [filters, setFilters] = useState(...)  // local state

// ❌ Wrong: Don't put library-specific data in global context
// AppContext should NOT contain: animeLibrary, torrentLibrary, requests, etc.
```

### Rule 2: Use Domain-Specific Operations Hooks

Each domain (user, anime library, torrents, requests) has a dedicated hook for consistent state management.

**Available hooks:**

- `useUserOperations()` — user auth, profile, cache invalidation
- `useAnimeLibraryOperations()` — library CRUD, cache management
- `useTorrentLibraryOperations()` — torrent tracking, cache management
- `useRequestsOperations()` — request list management

**Example:**

```tsx
import { useAnimeLibraryOperations } from "@/hooks/context/useAnimeLibraryOperations"

const MyComponent = () => {
  const { library, libraryState, updateAnimeInLibrary, removeAnimeFromLibrary } = useAnimeLibraryOperations()

  return <>{libraryState.isEmpty ? <p>Librairie vide</p> : <List items={library} />}</>
}
```

---

## Error Handling

### Standardized Error Format

All API errors are normalized into `StandardizedError` with:

- **type**: `ErrorType.NETWORK | UNAUTHORIZED | FORBIDDEN | NOT_FOUND | CONFLICT | SERVER_ERROR | UNKNOWN`
- **message**: User-friendly French message
- **statusCode**: HTTP status (if applicable)
- **originalError**: Original API error for debugging

### Rule 3: Use standardizeError() for API Error Responses

**Implementation in hooks:**

```tsx
import { standardizeError, requiresReAuth, isRecoverableError } from "@/services/errorHandling"

const { mutate: updateAnime } = useMutation({
  mutationFn: async (anime: AnimeDTO) => {
    // Your API call
  },
  onError: error => {
    const standardError = standardizeError(error)

    if (requiresReAuth(standardError)) {
      enqueueSnackbar(standardError.message, { variant: "warning" })
      redirectToLogin()
      return
    }

    if (isRecoverableError(standardError)) {
      enqueueSnackbar("Veuillez réessayer", { variant: "info" })
    } else {
      enqueueSnackbar(standardError.message, { variant: "error" })
    }
  }
})
```

### Rule 4: Don't Show 404 Errors to Users

404s indicate missing resources, not user errors. Silently handle or redirect:

```tsx
if (standardError.type === ErrorType.NOT_FOUND) {
  redirect("/library") // or show empty state
  return
}
```

---

## Component Architecture

### Rule 5: Split Concerns — Presentational vs Logic

**Presentational Component:**

```tsx
// Pure component, no hooks or API calls
interface AnimeCardProps {
  anime: AnimeDTO
  onUpdate: (anime: AnimeDTO) => void
  onDelete: (malId: number) => void
}

export const AnimeCard = ({ anime, onUpdate, onDelete }: AnimeCardProps) => {
  return <Card>{/* JSX */}</Card>
}
```

**Container Component (with logic):**

```tsx
// Brings data and mutations
export const AnimeCardContainer = ({ animeMalId }: { animeMalId: number }) => {
  const { data: anime } = useQuery(...)
  const { mutate: updateAnime } = useMutation(...)
  const { mutate: deleteAnime } = useMutation(...)

  return (
    <AnimeCard
      anime={anime}
      onUpdate={updateAnime}
      onDelete={deleteAnime}
    />
  )
}
```

### Rule 6: Extract Complex Logic into Custom Hooks

If a component has >80 lines or multiple `useEffect`/`useState`, extract logic:

```tsx
// Before: 120+ lines in component
const MyPage = () => {
  const [data, setData] = useState(...)
  const [loading, setLoading] = useState(...)
  // ... many more useState/useEffect
}

// After: Clean component + custom hook
const useMyPageLogic = () => {
  // Extract all logic here
  return { data, loading, ... }
}

const MyPage = () => {
  const { data, loading } = useMyPageLogic()
  return <div>{/* Simple JSX */}</div>
}
```

---

## Testing

### Rule 7: Test User Behavior, Not Implementation

**❌ Bad: Tests the implementation**

```tsx
it("calls setAnimeLibrary when data loads", () => {
  render(<MyComponent />)
  expect(mockSetAnimeLibrary).toHaveBeenCalled()
})
```

**✅ Good: Tests what the user sees**

```tsx
it("displays the anime list after loading", async () => {
  render(<MyComponent />)
  await waitFor(() => {
    expect(screen.getByText("Anime Title")).toBeInTheDocument()
  })
})
```

### Rule 8: Prioritize Critical User Flows

Write integration tests for:

1. Authentication / login
2. Search functionality
3. Library CRUD operations
4. Torrent tracking
5. Request submission

---

## Naming Conventions

| Type            | Pattern                 | Example                              |
| --------------- | ----------------------- | ------------------------------------ |
| Context         | `[Domain]Context`       | `UserContext`, `AnimeTorrentContext` |
| Context Hook    | `use[Domain]Context`    | `useUserContext()`                   |
| Operations Hook | `use[Domain]Operations` | `useAnimeLibraryOperations()`        |
| Service         | `[Domain]Service`       | `AnimeService`, `TorrentService`     |
| DTO             | `[Domain]DTO`           | `AnimeDTO`, `RequestDTO`             |
| Provider        | `[Domain]Provider`      | `AppProvider`, `UserProvider`        |
| Component       | `PascalCase`            | `AnimeCard`, `LibraryView`           |

---

## File Organization

```
src/
├── context/           # Global state providers (auth, theme, etc.)
│   ├── AppProvider.tsx
│   ├── QueryClientProvider.tsx
│   └── useAppState.ts
├── hooks/
│   ├── context/       # Hooks for context & state management
│   │   ├── useUserOperations.ts
│   │   ├── useAnimeLibraryOperations.ts
│   │   └── useRequestsOperations.ts
│   ├── components/    # Hooks used by components (internal)
│   └── containers/    # Hooks used by pages/features
├── services/          # API layer
│   ├── errorHandling.ts
│   └── AnimeService.ts
├── interfaces/        # TypeScript types
└── components/        # React components
```

---

## Quick Checklist

When adding a new feature:

- [ ] Is state truly global or can it live locally/in React Query?
- [ ] Does the error handling use `standardizeError()`?
- [ ] Are 404 errors silently handled?
- [ ] Is logic extracted from presentational components?
- [ ] Are operations grouped in a domain-specific hook?
- [ ] Does naming follow conventions?
- [ ] Is there a test for the user-facing behavior?
- [ ] Is the component under 80 lines (if possible)?
