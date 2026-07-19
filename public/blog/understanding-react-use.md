---
title: Understanding React's 'use' Hook
summary: React 'use' is a modern React API that lets components directly consume promises and context during rendering, simplifying asynchronous data handling through Suspense and Server Components.
date: 2026-07-15
topics:
  - React
ai: true
---

React has been steadily evolving toward a model where components can work more naturally with asynchronous data and external resources. One of the most significant additions in modern React is the `use()` API, a new primitive designed to simplify how components consume promises and context values.

Unlike traditional hooks such as `useState()` and `useEffect()`, `use()` changes the way developers think about asynchronous rendering. It allows components to directly read values during rendering, enabling cleaner code patterns and better integration with React Server Components.

This article explores what React `use()` is, how it works, when to use it, and how it changes common React development patterns.

## What Is React `use()`?

`use()` is a React API that allows components to read resources such as promises or context values during rendering.

A simplified example looks like this:

```jsx
import { use } from "react";

function UserProfile({ userPromise }) {
  const user = use(userPromise);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

Instead of manually tracking loading states with `useState()` and fetching data inside `useEffect()`, the component can consume the promise directly.

When React encounters a promise that has not resolved yet, it pauses rendering and works with the Suspense mechanism to display a fallback UI.

This creates a much more declarative approach:

- Components describe what data they need.
- React manages the waiting process.
- Suspense handles loading states.

## Why Was `use()` Introduced?

Before `use()`, asynchronous data fetching in React often required patterns like this:

```jsx
function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/user")
      .then((response) => response.json())
      .then(setUser);
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return <h1>{user.name}</h1>;
}
```

Although this works, it introduces several challenges:

- Data fetching happens after the initial render.
- Loading and error states must be manually managed.
- Components become responsible for coordinating asynchronous behavior.
- Waterfall requests can easily occur.

The `use()` API moves asynchronous reading into the rendering phase, allowing React to coordinate the process.

The component becomes simpler:

```jsx
function UserProfile({ userPromise }) {
  const user = use(userPromise);

  return <h1>{user.name}</h1>;
}
```

The complexity moves into React's rendering system instead of being duplicated across every component.

## How `use()` Works With Suspense

The key feature behind `use()` is its integration with Suspense.

Consider this example:

```jsx
import { Suspense } from "react";

function App({ userPromise }) {
  return (
    <Suspense fallback={<p>Loading user...</p>}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  );
}
```

If `userPromise` has not completed, React suspends the `UserProfile` component and renders the fallback.

Once the promise resolves, React retries rendering the component with the completed value.

This creates a clean separation:

- Components define their data requirements.
- Suspense defines what users see while waiting.

This pattern is especially powerful when multiple components need different asynchronous resources.

```jsx
<Suspense fallback={<Loading />}>
  <Dashboard />
</Suspense>
```

Each component inside the tree can independently use asynchronous resources while React coordinates the rendering process.

## Using `use()` With Context

Although promises are the most commonly discussed use case, `use()` can also read context.

Traditionally, context is consumed with `useContext()`:

```jsx
const theme = useContext(ThemeContext);
```

With `use()`, the same operation becomes:

```jsx
const theme = use(ThemeContext);
```

The difference is that `use()` can be called conditionally.

For example:

```jsx
function Button({ compact }) {
  if (compact) {
    const theme = use(ThemeContext);

    return <button className={theme.button}>Compact Button</button>;
  }

  return <button>Normal Button</button>;
}
```

This is different from normal hooks, which must always be called in the same order on every render.

## `use()` Rules and Limitations

Although `use()` is more flexible than traditional hooks, it still has important rules.

### It Must Be Called During Rendering

`use()` can only be used while React is rendering a component.

You cannot call it inside event handlers:

```jsx
function Button() {
  async function handleClick() {
    const data = use(fetchData()); // Invalid
  }

  return <button onClick={handleClick}>Load</button>;
}
```

Instead, initiate the resource outside the event handler or use other state management approaches.

### Promises Should Be Stable

A common mistake is creating promises directly during rendering:

```jsx
function Component() {
  const data = use(fetch("/api/data"));

  return <div>{data}</div>;
}
```

This creates a new promise every render.

Instead, promises should typically be created in a parent component, server-side loader, or caching layer:

```jsx
function Page() {
  const dataPromise = getData();

  return <Component dataPromise={dataPromise} />;
}
```

Frameworks such as Next.js provide built-in patterns for managing these resources efficiently.

## `use()` in React Server Components

The biggest impact of `use()` is in React Server Components.

Frameworks such as Next.js App Router allow server components to directly await data:

```jsx
async function Page() {
  const posts = await getPosts();

  return <PostList posts={posts} />;
}
```

However, when passing promises between server and client components, `use()` becomes useful:

```jsx
export default function Page() {
  const postsPromise = getPosts();

  return <PostList postsPromise={postsPromise} />;
}
```

Then:

```jsx
"use client";

import { use } from "react";

function PostList({ postsPromise }) {
  const posts = use(postsPromise);

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

This allows data fetching to begin earlier while still allowing client components to consume the result.

## Comparing `use()` and `useEffect()`

The two APIs solve different problems.

| Feature             | `use()`                               | `useEffect()`                 |
| ------------------- | ------------------------------------- | ----------------------------- |
| Purpose             | Read resources during render          | Run side effects after render |
| Data fetching       | Excellent for Suspense-based fetching | Traditional approach          |
| Browser APIs        | Not suitable                          | Suitable                      |
| Event subscriptions | Not suitable                          | Suitable                      |
| Loading states      | Handled through Suspense              | Manually implemented          |

`use()` does not replace `useEffect()`.

Effects are still necessary for operations such as:

- Subscribing to browser events.
- Connecting to external services.
- Updating non-React systems.

However, fetching data purely to display UI is increasingly moving toward Suspense and `use()` patterns.

## The Future of React Data Fetching

React `use()` represents a shift toward a more declarative programming model.

Instead of writing:

1. Start a request.
2. Store loading state.
3. Store error state.
4. Update state when finished.
5. Render the result.

Developers can describe the dependency:

```jsx
const data = use(resource);
```

React then coordinates rendering, scheduling, and loading behavior.

This aligns with React's broader direction: components should describe UI based on available data, while the framework manages when and how that UI appears.
