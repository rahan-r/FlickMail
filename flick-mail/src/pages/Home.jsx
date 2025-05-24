import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTheme } from "next-themes";
import Particles from "@/components/ui/particles";

export default function Homepage() {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");
  const navigate = useNavigate();
  const handleClick = () => {
    const flickuserId = localStorage.getItem("flickuserId");

    if (!flickuserId) {
      window.location.href = "/authenticate";
    } else {
      navigate("/mail");
    }
  };

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);
  return (
    <div className="flex flex-col min-h-screen ">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          {/* <Mail className="h-6 w-6" /> */}
           <span className="font-semibold">
            
          </span>
        </Link>
        <nav className="ml-[1100px] flex gap-4 sm:gap-12">
          <Link
            className="text-base font-medium hover:underline underline-offset-4"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-base font-medium hover:underline underline-offset-4"
            href="#"
          >
            Pricing
          </Link>
          <Link
            className="text-base font-medium hover:underline underline-offset-4"
            href="#"
          >
            About
          </Link>
        </nav>
      </header>
      <hr />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl ">
                  Disposable Email.
                  <br />
                  <span className="bg-gradient-to-r from-[#E65100] to-[#E65100] bg-clip-text text-transparent">
                    Simple & Secure.
                  </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-900 md:text-[20px] dark:text-gray-400">
                  Protect your inbox. Use disposable email service for quick,
                  secure, and spam-free communication.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="px-6 py-5 text-lg" onClick={handleClick}>
                  Get Temporary Email
                </Button>
                {/* <Button variant="outline">Learn More</Button> */}
              </div>
              <Particles
                className="absolute inset-0"
                quantity={500}
                ease={80}
                color={color}
                refresh
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card className="border-2 border-[#FF6F00]">
                <CardHeader>
                  <Zap className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Instant Setup</CardTitle>
                  <CardDescription>
                    Get a temporary email address in seconds. No registration
                    required.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-2 border-[#FF6F00]">
                <CardHeader>
                  <Shield className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Privacy Protected</CardTitle>
                  <CardDescription>
                    Keep your real email private. Perfect for sign-ups and
                    trials.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-2 border-[#FF6F00]">
                <CardHeader>
                  <Mail className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Easy to Use</CardTitle>
                  <CardDescription>
                    Simple interface to view and manage your temporary emails.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Temp Mail. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
