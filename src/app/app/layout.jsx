import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";

const Layout = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='md:my-5 bg-background w-full md:rounded-l-2xl'>
        <Navbar />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
