# VitalSync - Comprehensive Health & Wellness Tracker

VitalSync is a modern, user-friendly web application designed to help you monitor and manage various aspects of your health and wellness. It features an engaging landing page and a detailed dashboard for tracking metrics from sleep patterns to vital health statistics.

## Features

* **Dynamic Landing Page:**
  * **Interactive Particle Background:** A visually appealing background using `react-tsparticles` that subtly animates and reacts to mouse movement.
  * **Engaging Hero Section:** Clear value proposition with an animated gradient title and direct calls to action.
  * **"Why VitalSync?" Section:** Highlights core benefits using feature cards.
  * **"A Note on VitalSync":** Provides context on the project's vision for consolidating data from multiple wearables and clarifies the current status of dashboard data (see below).
  * **Personalized Footer:** Includes project attribution and links to the developer's GitHub and LinkedIn profiles.

* **Interactive Dashboard:** Get a quick overview of your latest health data and trends.
  * _Note: Currently, all data displayed within the dashboard is for visual and demonstrative purposes only. Full integration capabilities are under development._
* **Sleep Tracking:**
  * Log daily sleep with details: date, bedtime, wake-up time, total sleep, and personal notes.
  * Assess sleep quality (Good, Okay, Poor).
  * **Optional Dream Analysis:** Log and reflect on your dreams, with a nod to Freudian psychology for deeper self-understanding. Includes informational resources.
  * View a comprehensive Sleep Log in a sortable table.
  * Visualize sleep goal progress with a radial chart.
  * Analyze Sleep Trends with bar charts.
  * (Placeholder for Sleep Stages breakdown).
  * Access actionable Sleep Insights with a 'View All' modal for more details.
* **Health Metrics Monitoring:**
  * Track Blood Pressure (Systolic, Diastolic, Pulse).
  * Log Weight.
  * (Placeholder for custom metric tracking).
  * Visualize trends for various health metrics.
* **Activity Tracking:**
  * (Placeholder for weekly activity chart).
* **User Profile & Settings:**
  * (Placeholders for user profile management and application settings).
* **Theme Customization:** Switch between Light and Dark modes for comfortable viewing. (Currently experiencing a minor theme application inconsistency being addressed).
* **Responsive Design:** Access your health data seamlessly across devices.

## Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (v14+ with App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **UI Library:** [React](https://reactjs.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **UI Components:** [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed, accessible components.
* **Forms:** [React Hook Form](https://react-hook-form.com/) for performant and flexible form handling.
* **Schema Validation:** [Zod](https://zod.dev/) for robust data validation.
* **Charts:** [Recharts](https://recharts.org/) for interactive data visualizations.
* **Interactive Background:** [`@tsparticles/react`](https://github.com/matteobruni/tsparticles) with [`@tsparticles/slim`](https://github.com/matteobruni/tsparticles) engine for lightweight particle animations.
* **Date & Time:** [date-fns](https://date-fns.org/) for date manipulation and formatting.
* **Icons:** [Lucide React](https://lucide.dev/) & [Radix Icons](https://www.radix-ui.com/icons) for a clean and modern icon set.

## Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

* Node.js (v18.x or later recommended)
* npm (comes with Node.js) or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Professor833/VitalSync.git
cd VitalSync
```

2. Install dependencies:

```bash
npm install
# or
# yarn install
```

3. Run the development server:

```bash
npm run dev
# or
# yarn dev
```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Linting

This project uses ESLint for code quality and consistency. To run the linter:

```bash
npm run lint
# or
# yarn lint
```

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Professor833/VitalSync/issues).
