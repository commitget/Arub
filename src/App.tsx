import { Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Review from "./pages/Review";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Info from "./pages/Info";

const APP_NAME = "Arub";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/"          element={<Page title="Главная"><Home /></Page>} />
        <Route path="/review"    element={<Page title="Отзывы"><Review /></Page>} />
        <Route path="/login"     element={<Page title="Вход"><Login /></Page>} />
        <Route path="/profile"   element={<Page title="Профиль"><Profile /></Page>} />
        <Route path="/inf"       element={<Page title="Информация"><Info /></Page>} />
      </Routes>
    </Layout>
  );
}

function Page({ title, children }: { title: string; children: React.ReactNode }) {
  useEffect(() => {
    document.title = `${APP_NAME} - ${title}`;
  }, [title]);

  return <>{children}</>;
}

export default App;