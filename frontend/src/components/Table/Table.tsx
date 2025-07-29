import { useCallback, useMemo, useState } from "react";
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import "./Table.css";
import { type BaseItem, type TableProps, TableVariants } from "../../types/Types.ts";

interface ExtendedTableProps<T extends BaseItem> extends TableProps<T> {
  onRowClick?: (row: T) => void;
}

export function Table<T extends BaseItem>({
  data,
  columns,
  pagination,
  variant = TableVariants.DEFAULT,
  onRowClick
}: Readonly<ExtendedTableProps<T>>) {
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalItems = useMemo(() => data.length, [data]);
  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems, itemsPerPage]
  );
  const startIndex = useMemo(
    () => (totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1),
    [currentPage, totalItems, itemsPerPage]
  );
  const endIndex = useMemo(
    () => Math.min(currentPage * itemsPerPage, totalItems),
    [currentPage, itemsPerPage, totalItems]
  );

  const paginationOptions = useMemo(() => {
    const pageSizes = [5, 10, 25, 50];
    return pageSizes
      .filter((size) => totalItems >= size)
      .map((size) => (
        <MenuItem key={size} value={size}>
          {size}
        </MenuItem>
      ));
  }, [totalItems]);

  const currentData = useMemo(() => {
    if (!pagination) return data;
    return data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [data, pagination, currentPage, itemsPerPage]);

  const handleItemsPerPageChange = useCallback((e: SelectChangeEvent<string>) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  }, []);

  const goToPreviousPage = useCallback(() => {
    setCurrentPage((prev) => prev - 1);
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => prev + 1);
  }, []);

  return (
    <div className={`table ${variant}`}>
      <MuiTable>
        <TableHead className="theader">
          <TableRow>
            {columns.map((column) => (
              <TableCell key={String(column.value)} className="theader_cell">
                {column?.renderHeaderCell ? column.renderHeaderCell() : column.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className="tbody">
          {Array.isArray(data) && data.length > 0 ? (
            currentData.map((item) => (
              <TableRow
                key={item.id}
                className="trow TextFirstUppercase"
                hover
                onClick={() => onRowClick?.(item)}
                sx={{ cursor: onRowClick ? "pointer" : "default" }}
              >
                {columns.map((column) => (
                  <TableCell key={`${item.id}_${String(column.value)}`} className="tcell">
                    {column?.renderCell
                      ? column.renderCell(item, column)
                      : column.value in item && String(item[column.value])}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="trow">
              <TableCell className="tcell text-center" colSpan={columns.length}>
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </MuiTable>

      {/* Pagination */}
      {pagination && (
        <Box
          className="Pagination"
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          mt={2}
        >
          <Typography variant="body2" mr={2}>
            Rows per page:
          </Typography>
          <FormControl size="small" sx={{ minWidth: 80, mr: 2 }}>
            <Select
              value={itemsPerPage.toString()}
              onChange={handleItemsPerPageChange}
              size="small"
            >
              {paginationOptions}
            </Select>
          </FormControl>
          <Typography variant="body2" mr={2}>
            {startIndex} - {endIndex} of {totalItems}
          </Typography>
          <IconButton onClick={goToPreviousPage} disabled={currentPage === 1}>
            <ChevronLeft />
          </IconButton>
          <IconButton onClick={goToNextPage} disabled={currentPage === totalPages}>
            <ChevronRight />
          </IconButton>
        </Box>
      )}
    </div>
  );
}
