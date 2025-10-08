"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "../../public/koda.png";
import { FileText, Folder, LogOut } from "lucide-react";
import { supabase } from "@/utils/supabase";
import { useQueryClient } from "@tanstack/react-query";
const items = [{ title: "Recent", url: "/app", icon: FileText }];

export function AppSidebar() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return (
    <Sidebar collapsible={"icon"} className={"py-10 h-screen bg-sidebar"}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className={"py-5"} asChild>
              <Link href={"/app"}>
                <Image
                  src={logo}
                  className='rounded-xs'
                  width={40}
                  height={40}
                  alt='styla'
                />
                <span className='text-primary hover:text-primary/90 text-3xl font-bold'>
                  Koda
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>For You</SidebarGroupLabel>
          <SidebarGroupContent>
            {" "}
            <SidebarMenu>
              {items.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Collections</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/app/documents"}>
                    <Folder />
                    <span>Documents</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className={"mt-auto mb-20"}>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => {
                    queryClient.invalidateQueries({ queryKey: ["documents"] });
                    supabase.auth.signOut();
                    router.push("/");
                  }}
                  className={"hover:text-red-500 text-red-500/70 cursor-pointer"}
                >
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
