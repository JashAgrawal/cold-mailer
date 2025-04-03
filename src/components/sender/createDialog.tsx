import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createSender } from "@/db/senders";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const CreateSenderDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { user } = useUser();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [type, setType] = React.useState<"gmail">("gmail");
  const queryClient = useQueryClient();
  const createSenderMutation = useMutation({
    mutationFn: async () => {
      await createSender({
        userId: user?.id || "",
        name,
        email,
        password,
        type,
      });
    },
    onSuccess: () => {
      toast.success("Sender created successfully");
      setOpen(false);
      setName("");
      setEmail("");
      setPassword("");
      setType("gmail");
      setOpen(false);
    },
    onError: () => {
      toast.error("Failed to create sender");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["senders", user?.id],
      });
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Sender</DialogTitle>
        </DialogHeader>
        <div>
          <form
            className="gap-4 flex flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              createSenderMutation.mutate();
            }}
          >
            <div className="flex flex-col gap-2">
              <Label>Name</Label>
              <Input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Email</Label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>
                App Password (Generate from here{" "}
                <Link
                  target="_blank"
                  className="underline"
                  href="https://myaccount.google.com/u/0/apppasswords"
                >
                  Here
                </Link>
                )
              </Label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Type</Label>
              <Select
                required
                value={type}
                onValueChange={(v) => setType(v as "gmail")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gmail">Gmail</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button disabled={createSenderMutation.isPending} type="submit">
              {createSenderMutation.isPending ? "Creating..." : "Create"}
            </Button>
          </form>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSenderDialog;
