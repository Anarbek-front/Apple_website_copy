import React, { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../../constants";
import { gsap } from "gsap";
import { highlightFirstVideo, pauseImg, playImg, replayImg } from "../../utils";
import { useGSAP } from "@gsap/react";

const VideoCarousel = () => {
    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoID: 0,
        isLastVideo: false,
        isPlaying: false,
    });

    const [loadedData, setLoadedData] = useState([]);

    const { isEnd, isLastVideo, isPlaying, startPlay, videoID } = video;

    useGSAP(() => {
        gsap.to("#slider", {
            transform: `translateX(${-100 * videoID}%)`,
            duration: 2,
            ease: "power2.inOut",
        });

        gsap.to("#video", {
            scrollTrigger: {
                trigger: "#video",
                toggleActions: "restart none none none",
            },
            onComplete: () => {
                setVideo((prevState) => ({
                    ...prevState,
                    startPlay: true,
                    isPlaying: true,
                }));
            },
        });
    }, [isEnd, videoID]);

    useEffect(() => {
        // loadedData.length > 3
        //     ? !isPlaying
        //         ? videoRef.current[videoID].pause()
        //         : startPlay && videoRef.current[videoID].play()
        //     : "";
        if (loadedData.length > 3) {
            if (!isPlaying) {
                videoRef.current[videoID].pause();
            } else {
                startPlay && videoRef.current[videoID].play();
            }
        }
    }, [startPlay, videoID, isPlaying, loadedData]);

    const handleLoadedMetadata = (idx, e) => {
        setLoadedData((pre) => [...pre, e]);
    };

    useEffect(() => {
        let currentProgress = 0;
        let span = videoSpanRef.current;
        if (span[videoID]) {
            let anim = gsap.to(span[videoID], {
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100);
                    if (progress !== currentProgress) {
                        currentProgress = progress;
                        gsap.to(videoDivRef.current[videoID], {
                            width:
                                window.innerWidth < 760
                                    ? "10vw"
                                    : window.innerWidth < 1200
                                    ? "10vw"
                                    : "4vw",
                        });
                        gsap.to(span[videoID], {
                            width: `${currentProgress}%`,
                            backgroundColor: "#ffffff",
                            borderRadius: "10px",
                        });
                    }
                },
                onComplete: () => {
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoID], {
                            width: "12px",
                        });
                        gsap.to(span[videoID], {
                            backgroundColor: "#443f3f",
                        });
                    }
                },
            });
            if (videoID === 0) {
                anim.restart();
            }

            const animUpdate = () => {
                anim.progress(
                    videoRef.current[videoID].currentTime /
                        hightlightsSlides[videoID].videoDuration
                );
            };
            if (isPlaying) {
                gsap.ticker.add(animUpdate);
            } else {
                gsap.ticker.remove(animUpdate);
            }
        }
    }, [videoID, startPlay]);

    const handleProcess = (type, i) => {
        switch (type) {
            case "video-end":
                setVideo((prevState) => ({
                    ...prevState,
                    isEnd: true,
                    videoID: i + 1,
                }));
                break;
            case "video-last":
                setVideo((prevState) => ({ ...prevState, isLastVideo: true }));
                break;
            case "video-reset":
                setVideo((prevState) => ({
                    ...prevState,
                    isLastVideo: false,
                    videoID: 0,
                }));
                break;
            case "play":
                setVideo((prevState) => ({
                    ...prevState,
                    isPlaying: !prevState.isPlaying,
                }));
                break;
            case "pause":
                setVideo((prevState) => ({
                    ...prevState,
                    isPlaying: !prevState.isPlaying,
                }));
                break;
            default:
                return video;
        }
    };

    return (
        <>
            <div className="flex items-start">
                {hightlightsSlides.map((list, idx) => (
                    <div key={list.id} id="slider" className="sm:pr-20 pr-10">
                        <div className="video-carousel_container">
                            <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                                <video
                                    id="video"
                                    playsInline={true}
                                    muted
                                    preload="auto"
                                    className={`${
                                        list.id === 2 && "translate-x-44"
                                    } pointer-events-none`}
                                    ref={(el) => (videoRef.current[idx] = el)}
                                    onPlay={() => {
                                        setVideo((prevVideo) => ({
                                            ...prevVideo,
                                            isPlaying: true,
                                        }));
                                    }}
                                    onLoadedMetadata={(e) =>
                                        handleLoadedMetadata(idx, e)
                                    }
                                    onEnded={() =>
                                        idx !== 3
                                            ? handleProcess("video-end", idx)
                                            : handleProcess("video-last")
                                    }
                                >
                                    <source src={list.video} type="video/mp4" />
                                </video>
                            </div>
                            <div className="absolute top-12 left-[5%] z-10">
                                {list.textLists.map((text) => (
                                    <p
                                        key={text}
                                        className="md:text-2xl text-xl font-medium"
                                    >
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="relative flex-center mt-10">
                <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
                    {videoRef.current.map((_, idx) => (
                        <span
                            key={idx}
                            ref={(el) => (videoDivRef.current[idx] = el)}
                            className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
                        >
                            <span
                                className="absolute h-full w-full rouded-full"
                                ref={(el) => (videoSpanRef.current[idx] = el)}
                            />
                        </span>
                    ))}
                </div>
                <button className="control-btn">
                    <img
                        src={
                            isLastVideo
                                ? replayImg
                                : !isPlaying
                                ? playImg
                                : pauseImg
                        }
                        alt={
                            isLastVideo
                                ? "replay"
                                : !isPlaying
                                ? "play"
                                : "pause"
                        }
                        onClick={
                            isLastVideo
                                ? () => handleProcess("video-reset")
                                : !isPlaying
                                ? () => handleProcess("play")
                                : () => handleProcess("pause")
                        }
                    />
                </button>
            </div>
        </>
    );
};

export default VideoCarousel;
