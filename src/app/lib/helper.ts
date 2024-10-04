export interface SortByOptions {
  createdAt_asc: string;
  filename_asc: string;
  filename_desc: string;
}

export const mapSortBy: SortByOptions = {
  createdAt_asc: "Created At ASC",
  filename_asc: "Filename ASC",
  filename_desc: "Filename DESC",
};
