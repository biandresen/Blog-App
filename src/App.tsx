import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import Layout from "./components/layout/Layout";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./features/blog/pages/Login"));
const Register = lazy(() => import("./features/blog/pages/Register"));
const DashboardLayout = lazy(() => import("./features/blog/pages/DashboardLayout"));
const NewPost = lazy(() => import("./features/blog/pages/dashboard/NewPost"));
const Drafts = lazy(() => import("./features/blog/pages/dashboard/Drafts"));
const Profile = lazy(() => import("./features/blog/pages/dashboard/Profile"));

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard and nested routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<NewPost />} /> {/* Default route */}
            <Route path="new-post" element={<NewPost />} />
            <Route path="drafts" element={<Drafts />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
