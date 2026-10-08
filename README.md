# Astro Blog with ScaleKit Integration

This is a sample Astro blog site starter from the [Astro Tutorial](https://docs.astro.build/en/tutorial/0-introduction/). It demonstrates how ScaleKit (https://docs.scalekit.com/authenticate/fsa/quickstart/) can be easily integrated for authentication.

Scalekit provides auth and actions on behalf of users, with 500+ connectors and 20,000+ tools.

## Features

- Complete blog implementation following the Astro "Build a Blog" tutorial
- ScaleKit authentication integration with:
  - Login/logout functionality
  - Protected API routes
  - User session management
  - Server-side rendering with Astro's Node adapter

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Configure your ScaleKit credentials in environment variables (see `.env.example`)

3. Start the development server:
```bash
pnpm dev
```

## ScaleKit Integration

This project demonstrates how to:
- Configure ScaleKit with Astro's server-side rendering
- Set up authentication middleware
- Create protected API endpoints
- Display user information in the UI
- Handle login/logout flows

For more details on integrating ScaleKit, visit the [ScaleKit Quickstart Guide](https://docs.scalekit.com/authenticate/fsa/quickstart/).

## Tutorial Progress

This branch contains the state of the project after completing the basic tutorial, [Unit 6.3](https://docs.astro.build/en/tutorial/6-islands/3/), with additional ScaleKit authentication features added.
