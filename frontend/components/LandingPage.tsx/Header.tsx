'use client'
import { Bot, Menu, Minus, X } from 'lucide-react'
import React, { useState } from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '../ui/button';
import ThemeButton from '../ui/themebutton';
import Link from 'next/link';

function Header() {
  const [open, setOpen] = useState(false);


  return (
    <div className='sticky top-0 z-50  border-b dark:bg-[#111314]  bg-[#ece8e8] border-neutral-400/80 dark:border-neutral-800/80 px-4 py-4 mb-3 '>
      <nav className="flex max-w-5/6  mx-auto items-center justify-between ">
        <div className="flex items-center  gap-2">
          <Bot className='w-8 h-8 mb-1' />
          <h1 className="text-lg font-bold md:text-2xl">SOLBOT</h1>
        </div>

        <div className='md:flex gap-12 items-center hidden'>
          <div className='hover:text-gray-500'>Home</div>
          <div className='hover:text-gray-500'>Features</div>
          <div className='hover:text-gray-500'>Contact</div>
        </div>
        <div className='lg:flex gap-4 hidden '>
          <ThemeButton />
          <Link
            href="https://t.me/XTradeSolBot"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className=" transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5   dark:bg-white dark:text-black   text-md light:bg-gradient-to-b from-gray-800 to-black  shadow-md hover:opacity-90 ">
              START TRADING
            </button>
          </Link>
        </div>


        <Drawer direction='top' >
          <DrawerTrigger asChild>
            {
              open ? (<X onClick={() => setOpen(!open)} className='md:hidden' />) : (<Menu className='lg:hidden' onClick={() => !open} />)
            }
          </DrawerTrigger>
          <DrawerContent>

            <div className="mx-auto w-full max-w-sm">

              <div className='border-b   border-neutral-400/80 dark:bg-neutral-800/80'>
                <DrawerHeader className='font-mono'>


                  <DrawerTitle className=''>
                    <div className='flex justify-between'>
                      <div className="flex items-center  gap-2">
                        <Bot className='w-8 h-8 mb-1' />
                        <h1 className="text-base font-bold md:text-2xl">SOLBOT</h1>
                      </div>
                      <DrawerClose asChild>
                        <X />
                      </DrawerClose>
                    </div>
                  </DrawerTitle>
                  {/* <DrawerDescription className=''>Set your daily activity goal.</DrawerDescription> */}
                </DrawerHeader>
              </div>
              <div className="p-4 pb-0">
                <div className="p-2 font-mono">

                  <div className='hover:text-gray-500 text-2xl mb-3'>Home</div>
                  <div className='hover:text-gray-500 text-2xl mb-3'>Features</div>
                  <div className='hover:text-gray-500 text-2xl'>Contact</div>
                  <ThemeButton />

                </div>

              </div>
              <DrawerFooter>
                <Button className='font-mono text-lg'>START TRADING</Button>

              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </nav>
    </div>
  )
}

export default Header