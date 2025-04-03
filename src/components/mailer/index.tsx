"use client";
import NewReceiverForm from "@/components/mailer/newReciverForm";
import React from "react";
import { IReciver } from "@/components/mailer/type";
import NewTable from "./newTable";

const Mailer = ({
  templateId,
  receivers,
}: {
  templateId: string;
  receivers: IReciver[];
}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full">
        <NewTable reciverData={receivers} templateId={templateId} />
      </div>
      <NewReceiverForm templateId={templateId} />
    </div>
  );
};

export default Mailer;
