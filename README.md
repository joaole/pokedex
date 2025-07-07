# Pokedex Application

This is a Pokedex application built with Next.js, TypeScript, and Tailwind CSS, utilizing the PokeAPI to display information about various Pokémon.

## Features

- Browse a list of Pokémon.
- View detailed information for each Pokémon, including stats, abilities, and types.
- Search for specific Pokémon.
- Infinite scrolling for a seamless browsing experience.

## Technologies Used

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Shadcn UI
- **Data Fetching:** PokeAPI

## Setup Instructions

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Ensure you have the following installed:

- Node.js (LTS version recommended)
- npm or Yarn

### Installation

1.  **Clone the repository (if you haven't already):**

    ```bash
    git clone https://github.com/your-username/pokedex.git
    cd pokedex
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `app/`: Contains the Next.js pages and layout.
- `components/`: Reusable UI components.
- `lib/`: Utility functions and API integration logic.
- `public/`: Static assets.
- `types/`: TypeScript type definitions.

## Usage

- Navigate through the Pokémon list by scrolling down.
- Click on a Pokémon card to view its detailed page.
- Use the search bar to find Pokémon by name or ID.

## API

This application fetches Pokémon data from the [PokeAPI](https://pokeapi.co/).

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for utility-first styling and [Shadcn UI](https://ui.shadcn.com/) for pre-built, customizable UI components.