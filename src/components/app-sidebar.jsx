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
import logo from "../../public/styla.webp";
import {  Heart, HomeIcon, Settings, Settings2, Shirt } from "lucide-react";

const items = [
  { title: "Home", url: "/app", icon: HomeIcon },
  { title: "Outfit Finder", url: "/app/outfit-finder", icon: Shirt },
  { title: "Preferences", url: "/app/preferences", icon: Settings2 },
  { title: "Favourites", url: "/app/favourites", icon: Heart },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible='icon' className={"py-10"}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={"/"}>
                <Image
                  src={logo}
                  className='rounded-full'
                  width={40}
                  height={40}
                  alt='styla'
                />
                <span className='text-primary hover:text-primary/90 font-serif text-3xl font-bold'>
                  Styla
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
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={"/app/settings"}>
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
