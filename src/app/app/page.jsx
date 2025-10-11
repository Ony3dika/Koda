"use client";
import DocCard from "@/components/doc-card";
import AddDocument from "@/components/add-document-modal";
import React from "react";
import { useFetchDocuments } from "@/lib/documet-actions";
import { Skeleton } from "@/components/ui/skeleton";
const HomePage = () => {
  const { data: documents, isPending } = useFetchDocuments();
  console.log(documents);

  return (
    <main className='p-4'>
      <AddDocument />
      <section className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5 '>
        {documents?.map((doc) => (
          <DocCard key={doc.id} doc={doc} />
        ))}

        {isPending &&
          [1, 2, 3, 4].map((doc) => <Skeleton key={doc} className={"h-56"} />)}
      </section>
    </main>
  );
};

export default HomePage;
