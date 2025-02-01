import "./globals.css";

import type { Metadata } from 'next'
import {ClerkProvider} from "@clerk/nextjs";
import React from "react";
import QueryProvider from "@/provider/queryProvider";

export const metadata: Metadata = {
      title: 'X Clone',
      description: 'Next.js social media application project',
}

export default function RootLayout({children}:{children: React.ReactNode;modal: React.ReactNode;}) {
      return (
          <ClerkProvider>
                <QueryProvider>
                      <html lang="en">
                      <body>{children}</body>
                      </html>
                </QueryProvider>
          </ClerkProvider>
      );
}