import React, { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useEmailTemplateStore } from "@/store/template";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { IReciver } from "@/components/mailer/type";
import { deleteReceiver } from "@/db/recivers";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
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

const NewTable = ({
  reciverData,
  templateId,
}: {
  reciverData: IReciver[];
  templateId: string;
}) => {
  const [search, setSearch] = React.useState("");

  const [sortBy, setSortBy] = React.useState<string | null>(null);
  const [allColumns, setAllColumns] = React.useState<string[]>([]);
  const [visibleColumns, setVisibleColumns] = React.useState<string[]>([]);

  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const queryClient = useQueryClient();
  const { selectedTemplate } = useEmailTemplateStore();

  const handleRemoveReciverMutation = useMutation({
    mutationFn: async (id: string) => {
      await deleteReceiver(id);
    },
    onMutate: async (id: string) => {
      // setIsCartUpdating(true);
      await queryClient.cancelQueries({
        queryKey: ["receivers", templateId],
      });
      queryClient.setQueryData(
        ["receivers", templateId],
        (oldRecivers: any) => {
          if (oldRecivers) {
            const updatedRecivers = oldRecivers.filter(
              (reciver: any) => reciver.id !== id
            );
            return updatedRecivers;
          }
          return oldRecivers;
        }
      );
    },
    onSuccess: () => {
      toast.success("Reciver deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete reciver");
      queryClient.invalidateQueries({
        queryKey: ["receivers", templateId],
      });
    },
  });

  useEffect(() => {
    if (reciverData.length > 0) {
      const variables = JSON.parse(reciverData[0].variables);
      setAllColumns(Object.keys(variables));
      setVisibleColumns(Object.keys(variables));
    }
  }, [reciverData, templateId]);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="max-w-sm"
        />
        <div className="w-full flex justify-end gap-4">
          <Button
            variant="destructive"
            onClick={() => {
              reciverData.forEach((reciver) => {
                if (selectedIds.includes(reciver.id)) {
                  handleRemoveReciverMutation.mutate(reciver.id);
                }
              });
            }}
          >
            Delete
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
            onClick={() => {
              sendMails(
                reciverData.filter((reciver) =>
                  selectedIds.includes(reciver.id)
                ),
                selectedTemplate?.content || "",
                selectedTemplate?.subject || ""
              );
            }}
          >
            Send Mails
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
                    if (reciverData.every((reciver) =>
                      selectedIds.includes(reciver.id)
                    )) {
                      setSelectedIds([]);
                    } else {
                      setSelectedIds(reciverData.map((reciver) => reciver.id))
                    }
                  }}
                />
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Email</TableHead>
              {visibleColumns.map((column) => (
                <TableHead key={column}>{column}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {reciverData.filter((reciver) =>
              reciver.email.toLowerCase().includes(search.toLowerCase())
            ).map((reciver) => {
              const variables = JSON.parse(reciver.variables);
              return (
                <TableRow key={reciver.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(reciver.id)}
                      onCheckedChange={(value: any) =>
                        setSelectedIds((prev) =>
                          value
                            ? [...prev, reciver.id]
                            : prev.filter((id) => id !== reciver.id)
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Badge variant={reciver.status === "pending" ? "secondary" : reciver.status === "sent" ? "default" : "destructive"} className="capitalize">
                        {reciver.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{reciver.email}</TableCell>
                  {visibleColumns.map((column) => (
                    <TableCell key={column}>{variables[column]}</TableCell>
                  ))}
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
