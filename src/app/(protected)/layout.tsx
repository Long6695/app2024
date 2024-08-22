import {getServerSession} from "next-auth";
import Link from "next/link";
import {Menu, Package2, Search} from "lucide-react";
import React from "react";

import {authOptions} from "~/lib/auth";
import {Sheet, SheetContent, SheetTrigger} from "~/components/ui/sheet";
import {Button} from "~/components/ui/button";
import {Input} from "~/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {Avatar, AvatarImage} from "~/components/ui/avatar";

const ProtectedLayout = async ({children}: {children: React.ReactNode}) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link className="flex items-center gap-2 text-lg font-semibold md:text-base" href="#">
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link className="text-muted-foreground transition-colors hover:text-foreground" href="#">
            Dashboard
          </Link>
          <Link className="text-muted-foreground transition-colors hover:text-foreground" href="#">
            Orders
          </Link>
          <Link className="text-muted-foreground transition-colors hover:text-foreground" href="#">
            Products
          </Link>
          <Link className="text-muted-foreground transition-colors hover:text-foreground" href="#">
            Customers
          </Link>
          <Link className="text-foreground transition-colors hover:text-foreground" href="#">
            Settings
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="shrink-0 md:hidden" size="icon" variant="outline">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link className="flex items-center gap-2 text-lg font-semibold" href="#">
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link className="text-muted-foreground hover:text-foreground" href="#">
                Dashboard
              </Link>
              <Link className="text-muted-foreground hover:text-foreground" href="#">
                Orders
              </Link>
              <Link className="text-muted-foreground hover:text-foreground" href="#">
                Products
              </Link>
              <Link className="text-muted-foreground hover:text-foreground" href="#">
                Customers
              </Link>
              <Link className="hover:text-foreground" href="#">
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                placeholder="Search products..."
                type="search"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" size="icon" variant="secondary">
                {user && (
                  <Avatar>
                    <AvatarImage alt="avatar" src={user.image as string} />
                  </Avatar>
                )}
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0">
            <Link className="font-semibold text-primary" href="#">
              General
            </Link>
            <Link href="#">Security</Link>
            <Link href="#">Integrations</Link>
            <Link href="#">Support</Link>
            <Link href="#">Organizations</Link>
            <Link href="#">Advanced</Link>
          </nav>
          <div className="grid gap-6">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default ProtectedLayout;
