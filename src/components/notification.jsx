"use client";
import { XIcon, Info } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Component() {
  const [isOpen, setIsOpen] = useState(true);

  if (isOpen)
    return (
      <div className='z-50 md:hidden block fixed top-5 right-0 rounded-md border bg-background p-4 shadow-lg'>
        <div className='flex gap-2'>
          <div className='flex grow flex-col gap-3'>
            <div className='space-y-1'>
              <div className='flex'>
                <Info
                  className='mr-2 shrink-0 text-blue-500'
                  size={16}
                  aria-hidden='true'
                />
                <p className='text-sm font-medium'>Consider Switching Devices</p>
              </div>
              <p className='text-sm text-muted-foreground'>
               For the best experience, it is recommended you switch to desktop.
              </p>
            </div>
            <div className='flex gap-2'>
              <Button size='sm' onClick={() => setIsOpen(false)}>
                Ok, I'll switch
              </Button>
              <Button
                size='sm'
                variant='outline'
                onClick={() => setIsOpen(false)}
              >
                No, I don't care
              </Button>
            </div>
          </div>
          <Button
            variant='ghost'
            className='group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent'
            aria-label='Close notification'
            onClick={() => setIsOpen(false)}
          >
            <XIcon
              size={16}
              className='opacity-60 transition-opacity group-hover:opacity-100'
              aria-hidden='true'
            />
          </Button>
        </div>
      </div>
    );
}
