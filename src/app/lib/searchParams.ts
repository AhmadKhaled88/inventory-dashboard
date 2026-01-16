import { parseAsString } from "nuqs/server";

export const qParam = parseAsString.withDefault("");
export const categoryParam = parseAsString.withDefault("");

export type DashboardSearchParams = {
  q?: string;
  category?: string;
};
