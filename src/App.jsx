import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-space-blue transition-colors">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
    </div>
  );
}
