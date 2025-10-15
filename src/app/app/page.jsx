"use client";
import DocCard from "@/components/doc-card";
import AddDocument from "@/components/add-document-modal";
import { useState, useEffect, useId } from "react";
import { useFetchDocuments } from "@/lib/documet-actions";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  FileQuestionMark,
  LoaderCircleIcon,
  MicIcon,
  SearchIcon,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { set } from "react-hook-form";
const HomePage = () => {
  const { data: documents, isPending } = useFetchDocuments();
  console.log(documents);
  const id = useId();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  
  useEffect(() => {
    if (inputValue) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
    setIsLoading(false);
  }, [inputValue]);

  useEffect(() => {
   setFilteredDocuments(documents)
  }, [documents])
  
  return (
    <main className='p-4'>
      <div className='flex justify-between'>
        <h2 className='text-3xl font-semibold'>Recent files</h2>
        <AddDocument />
      </div>

      <div className='*:not-first:mt-2 flex justify-end my-5'>
        <div className='relative w-full md:w-1/3 xl:w-1/4'>
          <Input
            id={id}
            className='peer ps-9  focus-visible:border-ring/50 focus-visible:ring-[0px]'
            placeholder='Search documents...'
            type='search'
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setFilteredDocuments(
                documents.filter((doc) =>
                  doc.title.toLowerCase().includes(e.target.value.toLowerCase())
                )
              );
            }}
          />
          <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50'>
            {isLoading ? (
              <LoaderCircleIcon
                className='animate-spin'
                size={16}
                role='status'
                aria-label='Loading...'
              />
            ) : (
              <SearchIcon size={16} aria-hidden='true' />
            )}
          </div>
        </div>
      </div>

      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:h-[60vh] overflow-auto [scrollbar-color:--alpha(var(--foreground)/20%)_transparent] [scrollbar-width:thin]'>
        {filteredDocuments?.map((doc) => (
          <DocCard key={doc.id} doc={doc} />
        ))}

        {isPending &&
          [1, 2, 3, 4, 5, 6].map((doc) => (
            <Skeleton key={doc} className={"h-56"} />
          ))}

        {documents?.length === 0 && (
          <Empty className='border border-dashed md:col-span-3 xl:col-span-4 w-full'>
            <EmptyHeader>
              <EmptyMedia variant='icon'>
                <FileQuestionMark />
              </EmptyMedia>
              <EmptyTitle>No Documents</EmptyTitle>
              <EmptyDescription>
                Create a new document to get started
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <AddDocument />
            </EmptyContent>
          </Empty>
        )}
      </section>
    </main>
  );
};

export default HomePage;
