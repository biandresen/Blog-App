import { ClipLoader } from "react-spinners";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, useState, Suspense, type CSSProperties } from "react";
import Layout from "./routes/layouts/Layout";

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

const App = () => {
  const [sidebars, setSidebars] = useState({
    left: false,
    right: false,
  });

  const override: CSSProperties = {
    color: "var(--text1)",
  };

  return (
    <BrowserRouter>
      <Layout setSidebars={setSidebars}>
        <Suspense
          fallback={
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <ClipLoader
                color={override.color}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          }
        >
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
              element={<DashboardLayout sidebars={sidebars} setSidebars={setSidebars} />}
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
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
