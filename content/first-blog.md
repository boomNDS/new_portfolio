---
title: "Shipping Motion-First Portfolios"
description: "How I rebuilt my portfolio with motion.dev, unified themes, and a static-friendly Nuxt setup."
date: 2025-01-15
tags:
  - portfolio
  - nuxt
  - motion
  - theming
cover: /img/showcase/sayonstream.svg
---

I recently rebuilt my portfolio to focus on motion that guides users, theme consistency, and reliable static builds.

## What changed
- **Motion.dev everywhere:** hero, showcase cards, experience entries, and navbar interactions.
- **Unified tokens:** one set of light/dark colors for buttons, cards, and navigation.
- **Static-friendly:** SSR guards for client-only hooks, `DISABLE_WEBFONTS=true` in CI, and a slim content setup.

## Takeaways
- Pick a motion system that’s expressive but disciplined—short easing curves and meaningful delays beat noisy effects.
- Ship a theme token palette early; retrofitting colors is harder later.
- Guard browser-only APIs before SSR/prerender to keep `yarn generate` happy.

## What’s next
I want to expand motion patterns to micro-interactions across forms and add more long-form writeups on shipped projects.
