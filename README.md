# VitalSync - Next.js Health Tracking Dashboard

This is a Next.js application designed to replicate the UI/UX of the VitalSync health tracking dashboard.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Chart.js

## Getting Started

1.  **Clone the repository (or ensure you have these files).**

2.  **Navigate to the project directory:**
    ```bash
    cd vitalsync-nextjs-app
    ```

3.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Using yarn:
    ```bash
    yarn install
    ```
    Using pnpm:
    ```bash
    pnpm install
    ```

4.  **Initialize shadcn/ui (if not already configured by Cascade):
    **This step is crucial for adding shadcn/ui components. You might be prompted to configure `tailwind.config.js`, `globals.css`, etc. Review these choices carefully. Refer to the official shadcn/ui documentation for detailed instructions.
    ```bash
    npx shadcn-ui@latest init
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

-   `app/`: Contains all the routes, pages, and layouts.
    -   `app/layout.tsx`: The main layout file.
    -   `app/globals.css`: Global stylesheets.
    -   `app/(pages)/`: Convention for page routes (e.g., `app/dashboard/page.tsx`).
-   `components/`: Shared React components.
    -   `components/ui/`: Components added via shadcn/ui CLI.
    -   `components/shared/`: Custom shared components (e.g., Sidebar, PageHeader).
-   `lib/`: Utility functions (e.g., `lib/utils.ts` for `cn` function).
-   `public/`: Static assets.

## Further Development

-   Add new pages under the `app/` directory.
-   Use the shadcn/ui CLI to add more UI components: `npx shadcn-ui@latest add [component-name]`.
-   Develop custom components in the `components/shared/` directory.
-   Implement API routes and data fetching logic as needed.
