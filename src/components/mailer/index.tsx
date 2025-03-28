"use client";
import NewReciverForm from "@/components/mailer/newReciverForm";
import React from "react";
import { IReciver } from "@/components/mailer/type";
import NewTable from "./newTable";

const Mailer = ({templateId, receivers}: {templateId: string, receivers: IReciver[]}) => {

  return (
    <div className="flex flex-col gap-4">
      <div className="container">
        <NewTable reciverData={receivers} templateId={templateId} />
      </div>
      <NewReciverForm templateId={templateId}/>
    </div>
  );
};

export default Mailer;
