"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import CreateSenderDialog from "./createDialog";
import { ISender } from "./type";
import { getSendersByUserId } from "@/db/senders";
import { useSenderStore } from "@/store/sender";

const SelectSender = () => {
  const { user } = useUser();
  const [open, setOpen] = React.useState(false);
  const { selectedSender, setSelectedSender } = useSenderStore();
  const { data: senders, isLoading } = useQuery<ISender[]>({
    queryKey: ["senders", user?.id],
    queryFn: async () => {
      const senders = await getSendersByUserId(user?.id || "");
      if (senders.length > 0) {
        setSelectedSender(senders[0]);
      }
      return senders;
    },
  });
  return (
    <>
      <Select
        value={selectedSender?.id}
        onValueChange={(value) => {
          if (value === "create") {
            setOpen(true);
            return;
          }
          const selectedSender = senders?.find((sender) => sender.id === value);
          if (selectedSender) {
            setSelectedSender(selectedSender);
          }
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a sender" />
        </SelectTrigger>
        <SelectContent>
          {senders?.map((sender) => (
            <SelectItem key={sender.id} value={sender.id}>
              {sender.name}
            </SelectItem>
          ))}
          {isLoading && (
            <SelectItem disabled value="loading">
              Loading...
            </SelectItem>
          )}
          {senders?.length === 0 && (
            <SelectItem disabled value="no">
              No senders found
            </SelectItem>
          )}
          <SelectItem value="create">Add New Sender</SelectItem>
        </SelectContent>
      </Select>
      <CreateSenderDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default SelectSender;
