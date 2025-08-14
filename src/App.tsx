import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, useState } from "react";
import Layout from "./components/layout/Layout";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./features/blog/pages/Login"));
const Register = lazy(() => import("./features/blog/pages/Register"));
const About = lazy(() => import("./features/blog/pages/About"));
const Contact = lazy(() => import("./features/blog/pages/Contact"));
const DashboardLayout = lazy(() => import("./features/blog/pages/DashboardLayout"));
const NewPost = lazy(() => import("./features/blog/pages/dashboard/NewPost"));
const Drafts = lazy(() => import("./features/blog/pages/dashboard/Drafts"));
const Profile = lazy(() => import("./features/blog/pages/dashboard/Profile"));
const PostsLayout = lazy(() => import("./features/blog/pages/PostsLayout"));
const AllPosts = lazy(() => import("./features/blog/pages/posts/AllPosts"));
const MyPosts = lazy(() => import("./features/blog/pages/posts/MyPosts"));
const Popular = lazy(() => import("./features/blog/pages/posts/Popular"));
const Search = lazy(() => import("./features/blog/pages/posts/Search"));

const App = () => {
  const [leftBarIsOpen, setLeftBarIsOpen] = useState<boolean>(false);
  const [rightBarIsOpen, setRightBarIsOpen] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <Layout setLeftBarIsOpen={setLeftBarIsOpen} setRightBarIsOpen={setRightBarIsOpen}>
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
            element={<DashboardLayout setLeftBarIsOpen={setLeftBarIsOpen} leftBarIsOpen={leftBarIsOpen} />}
          >
            <Route index element={<NewPost />} /> {/* Default route */}
            <Route path="new-post" element={<NewPost />} />
            <Route path="drafts" element={<Drafts />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route
            path="/posts"
            element={
              <PostsLayout
                setLeftBarIsOpen={setLeftBarIsOpen}
                leftBarIsOpen={leftBarIsOpen}
                rightBarIsOpen={rightBarIsOpen}
              />
            }
          >
            <Route index element={<AllPosts />} /> {/* Default route */}
            <Route path="search" element={<Search />} />
            <Route path="all-posts" element={<AllPosts />} />
            <Route path="popular" element={<Popular />} />
            <Route path="my-posts" element={<MyPosts />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
