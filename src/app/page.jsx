import { Button } from "@/components/ui/button";
import Image from "next/image";

import Link from "next/link";


export default function Home() {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center md:px-32 px-5 py-10'>
      <div className='flex items-center justify-start w-full  gap-4'>
        <p className='text-primary  text-3xl font-bold'>Koda</p>
      </div>
      <p className='md:text-6xl text-xl font-semibold f italic'>
       Collaborate In Real Time
      </p>
      <Button className={"my-10 py-6 px-8 rounded-sm"} asChild>
        <Link href='/app'>Get Started</Link>
      </Button>
      <div className='overflow-x-clip flex items-center justify-center'>
        {" "}
       
      </div>
      <h2 className='text-xl font-semibold'>Quick Start</h2>
      
    </main>
  );
}
