import React from 'react'
import { NavBar } from './components/NavBar/NavBar'
import { Hero } from './components/Hero/Hero'
import { Highlights } from './components/Highlights/Highlights'
import { Model } from './components/Model/Model'
import { Features } from './components/Features/Features'
import { HowItWorks } from './components/HowItWorks/HowItWorks'
import {Footer} from './components/Footer/Footer'

export const App = () => {
    return (
        <main className="bg-black">
            <NavBar />
            <Hero />
            <Highlights />
            <Model />
            <Features />
            <HowItWorks />
            <Footer />
        </main>
    )
}
