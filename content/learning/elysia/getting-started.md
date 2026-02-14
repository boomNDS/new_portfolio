---
title: "Getting Started with Elysia"
description: "My notes on learning Elysia - a TypeScript web framework optimized for Bun."
topic: "Elysia"
difficulty: beginner
date: 2025-01-20
tags: ["elysia", "bun", "typescript", "backend"]
resources:
  - title: "Elysia Official Docs"
    url: "https://elysiajs.com/"
  - title: "Bun Documentation"
    url: "https://bun.sh/docs"
---

# Getting Started with Elysia

## What is Elysia?

Elysia is a TypeScript web framework optimized for Bun runtime. It offers:
- **Type Safety** - End-to-end type safety with TypeScript
- **Performance** - Optimized for Bun's speed
- **Developer Experience** - Similar to FastAPI/Express
- **Ecosystem** - Rich plugin system

## Installation

```bash
# Create new project
bun create elysia my-app
cd my-app

# Install dependencies
bun install

# Run development server
bun run dev
```

## Basic Route

```typescript
import { Elysia } from 'elysia';

const app = new Elysia()
  .get('/', () => 'Hello World!')
  .get('/user/:id', ({ params: { id } }) => `User ${id}`)
  .listen(3000);

console.log(`Server running at ${app.server?.hostname}:${app.server?.port}`);
```

## Key Takeaways

1. **Type Inference** - Return types are automatically inferred
2. **Validation** - Built-in validation with TypeBox
3. **Plugins** - Easy to extend with plugins like `@elysiajs/cors`

## Comparison with FastAPI

| Feature | Elysia | FastAPI |
|---------|--------|---------|
| Runtime | Bun | Python/UVicorn |
| Type Safety | Native TS | Pydantic |
| Performance | ~5x faster | Fast |
| Learning Curve | Moderate | Easy |
