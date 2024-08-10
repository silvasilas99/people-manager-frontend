"use client";

import { useState } from "react";

import CreatingFormModal from "@/components/CreatingFormModal";
import Table from "@/components/Table";

export default function Home() {
  const [showCreatingFormModal, setShowCreatingFormModal] = useState(false);

  return (
    <>
      <div className="p-24">
        {/* TODO: TRANSFER THIS "GHOST" TAG FOR A REUSABLE COMPONENTS THAT REUSES THE BUTTOM */}
        <div className="flex justify-start">
          <button
            className="
              h-16
              uppercase
              text-white
              text-lg
              font-bold
              px-6
              mr-6
              mb-6
              shadow
              rounded
              outline-none
              bg-green-400
              hover:shadow-lg
              active:bg-green-900
              focus:outline-none
              duration-150
              transition-all
            "
            onClick={() => setShowCreatingFormModal(true)}
          >
            Create
          </button>
          
        </div>
        <div className="flex flex-col items-center justify-between">
          <Table />

          {showCreatingFormModal &&
            <CreatingFormModal
              showModal={showCreatingFormModal}
              setShowModal={setShowCreatingFormModal}
            />
          }
        </div>
      </div>
    </>
  );
}
