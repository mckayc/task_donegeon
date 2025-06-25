
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
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { AppLogo } from "@/components/app-logo";
import { UserNav } from "@/components/user-nav";
import { useCurrentUser } from '@/hooks/use-current-user';
import { ClipboardList, Repeat, Compass, Coins, Store, Shield, LogOut, Image, Users, ShoppingCart, Archive, LayoutList, Award, Activity, LayoutDashboard, Settings, CheckCheck, HelpCircle, Gift, ShieldOff, Palette, ClipboardCheck } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentUser = useCurrentUser();

  const isDM = currentUser.role === 'Donegeon Master';
  const isBailiff = currentUser.role === 'Bailiff';

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar className="bg-sidebar dark:bg-sidebar" collapsible="icon">
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
              <Accordion.Root type="single" collapsible defaultValue="quests" className="w-full">
                 <Accordion.Item value="quests" className="border-none">
                    <Accordion.Trigger className={cn("flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 text-sidebar-foreground", { "bg-sidebar-accent text-sidebar-accent-foreground": pathname.startsWith('/duties') || pathname.startsWith('/ventures') })}>
                        <ClipboardList />
                        <span className="flex-1 text-left">Quests</span>
                         <svg className="h-4 w-4 shrink-0 transition-transform duration-200" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9l6 6l6-6"></path></svg>
                      </Accordion.Trigger>
                      <Accordion.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                        <div className="pl-8 flex flex-col gap-1 py-1">
                          <SidebarMenuButton asChild isActive={pathname === '/duties'}>
                             <Link href="/duties">
                              <Repeat />
                              <span>Duties</span>
                            </Link>
                          </SidebarMenuButton>
                           <SidebarMenuButton asChild isActive={pathname === '/ventures'}>
                             <Link href="/ventures">
                              <Compass />
                              <span>Ventures</span>
                            </Link>
                          </SidebarMenuButton>
                        </div>
                      </Accordion.Content>
                 </Accordion.Item>
              </Accordion.Root>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/guild-quests'}>
                  <Link href="/guild-quests">
                    <Users />
                    <span>Guild Quests</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/avatar-creator'}>
                  <Link href="/avatar-creator">
                    <Palette />
                    <span>Avatar Creator</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/marketplace'}>
                  <Link href="/marketplace">
                    <ShoppingCart />
                    <span>Marketplace</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Moderation Section */}
              {(isBailiff || isDM) && (
                <>
                  <SidebarSeparator className="my-2" />
                   <Accordion.Root type="single" collapsible defaultValue="user-management" className="w-full">
                    <Accordion.Item value="user-management" className="border-none">
                      <Accordion.Trigger className={cn("flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 text-sidebar-foreground", { "bg-sidebar-accent text-sidebar-accent-foreground": pathname.startsWith('/user-dashboard') || pathname.startsWith('/admin/setbacks') || pathname.startsWith('/admin/surprises') })}>
                        <Activity />
                        <span className="flex-1 text-left">User Management</span>
                         <svg className="h-4 w-4 shrink-0 transition-transform duration-200" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9l6 6l6-6"></path></svg>
                      </Accordion.Trigger>
                      <Accordion.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                        <div className="pl-8 flex flex-col gap-1 py-1">
                           <SidebarMenuButton asChild isActive={pathname === '/user-dashboard'}>
                              <Link href="/user-dashboard">
                                <LayoutDashboard />
                                <span>Dashboard</span>
                              </Link>
                            </SidebarMenuButton>
                             <SidebarMenuButton asChild isActive={pathname === '/admin/setbacks'}>
                              <Link href="/admin/setbacks">
                                <ShieldOff />
                                <span>Setbacks</span>
                              </Link>
                            </SidebarMenuButton>
                             <SidebarMenuButton asChild isActive={pathname === '/admin/surprises'}>
                              <Link href="/admin/surprises">
                                <Gift />
                                <span>Surprises</span>
                              </Link>
                            </SidebarMenuButton>
                        </div>
                      </Accordion.Content>
                    </Accordion.Item>
                   </Accordion.Root>
                </>
              )}

              {/* DM Only Section */}
              {isDM && (
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
                          <Accordion.Root type="single" collapsible className="w-full">
                            <Accordion.Item value="markets-group" className="border-none">
                              <Accordion.Trigger className={cn("flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 text-sidebar-foreground", { "bg-sidebar-accent text-sidebar-accent-foreground": pathname.startsWith('/admin/markets') || pathname.startsWith('/admin/inventory') || pathname.startsWith('/admin/approvals') })}>
                                <Store />
                                <span className="flex-1 text-left">Markets</span>
                                <svg className="h-4 w-4 shrink-0 transition-transform duration-200" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9l6 6l6-6"></path></svg>
                              </Accordion.Trigger>
                              <Accordion.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                                <div className="pl-8 flex flex-col gap-1 py-1">
                                  <SidebarMenuButton asChild isActive={pathname === '/admin/markets'}>
                                    <Link href="/admin/markets">
                                      <LayoutList />
                                      <span>Manage Markets</span>
                                    </Link>
                                  </SidebarMenuButton>
                                  <SidebarMenuButton asChild isActive={pathname === '/admin/inventory'}>
                                    <Link href="/admin/inventory">
                                      <Archive />
                                      <span>Inventory</span>
                                    </Link>
                                  </SidebarMenuButton>
                                  <SidebarMenuButton asChild isActive={pathname === '/admin/approvals'}>
                                    <Link href="/admin/approvals">
                                      <CheckCheck />
                                      <span>Approvals</span>
                                    </Link>
                                  </SidebarMenuButton>
                                </div>
                              </Accordion.Content>
                            </Accordion.Item>
                          </Accordion.Root>
                           <Accordion.Root type="single" collapsible className="w-full">
                            <Accordion.Item value="guild-management" className="border-none">
                              <Accordion.Trigger className={cn("flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 text-sidebar-foreground", { "bg-sidebar-accent text-sidebar-accent-foreground": pathname.startsWith('/admin/guilds') || pathname.startsWith('/admin/guild-quests') })}>
                                <Users />
                                <span className="flex-1 text-left">Guild Management</span>
                                <svg className="h-4 w-4 shrink-0 transition-transform duration-200" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9l6 6l6-6"></path></svg>
                              </Accordion.Trigger>
                              <Accordion.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                                <div className="pl-8 flex flex-col gap-1 py-1">
                                  <SidebarMenuButton asChild isActive={pathname === '/admin/guilds'}>
                                    <Link href="/admin/guilds">
                                      <Users />
                                      <span>Manage Guilds</span>
                                    </Link>
                                  </SidebarMenuButton>
                                  <SidebarMenuButton asChild isActive={pathname === '/admin/guild-quests'}>
                                    <Link href="/admin/guild-quests">
                                      <ClipboardCheck />
                                      <span>Guild Quests</span>
                                    </Link>
                                  </SidebarMenuButton>
                                </div>
                              </Accordion.Content>
                            </Accordion.Item>
                          </Accordion.Root>
                          <SidebarMenuButton asChild isActive={pathname === '/admin/ranks'}>
                             <Link href="/admin/ranks">
                              <Award />
                              <span>Ranks</span>
                            </Link>
                          </SidebarMenuButton>
                          <SidebarMenuButton asChild isActive={pathname === '/admin/digital-assets'}>
                             <Link href="/admin/digital-assets">
                              <Image />
                              <span>Digital Assets</span>
                            </Link>
                          </SidebarMenuButton>
                           <SidebarMenuButton asChild isActive={pathname === '/admin/users'}>
                             <Link href="/admin/users">
                              <Users />
                              <span>Users</span>
                            </Link>
                          </SidebarMenuButton>
                          <SidebarMenuButton asChild isActive={pathname === '/admin/settings'}>
                             <Link href="/admin/settings">
                              <Settings />
                              <span>Settings</span>
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
                <SidebarMenuButton asChild isActive={pathname === '/help'}>
                  <Link href="/help">
                    <HelpCircle />
                    <span>Help</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
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
