export interface IReciver {
  id: string;
  email: string;
  status: "sent" | "pending" | "failed" | "opened";
  variables: string;
  templateId: string;
  openedAt: Date | null;
  openedCount: number;
}

export const getDefaultReciver = (): IReciver => ({
  id: "" + Math.floor(10000 + Math.random() * 90000),
  email: "",
  status: "pending",
  variables: "",
  templateId: "",
  openedAt: null,
  openedCount: 0,
});

export const reciverData: IReciver[] = [getDefaultReciver(), getDefaultReciver()];
