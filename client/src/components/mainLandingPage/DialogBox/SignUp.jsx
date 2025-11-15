import React, { useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSignUpMutation } from "@/app/features/mainUser";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignUp = ({ open, onChange }) => {
    const navigate=useNavigate()
    const [signUp] = useSignUpMutation();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormData = async (e) => {
        e.preventDefault();
        try {
            const res = await signUp(formData).unwrap();
            if (res.success) {
                console.log("Success:", res);
                setError("");
                onChange(false); // Close dialog
                localStorage.setItem("token", res.token);
                navigate("/dashboard")
            }
        } catch (err) {
            console.error(err);
            setError(err?.data?.message || "Something went wrong!");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onChange}>
            <DialogContent className="min-w-[780px] max-w-full p-0 overflow-hidden bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl">
                <div className="flex flex-col md:flex-row h-full w-full">

                    {/* ---- LEFT SIDE (GRADIENT + MAGIC EFFECTS) ---- */}
                    <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 relative overflow-hidden rounded-l-3xl">
                        {/* Floating sparkles */}
                        <Sparkles className="absolute top-10 left-10 w-6 h-6 text-white/30 animate-pulse" />
                        <Sparkles className="absolute bottom-10 right-16 w-4 h-4 text-white/20 animate-pulse delay-500" />

                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent mix-blend-overlay"></div>
                        <h2 className="text-4xl font-bold text-white drop-shadow-md z-10">Welcome ✨</h2>
                        <p className="text-white/80 text-lg mt-2 z-10 text-center px-4">
                            Join the Magic UI Experience
                        </p>
                    </div>

                    {/* ---- RIGHT SIDE FORM ---- */}
                    <form
                        onSubmit={handleFormData}
                        className="w-full md:w-1/2 p-8 flex flex-col justify-center gap-6"
                    >
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-semibold text-gray-300">
                                Create Account
                            </DialogTitle>
                            <DialogDescription className="text-gray-300">
                                Fill the details below to create your account.
                            </DialogDescription>
                        </DialogHeader>

                        {/* FORM FIELDS */}
                        <div className="grid gap-4 mt-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="text-gray-300">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleData}
                                    placeholder="Enter your name"
                                    className="bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 rounded-md transition"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-gray-300">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleData}
                                    placeholder="Enter your email"
                                    className="bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 rounded-md transition"
                                />
                            </div>

                            <div className="grid gap-2 relative">
                                <Label htmlFor="password" className="text-gray-300">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleData}
                                    placeholder="••••••••"
                                    className="bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 rounded-md transition"
                                />
                            </div>

                            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                        </div>

                        {/* CTA BUTTONS */}
                        <DialogFooter className="mt-6 flex justify-between">
                            <DialogClose asChild>
                                <Button
                                    variant="outline"
                                    className="border-white/30 text-black hover:bg-white"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>

                            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 shadow-lg px-6">
                                Create Account
                            </Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SignUp;
