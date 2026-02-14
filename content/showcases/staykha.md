---
title: "Staykha - Case Study"
description: "Deep dive into the architecture, challenges, and solutions of building Staykha."
project: "Staykha"
date: 2025-02-14
tags: ["react", "elysia", "postgresql", "full-stack"]
cover: "/img/showcase/staykha.webp"
github: ""
demo: "https://www.staykha.com"
---

# Staykha - Case Study

## Overview

Staykha is a complete dormitory and rental property management system that helps property owners save time and increase efficiency.

## The Problem

Property owners in Thailand often struggle with:
- Manual rent tracking (spreadsheets, notebooks)
- Late payment notifications
- Tenant communication
- Maintenance request management

## The Solution

A unified platform that handles:
- 🏠 Property & room management
- 👥 Tenant onboarding & profiles
- 💰 Automated rent billing & payment tracking
- 📱 Notifications (Line, Email)
- 📊 Financial reports & analytics

## Architecture

### Tech Stack

```
Frontend:     React 18 + Vite + Tailwind + shadcn/ui
Backend:      Elysia (Bun runtime)
Database:     PostgreSQL + Supabase
Auth:         Supabase Auth
Storage:      Supabase Storage
Deployment:   Fly.io (API) + Vercel (Web)
```

### Database Schema

```sql
-- Core tables
properties (id, name, address, owner_id)
rooms (id, property_id, room_number, rent_amount)
tenants (id, name, phone, email, line_id)
leases (id, room_id, tenant_id, start_date, end_date)
payments (id, lease_id, amount, due_date, paid_at)
```

## Key Features

### 1. Multi-tenancy Support
Each property owner can manage multiple properties with isolated data.

### 2. Automated Billing
Monthly rent bills are auto-generated and sent via Line Notify.

### 3. Real-time Updates
Using Supabase Realtime for instant updates across devices.

## Challenges & Solutions

### Challenge: Bun Ecosystem Maturity
Some libraries weren't Bun-compatible.

**Solution:** Used native Bun APIs where possible, contributed to open source for fixes.

### Challenge: Thai Language Support
Thai text handling in PDF generation.

**Solution:** Embedded Thai fonts in the PDF service.

## Results

- ⚡ 5x faster API responses vs previous Node.js prototype
- 💰 Reduced deployment costs by 40%
- 🚀 99.9% uptime since launch

## Future Plans

1. Mobile app (React Native)
2. AI-powered rent prediction
3. Integration with Thai banking APIs
