import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { heroVideo, smallHeroVideo } from "../../utils";

export const Hero = () => {
    const [videoSRC, setVideoSRC] = useState(
        window.innerWidth < 768 ? smallHeroVideo : heroVideo
    );

    const handleVideoSRCSet = () => {
        window.innerWidth < 768
            ? setVideoSRC(smallHeroVideo)
            : setVideoSRC(heroVideo);
    };

    useEffect(() => {
        window.addEventListener("resize", handleVideoSRCSet);

        return () => {
            window.removeEventListener("resize", handleVideoSRCSet);
        };
    }, []);

    useGSAP(() => {
        gsap.to("#hero_text", { opacity: 1, delay: 1.5 });
    }, []);

    return (
        <section className="w-full nav-height bg-black relative">
            <div className="h-5/6 w-full flex-center flex-col">
                <p id="hero_text" className="hero-title">
                    iphone 15 Pro
                </p>
                <div className="md:w-10/12 w-9/12">
                    <video
                        className="pointer-events-none"
                        autoPlay
                        muted
                        playsInline={true}
                        key={videoSRC}
                    >
                        <source src={videoSRC} type="video/mp4" />
                    </video>
                </div>
            </div>
        </section>
    );
};
