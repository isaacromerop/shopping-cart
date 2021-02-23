import React from "react";
import Layout from "../components/Layout/Layout";
import { useRouter } from "next/router";

const Thankyou = () => {
  const router = useRouter();
  return (
    <Layout>
      <div className="thank-container">
        <div className="thank-content">
          <h1>Thank you for your purchase!</h1>
          <p>
            John, we have created your order #asd123. Your items will be soon at
            your door.
          </p>
          <button onClick={() => router.push("/")}>Start again</button>
        </div>
      </div>
    </Layout>
  );
};

export default Thankyou;
