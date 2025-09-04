"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="ml-2 text-xl font-bold text-foreground">
                Panah Academy
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              Empowering students to master English language skills through
              comprehensive courses and expert instruction.
            </p>
            <div className="flex space-x-4">
              <Link href="https://instagram.com/panahacademy" target="_blank">
                <Button variant="ghost" size="icon" className="cursor-pointer">
                  <Instagram className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="https://facebook.com/panahacademy" target="_blank">
                <Button variant="ghost" size="icon" className="cursor-pointer">
                  <Facebook className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="https://twitter.com/panahacademy" target="_blank">
                <Button variant="ghost" size="icon" className="cursor-pointer">
                  <Twitter className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/courses"
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-violet-600" />
                <div>
                  <p className="text-foreground font-medium">Phone</p>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-4 w-4 text-violet-600 mt-1" />
                <div>
                  <p className="text-foreground font-medium">Email</p>
                  <p className="text-muted-foreground">info@panahacademy.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-violet-600 mt-1" />
                <div>
                  <p className="text-foreground font-medium">Address</p>
                  <p className="text-muted-foreground">
                    123 Education Street
                    <br />
                    Learning District, LD 12345
                    <br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Business Hours
            </h3>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span>10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
            </div>
            <div className="mt-6">
              <Button className="w-full bg-violet-600 hover:bg-violet-700 cursor-pointer">
                Get Started Today
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2024 Panah Academy. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors cursor-pointer"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors cursor-pointer"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors cursor-pointer"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

