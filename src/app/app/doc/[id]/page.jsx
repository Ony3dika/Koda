"use client";
import React from "react";
import Tiptap from "@/components/home/tiptap";
import { useFetchDocumentById } from "@/lib/documet-actions";
import { Skeleton } from "@/components/ui/skeleton";
const DocPage = ({ params }) => {
  const resolved = React.use(params);
  const { data: document, isPending } = useFetchDocumentById(resolved.id);

  console.log(document);
  return (
    <main className='px-4'>
      {isPending ? (
        <div className='flex flex-col gap-4'>
          <Skeleton className='w-full h-8' />
          <Skeleton className='w-1/3 h-8' />
          <Skeleton className='w-2/3 h-8' />
          <Skeleton className='w-4/5 h-8' />
          <Skeleton className='w-3/4 h-8' />
          <Skeleton className='w-full h-8' />
          <Skeleton className='w-3/5 h-8' />
        </div>
      ) : (
        <Tiptap content={document?.content} id={resolved.id} />
      )}
    </main>
  );
};

export default DocPage;
