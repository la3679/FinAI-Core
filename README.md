# FinAI Core: Predictive Financial Modeling & Behavioral Synthesis

FinAI Core is an advanced personal finance orchestration platform built for high-precision wealth management. Unlike traditional budgeting tools that focus on historical tracking, FinAI Core leverages state-of-the-art machine learning and behavioral synthesis to provide predictive insights, overspend risk assessment, and long-term financial convergence simulations.

---

## 🏛️ Project Vision
The core philosophy of FinAI Core is **Financial Velocity**. We believe that wealth is built not just by saving, but by understanding the vectors of your spending behavior and simulating the temporal impact of today's decisions on your 5-year and 10-year financial landscape.

---

## 🚀 Technical Architecture

### Core Stack
- **Frontend Framework**: [React 19](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/) for robust type-safety and component-driven architecture.
- **Styling Engine**: [Tailwind CSS](https://tailwindcss.com/) with a custom "Cyber-Technical" design system, utilizing hardware-accelerated animations via [Motion](https://motion.dev/).
- **Data Visualization**: [Recharts](https://recharts.org/) for high-fidelity SVG rendering of temporal data and area-based wealth projections.
- **Application Logic**: [Express.js](https://expressjs.com/) backend acting as an orchestration layer between client-side requests and external intelligence services.
- **Persistence & Identity**: [Firebase](https://firebase.google.com/) for secure OAuth 2.0 authentication and [Firestore](https://firebase.google.com/docs/firestore) for real-time document-oriented data synchronization.

### Intelligence Layer (Neural Finance Engine)
The platform utilizes a dual-model transformer architecture:
- **High-Context Analysis**: Powered by **Gemini 1.5 Pro** for deep behavioral clustering, archetype extraction, and long-form strategic recommendations.
- **Real-Time Inference**: Powered by **Gemini 1.5 Flash** for rapid transaction categorization, impulse risk scoring, and low-latency simulation delta calculations.

---

## 🛠️ System Components & Functionalities

### 1. Executive Intelligence Dashboard
*Filename: `/src/components/Dashboard.tsx`*
The primary situational awareness interface for the user's financial posture.
- **Net Worth Forecast**: A 30-day forward-looking projection based on current wealth velocity and scheduled liabilities.
- **Disposable Surplus Calculation**: Automated detection of "safe-to-spend" capital after accounting for investment goals and fixed costs.
- **Overspend Risk Score**: A real-time volatility index that monitors spending patterns to predict potential cash-flow spikes before they occur.
- **Data Ledger**: A structured, searchable record of all financial events, categorized by intent and temporal priority.

### 2. Behavioral Mapping Engine
*Filename: `/src/components/Insights.tsx`*
Uses machine learning to analyze the "psychology of the spend."
- **Archetype Synthesis**: Classifies the user into segments such as *Stable Accumulator*, *High-Velocity Spender*, or *Risk-Prone Voyager*.
- **Integrity Deviation Tracking**: Measures the distance between the user's stated financial goals and their actual spending vectors.
- **Neural Recommendations**: Context-aware tactical advice that surfaces optimization paths (e.g., "Shift weekend hospitality spend to automated brokerage transfers").

### 3. Scenario Simulation Sandbox
*Filename: `/src/components/SimulationEngine.tsx`*
A natural-language-driven modeling environment for financial hypothesis testing.
- **Vector Projection**: Maps natural language inputs (e.g., "What if I reduce dining expense by 20% and redirect it to S&P 500?") into mathematical models.
- **5-Year Growth Variance**: Visualizes the compound delta of behavioral changes over a half-decade horizon.
- **Impact Logs**: Provides a line-item breakdown of how a single change ripples through yearly net worth totals.

---

## 📊 Data Strategy: Synthetic vs. Production

### Phase 1: Synthetic Evaluation (Current)
To allow for immediate system demonstration, the platform operates on a **Synthetic Intelligence Layer**:
- **Baseline Seed**: The application initializes with a pre-calibrated snapshot of financial state to showcase the dashboard's capabilities.
- **Transformer-Driven Synthesis**: Analysis results are not static; they are generated dynamically by the intelligence layer based on seed data, ensuring no two user experiences are identical even in "demo" mode.

### Phase 2: Production Integration (Bank Connectivity)
Transitioning to live production data involves migrating the orchestration layer endpoints:

1.  **Plaid / Finicity Integration**:
    - Update `server.ts` to include the official library for your chosen aggregator.
    - Exchange the `public_token` for an `access_token` via the `/item/public_token/exchange` endpoint.
2.  **Transaction Fetching**:
    - Create a cron-job or webhook listener that pulls transaction deltas and pushes them to the `transactions` collection in Firestore.
    - The `useTransactions` hook in the frontend should be updated to listen to the Firestore collection instead of local state.
3.  **Real-Time Sync**:
    - Use Firebase `onSnapshot` listeners to ensure the dashboard reflects bank updates within milliseconds of the data arriving in your database.

---

## 🏗️ Detailed Data Schema (Firestore)

| Path | Data Type | Description |
| :--- | :--- | :--- |
| `/users/{uid}` | Object | Global identity, risk profile, and onboarding status. |
| `/users/{uid}/accounts` | Collection | Bank account metadata (Institution, current balance, type). |
| `/users/{uid}/ledger` | Collection | Individual transaction records including timestamps and AI-tags. |
| `/users/{uid}/archetypes` | Collection | Versioned history of behavioral analysis results. |
| `/users/{uid}/simulations` | Collection | Saved hypothetical scenarios and their corresponding projection data. |

---

## 🔒 Security & Data Integrity
- **Encrypted Transmission**: All data in transit is secured via TLS 1.3.
- **RBAC (Role-Based Access Control)**: Firestore security rules strictly enforce that users can only access data where `request.auth.uid == userId`.
- **Anonymized Processing**: Before the intelligence layer processes descriptions, personal identifiers (PII) are stripped to ensure the models analyze *behavioral patterns*, not personal identities.

---

## 💻 Technical Setup & Deployment

### Environment Configuration
Ensure your `.env` file contains the following keys (see `.env.example` for details):
```bash
FIREBASE_API_KEY=
FIREBASE_PROJECT_ID=
GEMINI_API_KEY=
```

### Local Development
1.  **Install Dependencies**: `npm install`
2.  **Start Development Environment**: `npm run dev`
    - This launches the Vite HMR server for the frontend.
    - Simultaneously launches the Express backend orchestration layer using `tsx`.
3.  **Build for Production**: `npm run build`
    - Compiles the frontend assets and prepares the backend for deployment.

---

## 🛣️ Roadmap & Extensibility
- [ ] **Automated Debt Pathing**: Intelligent algorithms to optimize loan repayment schedules.
- [ ] **Multi-Currency Normalization**: Real-time conversion for international accounts.
- [ ] **Mobile Native Bridge**: Wrapper for iOS/Android native notification alerts for overspend risks.

---
© 2026 FinAI Core Team. All Rights Reserved. Confidential & Proprietary.
