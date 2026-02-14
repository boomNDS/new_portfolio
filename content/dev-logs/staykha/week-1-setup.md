---
title: "Week 1: Project Setup & Architecture"
description: "Setting up the project structure, choosing the tech stack, and initial database design."
project: "Staykha"
date: 2025-01-15
tags: ["setup", "architecture", "elysia", "react"]
progress: 15
milestone: true
---

# Week 1: Project Setup & Architecture

## Tech Stack Decisions

After considering various options, I decided on:

### Frontend
- **React 18** - Familiar ecosystem, great DX
- **Vite** - Fast HMR, modern build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful pre-built components

### Backend
- **Elysia** - Type-safe, Bun-optimized, similar to FastAPI
- **PostgreSQL** - Reliable relational database
- **Supabase** - Auth + Database + Realtime in one

## Project Structure

```
staykha/
├── apps/
│   ├── web/           # React frontend
│   └── api/           # Elysia backend
├── packages/
│   ├── shared/        # Shared types & utils
│   └── ui/            # Shared UI components
└── docker-compose.yml
```

## Challenges Faced

1. **Bun vs Node:** Initially considered Node, but Bun's speed won me over
2. **Elysia Learning Curve:** Coming from FastAPI, some patterns were different
3. **Monorepo Setup:** Getting Turborepo + pnpm workspaces configured

## Next Week

Focus on authentication system with Supabase Auth and role-based access control.
