import { Button } from "@/components/ui/button";
import Image from "next/image";
import style1 from "../../public/mono.jpg";
import style2 from "../../public/edgy.jpg";
import style3 from "../../public/scar.jpg";
import { CardCarousel } from "@/components/ui/card-carousel";
import Link from "next/link";

const images = [
  { src: style1, alt: "style1" },
  { src: style2, alt: "style2" },
  { src: style3, alt: "style3" },
];
export default function Home() {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center md:px-32 px-5 py-10'>
      <div className='flex items-center justify-start w-full  gap-4'>
        <p className='text-primary font-serif text-3xl font-bold'>Styla</p>
      </div>
      <p className='md:text-6xl text-xl font-semibold font-serif'>
        Discover Your Perfect Style
      </p>
      <Button className={"my-10 py-6 px-8 rounded-sm"} asChild>
        <Link href='/app'>Get Started</Link>
      </Button>
      <div className='overflow-x-clip flex items-center justify-center'>
        {" "}
        <CardCarousel images={images} />
      </div>
      <h2 className='text-xl font-semibold'>Quick Start</h2>
      <p>
        <span className='font-semibold'>Tell Us Your Style</span> - Answer a few
        quick questions about your preferences.
      </p>
      <p className='my-5'>
        <span className='font-semibold'>Get AI Recommendations</span> - Our AI
        suggests outfits, accessories, and brands you'll love.
      </p>
      <p>
        <span className='font-semibold'>Shop Your Favorites</span> - Save your
        picks or buy directly from trusted stores.
      </p>

      <Button className={"my-5 py-6 px-8 rounded-sm"}>Explore</Button>
    </main>
  );
}
