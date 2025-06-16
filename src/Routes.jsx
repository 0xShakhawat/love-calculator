import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import LoveCalculatorInputScreen from "pages/love-calculator-input-screen";
import CalculationLoadingScreen from "pages/calculation-loading-screen";
import LoveCompatibilityResultsScreen from "pages/love-compatibility-results-screen";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<LoveCalculatorInputScreen />} />
          <Route path="/love-calculator-input-screen" element={<LoveCalculatorInputScreen />} />
          <Route path="/calculation-loading-screen" element={<CalculationLoadingScreen />} />
          <Route path="/love-compatibility-results-screen" element={<LoveCompatibilityResultsScreen />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;