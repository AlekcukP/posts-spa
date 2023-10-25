import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./components/Router";
import Layout from "./components/Layout";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Router />
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
