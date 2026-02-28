import React from "react";
import Layout from "./../components/Layout/Layout";
import { useAuth } from "../context/auth";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title="Signup Page">
      <div className="signup">
        <h1>Mini Task Manager</h1>
        <pre>{JSON.stringify(auth, null, 4)}</pre>
      </div>
    </Layout>
  );
};

export default HomePage;
