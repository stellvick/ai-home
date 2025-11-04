<!--
Sync Impact Report
==================
Version change: N/A → 1.0.0
List of modified principles: All 5 principles replaced with clean code focus
Added sections: Development Standards, Code Review Process
Removed sections: None
Templates requiring updates: ✅ .specify/templates/plan-template.md (Constitution Check section updated)
Follow-up TODOs: None
-->

# AI Home Constitution

## Core Principles

### I. Simplicity First
Code must prioritize simplicity over complexity. Every implementation should start with the simplest possible solution that meets requirements. Complexity must be justified and introduced only when necessary. Avoid over-engineering and premature optimization.

### II. Clear Naming
All identifiers (variables, functions, classes, files) must use descriptive, meaningful names that clearly convey their purpose. Abbreviations should be avoided unless they are universally understood in the domain. Names should be consistent across the codebase.

### III. Single Responsibility
Each function, class, and module must have exactly one reason to change. Functions should perform one clear task, classes should represent one concept, and modules should contain related functionality. This principle ensures maintainability and testability.

### IV. DRY Principle
Don't Repeat Yourself - eliminate code duplication through appropriate abstractions. When similar code appears in multiple places, it must be refactored into reusable functions, classes, or modules. Shared logic should be centralized.

### V. Readability
Code must be self-documenting and easy to understand. Use clear structure, consistent formatting, and logical organization. Comments should explain why, not what. Code should read like well-written prose.

## Development Standards

All code must follow modern language conventions and best practices. Use type hints where available, follow established style guides (PEP 8 for Python, Airbnb for JavaScript, etc.), and maintain consistent code formatting. Dependencies should be minimal and well-maintained.

## Code Review Process

All code changes require review before merging. Reviews must verify compliance with clean code principles, check for code duplication, ensure proper naming conventions, and validate that complexity is justified. Reviewers should focus on readability and maintainability rather than personal preferences.

## Governance

This constitution establishes the fundamental principles for code quality and development practices in the AI Home project. All team members are responsible for upholding these principles in their work. Amendments to this constitution require consensus among all active contributors and must maintain or improve code quality standards.

**Version**: 1.0.0 | **Ratified**: 2025-11-04 | **Last Amended**: 2025-11-04
