import PreferenceSelectiion from "@/components/preference-selection";
import React from "react";

const PreferncesPage = () => {
  return (
    <main className='2xl:px-52 xl:px-32 md:px-10 p-4'>
      <h1 className='text-xl font-bold'>Preferences</h1>

      <PreferenceSelectiion />
    </main>
  );
};

export default PreferncesPage;
