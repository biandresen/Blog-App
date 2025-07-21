import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import Layout from "./components/layout/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
