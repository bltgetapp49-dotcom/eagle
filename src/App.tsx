/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TrackingView from "./components/TrackingView";
import AdminPortal from "./components/AdminPortal";

/**
 * Root application router.
 * Exposes two top-level routes:
 * - `/` serving the public tracking UI
 * - `/admin` serving the internal admin portal
 *
 * Keep this file minimal: routing only. All UI and business
 * logic lives in the components under `src/components`.
 */

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TrackingView />} />
        <Route path="/admin" element={<AdminPortal />} />
      </Routes>
    </Router>
  );
}
