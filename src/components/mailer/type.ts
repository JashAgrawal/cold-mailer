export interface IReciver {
  id: string;
  email: string;
  status: "sent" | "pending" | "failed";
  variables: string;
  templateId: string;
}

export const getDefaultReciver = (): IReciver => ({
  id: "" + Math.floor(10000 + Math.random() * 90000),
  email: "",
  status: "pending",
  variables: "",
  templateId: "",
});

export const reciverData: IReciver[] = [getDefaultReciver(), getDefaultReciver()];
