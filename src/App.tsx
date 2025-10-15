import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, useState, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { useColorTheme } from "./contexts/ColorThemeContext";

import Layout from "./routes/layouts/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Spinner from "./components/atoms/Spinner";
import { useAuthInitializer } from "./hooks/useAuthInitializer";

const NotFound = lazy(() => import("./routes/pages/NotFound"));
const Home = lazy(() => import("./routes/pages/Home"));
const Login = lazy(() => import("./routes/pages/Login"));
const Register = lazy(() => import("./routes/pages/Register"));
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
  useAuthInitializer(); // Initialize auth on app load

  const [sidebars, setSidebars] = useState({
    left: false,
    right: false,
  });

  const { colorTheme } = useColorTheme();

  return (
    <BrowserRouter>
      <Layout setSidebars={setSidebars}>
        <Suspense fallback={<Spinner />}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Dashboard and nested routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout sidebars={sidebars} setSidebars={setSidebars} />
                </ProtectedRoute>
              }
            >
              <Route index element={<NewPost />} /> {/* Default route */}
              <Route path="new-post" element={<NewPost />} />
              <Route path="drafts" element={<Drafts />} />
              <Route path="profile" element={<Profile />} />
              <Route path="admin" element={<Admin />} />
            </Route>

            {/* Posts and nested routes */}
            <Route path="/posts" element={<PostsLayout sidebars={sidebars} setSidebars={setSidebars} />}>
              <Route index element={<AllPosts />} /> {/* Default route */}
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
