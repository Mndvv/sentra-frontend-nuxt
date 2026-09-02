# Contributing to Sentra Frontend

First off, thank you for considering contributing to the Sentra Frontend repository! It's people like you that make our engineering ecosystem such a great environment to build in. 

We follow a standardized workflow to ensure that the codebase remains stable, maintainable, and highly performant.

## Development Process

1. **Find an Issue**: Look for open issues labeled `good first issue` or `help wanted` if you're not sure where to start. If you want to work on a new feature, please open an issue first to discuss it with the core team.
2. **Fork and Branch**: 
   - Fork the repository.
   - Create a branch for your feature or bug fix: `git checkout -b feature/your-feature-name` or `fix/your-fix-name`.
3. **Develop**: Write your code, ensuring it aligns with our architecture and guidelines.
4. **Test**: Run all local tests and linters before committing.
   ```bash
   npm run lint
   npm run test
   ```
5. **Commit**: Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for your commit messages.
   - `feat: add new dashboard widget`
   - `fix: resolve hydration mismatch on user profile`
6. **Push and PR**: Push your branch to your fork and submit a Pull Request against the `main` branch.

## Pull Request Guidelines

- **Title**: Ensure your PR title follows Conventional Commits format.
- **Description**: Fill out the provided PR template entirely. Explain *why* you are making the change, not just *what* you changed.
- **Reviews**: At least one core maintainer must review and approve your PR before it can be merged.
- **CI/CD**: All automated checks (linting, tests, build verifications) must pass.

## Coding Standards

- **Vue & Nuxt Best Practices**: Follow the official Vue 3 Style Guide. Use the Composition API (`<script setup>`) for all new components.
- **Formatting**: We enforce code formatting via Prettier. Your PR will fail CI if it is not formatted correctly.
- **Types**: We strongly encourage the use of TypeScript for state, props, and API definitions to ensure type safety across the frontend.

## Local Setup

Please refer to the `README.md` for detailed instructions on getting the development server up and running.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md). Please report any unacceptable behavior to our team.

---
We appreciate your time and effort in making Sentra Frontend better!
