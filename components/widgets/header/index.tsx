'use client'
import { User } from '@supabase/supabase-js';
import { useRef, useState } from 'react';
import { Menu as MenuIcon, Search } from 'lucide-react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

import * as supabaseLib from '@/lib/auth';
import { Genre, Tags } from '@/lib/schema';
import { useDialog } from "@/app/context";

export default function SiteHeader({ session, tags, genre }: { session: User | null, tags: Tags[], genre: Genre[] }) {
  const [open, setOpen] = useState<boolean>(false);
  const [tagList, setTagList] = useState<Tags[]>(tags);
  const [genreList, setGenreList] = useState<Genre[]>(genre);
  const { openDialog } = useDialog();

  const searchInput = useRef<HTMLInputElement>(null);

  const filterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTag = e.currentTarget.value.toLowerCase();
    setTagList(tags.filter(e => e.name.toLowerCase().includes(searchTag)))
    setGenreList(genre.filter(e => e.name.toLowerCase().includes(searchTag)))
  }

  const logout = async () => {
    const { error } = await supabaseLib.logout();
    if (!error) {
      toast('Logout Success')
      redirect('/');
    } 
  }

  const webView = (
      <NavigationMenu className='mr-4 hidden gap-2 md:flex w-full max-w-none justify-between'>
        <Link href="/" className="text-xl font-bold tracking-tight">
          🎮 Game Library
        </Link>

        <NavigationMenuList>
          <NavigationMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link">Browse</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-96">
                <DropdownMenuLabel className='text-lg'>Browse</DropdownMenuLabel>
                <div className='relative w-full'>
                  <Input
                    ref={searchInput}
                    className="w-full pl-8"
                    placeholder="Filter" 
                    onChange={filterChange}
                  />
                  <Search className="size-[20px] absolute top-0 m-2" />
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className='text-lg'>Genre</DropdownMenuLabel>
                <DropdownMenuGroup>
                  {Array.from(genreList).splice(0,5).map((item, index) => <Link key={index} href={`/genre/${item.slug}`}>
                    <div className='cursor-pointer my-2 mx-3 grid grid-cols-2'>
                      <span className='text-md capitalize'>{item.name}</span>
                      <Badge className='justify-self-end' variant="secondary">{item.games_count}</Badge>
                    </div>
                  </Link>)}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className='text-lg'>Tags</DropdownMenuLabel>
                <DropdownMenuGroup>
                  {Array.from(tagList).splice(0,5).map((item, index) => <Link key={index} href={`/tags/${item.slug}`}>
                    <div className='cursor-pointer my-2 mx-3 grid grid-cols-2'>
                      <span className='text-md capitalize'>{item.name}</span>
                      <Badge className='justify-self-end' variant="secondary">{item.games_count}</Badge>
                    </div>
                  </Link>)}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </NavigationMenuItem>
        {!session ? <>
            <NavigationMenuItem>
              <Button
                variant="link"
                onClick={() => openDialog('signup')}
              >
                Sign Up
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button
                variant="link"
                onClick={() => openDialog('login')}
              >
                Login
              </Button>
            </NavigationMenuItem>
          </>
        :
        <>
          <NavigationMenuItem>
            <Link href='/account/library'>
              <Button variant="link">My Library</Button>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem onClick={logout}>
            <Button variant="link">Logout</Button>
          </NavigationMenuItem>
        </>
        }
        </NavigationMenuList>
      </NavigationMenu>
  );

  const mobileView = (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* This button will trigger open the mobile sheet menu */}
      <div className='flex items-center gap-5 md:hidden'>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <Link href="/" className="text-xl font-bold tracking-tight">
          🎮 Game Library
        </Link>
      </div>

      <SheetContent className='pt-10 overflow-y-auto' side="left">
        <SheetTitle className='text-center'>🎮 Game Library</SheetTitle>
        
        {/* Tag Filtering */}
        <div className='px-4'>
          <p className='mb-2'>Browse</p>
          <div className='relative w-full'>
            <Input
              ref={searchInput}
              className="w-full pl-8"
              placeholder="Filter" 
              onChange={filterChange}
            />
            <Search className="size-[20px] absolute top-0 m-2" />
          </div>

          <p className='mt-2'>Genre</p>
          {Array.from(genreList).splice(0,5).map((item, index) => <Link key={index} href={`/genre/${item.slug}`}>
            <div className='cursor-pointer my-2 mx-3 grid grid-cols-2'>
              <span className='text-md capitalize'>{item.name}</span>
              <Badge className='justify-self-end' variant="secondary">{item.games_count}</Badge>
            </div>
          </Link>)}

          <hr />

          <p className='mt-2'>Tag</p>
          {Array.from(tagList).splice(0,5).map((item, index) => <Link key={index} href={`/tags/${item.slug}`}>
            <div className='cursor-pointer my-2 mx-3 grid grid-cols-2'>
              <span className='text-md capitalize'>{item.name}</span>
              <Badge className='justify-self-end' variant="secondary">{item.games_count}</Badge>
            </div>
          </Link>)}
        </div>

        {!session ? <div className="flex flex-col items-start">
          
          <Button
            variant="link"
            onClick={() => openDialog('signup')}
          >
            Sign Up
          </Button>
          <Button
            variant="link"
            onClick={() => openDialog('login')}
          >
            Login
          </Button>
        </div>
        :
        <div className="flex flex-col items-start">
          <Button onClick={logout} variant="link">
            Logout
          </Button>
        </div>
      }
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="w-full border-b">
      <div className="flex h-14 items-center px-4">
        {webView}
        {mobileView}
      </div>
    </header>
  );
}