import React from "react";
import {Layout} from "./components/Layout";
import {Dashboard} from "./components/Dashboard";
import {CourseManager} from "./components/CourseManager";
import {Inventory} from "./components/Inventory";
import {SupplierManager} from "./components/SupplierManager";
import {QuoteBuilder} from "./components/QuoteBuilder";

type View = "dashboard" | "quotes" | "inventory" | "courses" | "suppliers";

const App: React.FC = () => {
  const [currentView, setCurrentView] = React.useState<View>("dashboard");

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard />;
      case "quotes":
        return <QuoteBuilder />;
      case "inventory":
        return <Inventory />;
      case "courses":
        return <CourseManager />;
      case "suppliers":
        return <SupplierManager />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentView={currentView} onChangeView={setCurrentView}>
      {renderView()}
    </Layout>
  );
};

export default App;
