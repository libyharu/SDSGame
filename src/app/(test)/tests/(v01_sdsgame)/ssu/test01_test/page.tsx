"use client";
import React from "react";

import dynamic from "next/dynamic";

// Use Dynamic Import for SSR Compatibility: Ensure Phaser runs only on the client side, as Next.js includes server-side rendering by default. Confirm you are using dynamic imports with ssr: false:
const Borard = dynamic(() => import("./comp/Borard"), { ssr: false });
const Background = dynamic(() => import("./comp/Background"), { ssr: false });

const page = () => {
  return (
    <div
      className={"flex w-full h-full"}
      style={{ background: "#87CEEB", width: "auto", height: "1000px" }}
    >
      <Background>
        <Borard />
      </Background>
    </div>
  );
};

export default page;
