import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from "next/link";
import logo from './todo.jpg'
import Image from "next/image";
import Head from "next/head";
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'A simple todo application built with React and Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

     <body className={inter.className}>


      {children}</body>
    </html>
  )
}
