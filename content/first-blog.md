---
title: "Building a Modern Portfolio with Nuxt 4"
description: "How I rebuilt my portfolio with Nuxt 4, focusing on performance, accessibility, and smooth animations."
date: 2025-02-03
tags:
  - nuxt
  - vue
  - portfolio
  - performance
cover: /img/showcase/sayonstream.svg
---

# Building a Modern Portfolio with Nuxt 4

I recently rebuilt my portfolio from the ground up using **Nuxt 4**, the latest version of the powerful Vue framework. This post shares the key decisions, technologies, and lessons learned during the process.

## Why Nuxt 4?

Nuxt 4 brings significant improvements that made it the perfect choice for my portfolio:

- **Better performance** with enhanced tree-shaking and smaller bundles
- **Improved developer experience** with faster HMR and clearer error messages
- **Native TypeScript support** for type-safe development
- **Powerful data fetching** with `useFetch` and `useAsyncData`
- **SEO-friendly** with automatic meta tag management

## Key Features of My Portfolio

### Smooth Animations with Motion

I integrated `@vueuse/motion` for performant, accessible animations that respect user preferences:

```vue
<div
  v-motion
  :initial="{ opacity: 0, y: 20 }"
  :enter="{ opacity: 1, y: 0 }"
  :transition="{ duration: 0.5 }"
>
  Content here
</div>
```

### Responsive Design System

Built with UnoCSS and a custom design token system:

- **Fluid typography** using `clamp()` for seamless scaling
- **Container queries** for component-level responsiveness
- **Dark mode** with CSS custom properties
- **Mobile-first** approach for better performance

### Accessibility First

Every component was built with accessibility in mind:

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Reduced motion support for animations
- Skip links for screen readers

## Performance Optimizations

1. **Lazy loading** for images and components
2. **Font optimization** with `font-display: swap`
3. **Image optimization** with Nuxt Image
4. **Code splitting** by route
5. **Static generation** for fast initial loads

## Lessons Learned

### 1. Start with a Design System

Having a clear set of design tokens (colors, spacing, typography) from the start saved countless hours of refactoring later.

### 2. Test on Real Devices

Simulators don't catch all responsive issues. Testing on actual phones and tablets revealed issues I would have missed.

### 3. Performance Budgets Matter

Setting performance budgets early helped maintain fast load times as the project grew.

## What's Next

I'm continuing to improve the portfolio with:

- More case studies of shipped projects
- Blog posts about specific technical challenges
- Integration with a headless CMS for easier content management

## Conclusion

Rebuilding my portfolio with Nuxt 4 was a rewarding experience. The framework's conventions and developer experience allowed me to focus on design and content rather than boilerplate code.

If you're considering a portfolio rebuild, I highly recommend giving Nuxt 4 a try. The combination of Vue's reactivity, Nuxt's conventions, and the vibrant ecosystem makes it an excellent choice for modern web development.

---

*Have questions about the rebuild? Feel free to [reach out](mailto:contact@pachorn.dev)!*
