import React from 'react'
import Tiptap from "@/components/home/tiptap";
const DocPage = ({params}) => {
  const {id} = params
  return (
    <main className='px-4'>
      <Tiptap />
    </main>
  );
}

export default DocPage