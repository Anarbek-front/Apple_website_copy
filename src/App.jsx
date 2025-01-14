import React from "react";
import { NavBar } from "./components/NavBar/NavBar";
import { Hero } from "./components/Hero/Hero";
import { Highlights } from "./components/Highlights/Highlights";
import { Model } from "./components/Model/Model";

export const App = () => {
    return (
        <main className="bg-black">
            <NavBar />
            <Hero />
            <Highlights />
            <Model />
        </main>
    );
};
