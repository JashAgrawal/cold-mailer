"use client";
import React, { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useEmailTemplateStore } from "@/store/template";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { IReciver } from "@/components/mailer/type";
import { deleteReceiver } from "@/db/recivers";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import moment from "moment";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { sendMails } from "@/utils/mailer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { useSenderStore } from "@/store/sender";
import SelectSender from "../sender/selectSender";

const NewTable = ({
  reciverData,
  templateId,
}: {
  reciverData: IReciver[];
  templateId: string;
}) => {
  const [search, setSearch] = React.useState("");
  const [isSending, setIsSending] = React.useState(false);
  const [sortBy, setSortBy] = React.useState<string | null>(null);
  const [allColumns, setAllColumns] = React.useState<string[]>([]);
  const [visibleColumns, setVisibleColumns] = React.useState<string[]>([]);
  const { selectedSender } = useSenderStore();
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const queryClient = useQueryClient();
  const { selectedTemplate } = useEmailTemplateStore();

  const handleRemoveReceiverMutation = useMutation({
    mutationFn: async (id: string) => {
      await deleteReceiver(id);
    },
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({
        queryKey: ["receivers", templateId],
      });
      queryClient.setQueryData(
        ["receivers", templateId],
        (oldReceivers: any) => {
          if (oldReceivers) {
            const updatedReceivers = oldReceivers.filter(
              (receiver: any) => receiver.id !== id
            );
            return updatedReceivers;
          }
          return oldReceivers;
        }
      );
    },
    onSuccess: () => {
      toast.success("Receiver deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["receivers", templateId],
      });
    },
    onError: () => {
      toast.error("Failed to delete receiver");
      queryClient.invalidateQueries({
        queryKey: ["receivers", templateId],
      });
    },
  });

  useEffect(() => {
    if (reciverData.length > 0) {
      try {
        const variables = JSON.parse(reciverData[0].variables);
        const columnKeys = Object.keys(variables);
        setAllColumns(columnKeys);
        setVisibleColumns(columnKeys);
      } catch (error) {
        console.error("Error parsing variables:", error);
        setAllColumns([]);
        setVisibleColumns([]);
      }
    }
  }, [reciverData, templateId]);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center py-4 gap-4">
        <Input
          placeholder="Filter emails..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full md:max-w-sm"
        />
        <div className="w-full flex flex-wrap justify-end gap-2 md:gap-4">
          <SelectSender />
          <Button
            variant="destructive"
            onClick={() => {
              if (selectedIds.length === 0) {
                toast.error("Please select at least one receiver");
                return;
              }
              setIsDeleting(true);
              Promise.all(
                reciverData
                  .filter((receiver) => selectedIds.includes(receiver.id))
                  .map((receiver) =>
                    handleRemoveReceiverMutation.mutate(receiver.id)
                  )
              ).finally(() => {
                setIsDeleting(false);
                setSelectedIds([]);
              });
            }}
            disabled={isDeleting || selectedIds.length === 0}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {allColumns.map((column, i) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={i}
                    className="capitalize"
                    checked={visibleColumns.includes(column)}
                    onCheckedChange={(value: any) =>
                      setVisibleColumns((prev) =>
                        value
                          ? [...prev, column]
                          : prev.filter((col) => col !== column)
                      )
                    }
                  >
                    {column}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            disabled={isSending || selectedIds.length === 0 || !selectedSender}
            onClick={async () => {
              try {
                if (selectedIds.length === 0) {
                  toast.error("Please select at least one receiver");
                  return;
                }

                if (!selectedSender) {
                  toast.error("Please select a sender");
                  return;
                }

                setIsSending(true);
                await sendMails(
                  reciverData.filter((receiver) =>
                    selectedIds.includes(receiver.id)
                  ),
                  selectedTemplate?.content || "",
                  selectedTemplate?.subject || "",
                  templateId,
                  selectedSender
                );

                queryClient.invalidateQueries({
                  queryKey: ["receivers", templateId],
                });
                toast.success("Emails sent successfully");
                setSelectedIds([]);
              } catch (error) {
                console.error("Error sending emails:", error);
                toast.error("Failed to send emails");
              } finally {
                setIsSending(false);
              }
            }}
          >
            {isSending ? "Sending..." : "Send Emails"}
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox
                  checked={reciverData.every((reciver) =>
                    selectedIds.includes(reciver.id)
                  )}
                  onCheckedChange={() => {
                    if (
                      reciverData.every((reciver) =>
                        selectedIds.includes(reciver.id)
                      )
                    ) {
                      setSelectedIds([]);
                    } else {
                      setSelectedIds(reciverData.map((reciver) => reciver.id));
                    }
                  }}
                />
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Email</TableHead>
              {visibleColumns.map((column) => (
                <TableHead key={column}>{column}</TableHead>
              ))}
              {/* <TableHead>Opened On</TableHead> */}
              <TableHead>Opened Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reciverData.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={visibleColumns.length + 4}
                  className="h-24 text-center"
                >
                  No receivers found
                </TableCell>
              </TableRow>
            )}
            {reciverData
              .filter((receiver) =>
                receiver.email.toLowerCase().includes(search.toLowerCase())
              )
              .map((receiver) => {
                let variables = {};
                try {
                  variables = JSON.parse(receiver.variables);
                } catch (error) {
                  console.error(
                    "Error parsing variables for receiver:",
                    receiver.id
                  );
                }

                return (
                  <TableRow key={receiver.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.includes(receiver.id)}
                        onCheckedChange={(value: any) =>
                          setSelectedIds((prev) =>
                            value
                              ? [...prev, receiver.id]
                              : prev.filter((id) => id !== receiver.id)
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        {receiver.status === "pending" && (
                          <Badge variant="secondary" className="capitalize">
                            {receiver.status}
                          </Badge>
                        )}
                        {receiver.status === "sent" && (
                          <Badge
                            variant="default"
                            className="capitalize bg-blue-500"
                          >
                            {receiver.status}
                          </Badge>
                        )}
                        {receiver.status === "failed" && (
                          <Badge variant="destructive" className="capitalize">
                            {receiver.status}
                          </Badge>
                        )}
                        {receiver.status === "opened" && (
                          <Badge
                            variant="default"
                            className="capitalize bg-green-500"
                          >
                            {receiver.status}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {receiver.email}
                    </TableCell>
                    {visibleColumns.map((column) => (
                      <TableCell key={column}>
                        {variables[column as keyof typeof variables] || "-"}
                      </TableCell>
                    ))}
                    <TableCell className="text-center">
                      {receiver.openedCount}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default NewTable;
