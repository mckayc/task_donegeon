'use client';
import Link from "next/link";
import { usePathname } from 'next/navigation'
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { AppLogo } from "@/components/app-logo";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/user-nav";
import { useIsAdmin } from "@/hooks/use-is-admin";
import { LayoutDashboard, Repeat, Compass, Coins, Store, Shield, LogOut, Image } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = useIsAdmin();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar className="bg-card dark:bg-sidebar" collapsible="icon">
          <SidebarHeader className="p-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <AppLogo className="w-8 h-8 text-primary" />
              <span className="text-lg font-headline font-semibold text-primary dark:text-sidebar-foreground">Task Donegeon</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/dashboard'}>
                  <Link href="/dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {isAdmin && (
                <Accordion.Root type="single" collapsible defaultValue="admin" className="w-full">
                  <Accordion.Item value="admin" className="border-none">
                    <Accordion.Trigger className={cn("flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 text-sidebar-foreground")}>
                      <Shield />
                      <span className="flex-1 text-left">DM Panel</span>
                       <svg className="h-4 w-4 shrink-0 transition-transform duration-200" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9l6 6l6-6"></path></svg>
                    </Accordion.Trigger>
                    <Accordion.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                      <div className="pl-8 flex flex-col gap-1 py-1">
                        <SidebarMenuButton asChild isActive={pathname === '/admin/duties'}>
                           <Link href="/admin/duties">
                            <Repeat />
                            <span>Duties</span>
                          </Link>
                        </SidebarMenuButton>
                         <SidebarMenuButton asChild isActive={pathname === '/admin/ventures'}>
                           <Link href="/admin/ventures">
                            <Compass />
                            <span>Ventures</span>
                          </Link>
                        </SidebarMenuButton>
                         <SidebarMenuButton asChild isActive={pathname === '/admin/currencies'}>
                           <Link href="/admin/currencies">
                            <Coins />
                            <span>Currencies</span>
                          </Link>
                        </SidebarMenuButton>
                         <SidebarMenuButton asChild isActive={pathname === '/admin/markets'}>
                           <Link href="/admin/markets">
                            <Store />
                            <span>Markets</span>
                          </Link>
                        </SidebarMenuButton>
                        <SidebarMenuButton asChild isActive={pathname === '/admin/digital-assets'}>
                           <Link href="/admin/digital-assets">
                            <Image />
                            <span>Digital Assets</span>
                          </Link>
                        </SidebarMenuButton>
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion.Root>
              )}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1">
           <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
            <SidebarTrigger className="md:hidden" />
            <div className="w-full flex-1">
              {/* Add breadcrumbs or page title here */}
            </div>
            <UserNav />
          </header>
          <main className="flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
