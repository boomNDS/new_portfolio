---
title: "Staykha: Getting Started with the Architecture"
description: "Breaking down the initial architecture decisions for the Staykha property management system."
project: "Staykha"
date: "2026-01-15"
progress: 15
milestone: true
tags: ["architecture", "planning", "vite", "react"]
published: true
---

## Project Overview

Staykha is a comprehensive property management system designed specifically for dormitories and rental properties in Thailand. This dev log series will document the journey from concept to deployment.

## Initial Architecture Decisions

### Frontend Stack
- **Vite**: For blazing fast development and optimized builds
- **React 18**: With TypeScript for type safety
- **TanStack Query**: For efficient server state management
- **shadcn/ui**: For consistent, accessible UI components

### Backend Stack
- **ElysiaJS**: High-performance Bun framework
- **PostgreSQL**: Reliable relational database
- **Redis**: For caching and session management

### Why This Stack?

I chose this stack because:
1. **Performance**: Bun + Elysia offers incredible speed
2. **Type Safety**: End-to-end TypeScript
3. **Developer Experience**: Vite's HMR and Bun's fast startup

## Current Progress

- [x] Project scaffolding
- [x] Database schema design
- [x] API contract definition
- [ ] Authentication system
- [ ] Property CRUD operations

## Challenges Faced

The biggest challenge so far has been deciding on the database schema for flexible property types (dorms vs apartments). I'm leaning toward a JSONB column for extensible attributes while keeping core fields normalized.

## Next Steps

1. Set up the development environment
2. Implement JWT authentication
3. Create the property management dashboard

Stay tuned for the next update!
