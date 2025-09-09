import React from 'react'
import Tiptap from "@/components/home/tiptap";
const DocPage = ({params}) => {
  const {id} = params
  return (
    <main className='px-4'>
      <Tiptap content={"Hello Loser"} />
    </main>
  );
}

export default DocPage