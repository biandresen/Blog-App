import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, useState, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { useColorTheme } from "./contexts/ColorThemeContext";
import { useAuth } from "./contexts/AuthContext";
import { useAuthInitializer } from "./hooks/useAuthInitializer";
import Spinner from "./components/atoms/Spinner";

import Layout from "./routes/layouts/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";

const NotFound = lazy(() => import("./routes/pages/NotFound"));
const Home = lazy(() => import("./routes/pages/Home"));
const Login = lazy(() => import("./routes/pages/Login"));
const Register = lazy(() => import("./routes/pages/Register"));
const ForgotPassword = lazy(() => import("./routes/pages/ForgotPassord"));
const ResetPassword = lazy(() => import("./routes/pages/ResetPassword"));
const About = lazy(() => import("./routes/pages/About"));
const Contact = lazy(() => import("./routes/pages/Contact"));

const DashboardLayout = lazy(() => import("./routes/layouts/DashboardLayout"));
const NewPost = lazy(() => import("./routes/pages/dashboard/NewPost"));
const Drafts = lazy(() => import("./routes/pages/dashboard/Drafts"));
const Profile = lazy(() => import("./routes/pages/dashboard/Profile"));
const Admin = lazy(() => import("./routes/pages/dashboard/Admin"));

const PostsLayout = lazy(() => import("./routes/layouts/PostsLayout"));
const AllPosts = lazy(() => import("./routes/pages/posts/AllPosts"));
const MyPosts = lazy(() => import("./routes/pages/posts/MyPosts"));
const Popular = lazy(() => import("./routes/pages/posts/Popular"));
const Search = lazy(() => import("./routes/pages/posts/Search"));
const SingelPost = lazy(() => import("./routes/pages/posts/SingelPost"));

const App = () => {
  useAuthInitializer();
  const { colorTheme } = useColorTheme();
  const { loading } = useAuth();

  const [sidebars, setSidebars] = useState({
    left: false,
    right: false,
  });

  // Wait for refresh check to finish
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Layout setSidebars={setSidebars}>
        <Suspense fallback={<Spinner />}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Protected dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout sidebars={sidebars} setSidebars={setSidebars} />
                </ProtectedRoute>
              }
            >
              <Route index element={<NewPost />} />
              <Route path="new-post" element={<NewPost />} />
              <Route path="drafts" element={<Drafts />} />
              <Route path="profile" element={<Profile />} />
              <Route path="admin" element={<Admin />} />
            </Route>

            {/* Posts */}
            <Route path="/posts" element={<PostsLayout sidebars={sidebars} setSidebars={setSidebars} />}>
              <Route index element={<AllPosts />} />
              <Route path="search" element={<Search />} />
              <Route path="all-posts" element={<AllPosts />} />
              <Route path="popular" element={<Popular />} />
              <Route path="my-posts" element={<MyPosts />} />
              <Route path=":id" element={<SingelPost />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer position="bottom-right" theme={colorTheme} />
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
