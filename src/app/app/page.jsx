import DocCard from "@/components/doc-card";
import React from "react";
const HomePage = () => {
  // category = Sales | Blogging | Personal | Work
  const cards = [
    {
      title: "Devi Sales Copy",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.",
      category: "Sales",
      date: "12/12/2023",
    },
    {
      title: "Summer Vacation Plan",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.",
      category: "Blogging",
      date: "12/12/2023",
    },
    {
      title: "Workout Routine",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.",
      category: "Personal",
      date: "12/12/2023",
    },
  ];
  return (
    <main className='p-4'>
      <h2 className='text-3xl font-semibold'>Recent files</h2>

      <section className='grid md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5'>
        {cards.map((doc) => (
          <DocCard key={doc.title} doc={doc} />
        ))}
      </section>
    </main>
  );
};

export default HomePage;
