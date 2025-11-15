import React from "react";
import { AnimatedShinyText } from "../ui/animated-shiny-text";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, Sparkles, Star } from "lucide-react";
import { AuroraText } from "@/components/ui/aurora-text";
import { Button } from "../ui/button";
import { ShineBorder } from "@/components/ui/shine-border";
import { MorphingText } from "@/components/ui/morphing-text";

const Hero = () => {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#060606] text-white">

            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black opacity-90" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[50rem] h-[50rem] bg-purple-700/20 rounded-full blur-[160px]" />
            <div className="absolute top-20 left-40 w-80 h-80 bg-blue-500/10 blur-3xl rounded-full" />
            <div className="absolute bottom-40 right-20 w-96 h-96 bg-pink-500/10 blur-3xl rounded-full" />

            {/* Floating stars */}
            <Star className="absolute top-28 left-20 w-3 h-3 text-purple-300/70 animate-pulse" fill="currentColor" />
            <Star className="absolute bottom-24 right-20 w-2 h-2 text-pink-300/70 animate-pulse delay-300" fill="currentColor" />
            <Star className="absolute top-1/3 right-1/3 w-4 h-4 text-blue-300/70 animate-pulse delay-700" fill="currentColor" />
            
            {/* Static Grid Pattern Replacement */}
            <div className={cn(
                "absolute inset-0 [mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
                "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 bg-[size:50px_50px] bg-repeat",
                "bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)]"
            )} />

            <div className="relative z-20 flex flex-col items-center gap-10 max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">

                {/* Badge */}
                <div className="group">
                    <ShineBorder 
                        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]} 
                        className="rounded-full bg-black/40 backdrop-blur-md"
                    >
                        <div className="flex items-center gap-2 px-6 py-3">
                            <Sparkles className="w-4 h-4 text-purple-300" />
                            <AnimatedShinyText className="font-medium">
                                ✨ Introducing Magic UI PRO
                            </AnimatedShinyText>
                            <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                    </ShineBorder>
                </div>

                {/* Title */}
                <div className="space-y-4">
                    <AuroraText className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1]">
                        Design the Future
                    </AuroraText>

                    <MorphingText
                        className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
                        texts={["Stunning UI", "Immersive Effects", "Motion Magic", "Next-Level Design"]}
                    />
                </div>

                {/* Description */}
                <p className="max-w-2xl text-lg md:text-xl text-neutral-300 font-light leading-relaxed">
                    Craft immersive experiences with beautifully animated components, smooth interactions,
                    and ultra-modern design powered by React, Tailwind, and Motion.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <Button className="px-8 py-6 text-lg rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition-all duration-300 shadow-xl flex items-center gap-2 group">
                        Get Started Free
                        <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>

                    <Button variant="outline" className="px-8 py-6 text-lg rounded-xl border-white/20 bg-white/5 hover:bg-white/10 transition-all">
                        View Components
                    </Button>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap justify-center gap-8 mt-10">
                    {[
                        ["50+", "Components"],
                        ["100%", "Customizable"],
                        ["⚡", "Lightning Fast"],
                    ].map(([value, label]) => (
                        <div key={label} className="space-y-1 text-center">
                            <div className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                {value}
                            </div>
                            <div className="text-neutral-400 text-sm">{label}</div>
                        </div>
                    ))}
                </div>

                {/* Image Section */}
                <div className="relative mt-20 w-full max-w-6xl">
                    {/* Floating small left image */}
                    <div className="absolute -left-20 top-16 z-10 hidden md:block">
                        <ShineBorder
                            color={["#A07CFE", "#FE8FB5"]}
                            borderWidth={2}
                            duration={8}
                            className="rounded-xl"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
                                alt="UI Component 1"
                                className="w-32 h-32 md:w-40 md:h-40 rounded-xl object-cover"
                                style={{ animation: "float 6s ease-in-out infinite" }}
                            />
                        </ShineBorder>
                    </div>

                    {/* Floating small right image */}
                    <div className="absolute -right-20 top-10 z-10 hidden md:block">
                        <ShineBorder
                            color={["#FE8FB5", "#FFBE7B"]}
                            borderWidth={2}
                            duration={8}
                            className="rounded-xl"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1503264116251-35a269479413?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80"
                                alt="UI Component 2"
                                className="w-32 h-32 md:w-40 md:h-40 rounded-xl object-cover"
                                style={{ animation: "float 5s ease-in-out infinite 1s" }}
                            />
                        </ShineBorder>
                    </div>

                    {/* Main large image */}
                    <div className="relative group">
                        <ShineBorder
                            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                            borderWidth={3}
                            duration={10}
                            className="rounded-2xl"
                        >
                            <div className="overflow-hidden rounded-2xl">
                                <img
                                    src="https://startup-template-sage.vercel.app/hero-dark.png"
                                    alt="Dashboard preview"
                                    className="w-full rounded-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                                />
                            </div>
                        </ShineBorder>
                    </div>
                </div>

            </div>

            {/* Global styles for animations */}
            <style>
                {`
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-20px); }
                    }
                `}
            </style>
        </div>
    );
};

export default Hero;