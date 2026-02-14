---
title: "Understanding Ownership in Rust"
description: "A beginner-friendly guide to Rust's ownership system and why it matters."
topic: "Rust"
difficulty: "beginner"
date: "2026-01-20"
prerequisites: ["Basic programming knowledge", "Command line basics"]
tags: ["rust", "memory-management", "systems-programming"]
published: true
---

## What is Ownership?

Rust's ownership system is what makes the language unique. It allows Rust to guarantee memory safety without needing a garbage collector.

## The Three Rules

1. Each value in Rust has a variable that's called its **owner**
2. There can only be **one owner** at a time
3. When the owner goes out of scope, the value will be **dropped**

## Example

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // s1 is moved to s2
    
    // This won't compile!
    // println!("{}", s1);
    
    println!("{}", s2); // This works
}
```

## Borrowing

Instead of transferring ownership, we can borrow values:

```rust
fn main() {
    let s = String::from("hello");
    calculate_length(&s); // Borrow s
    println!("{}", s);    // s is still valid!
}

fn calculate_length(s: &String) -> usize {
    s.len()
}
```

## Key Takeaways

- Ownership prevents data races at compile time
- Borrowing lets you use values without taking ownership
- The compiler enforces all rules

## Resources

- [The Rust Book](https://doc.rust-lang.org/book/)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)
