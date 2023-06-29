import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Box } from "@chakra-ui/react";
import Header from "./components/header/header";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/auth";
import Login from "./components/auth/login";
import Home from "./pages/home";
import NotFound from "./pages/errorPage";
import PostsPage from "./pages/posts";
import Footer from "./components/footer/footer";
import PostDetails from "./pages/postDetails";
import SearchPage from "./pages/searchPage";
import AboutPage from "./pages/aboutPage";
import Dashboard from "./pages/userProfile/dashboard";
import UserProfile from "./pages/userProfile/userProfile";
import MyPosts from "./pages/userProfile/myPosts";
import Settings from "./pages/userProfile/settings";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Box fontFamily="primary">
      <Box>
        <Header />
      </Box>
      <Box minH="60vh">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/user-profile" element={<Dashboard />}>
            <Route index element={<UserProfile />} />
            <Route path="/user-profile/posts" element={<MyPosts />} />
            <Route path="/user-profile/settings" element={<Settings />} />
          </Route>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/search-page" element={<SearchPage />} />
          <Route path="posts/:slug" element={<PostDetails />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/auth">
            <Route index element={<Login />} />
            <Route path="signup" element={<AuthPage />} />
          </Route>
          <Route path="/profile">
            <Route index element={<Login />} />
            <Route path="settings" element={<AuthPage />} />
          </Route>
        </Routes>
      </Box>
      <Box>
        <Footer />
      </Box>
    </Box>
  );
}

export default App;
