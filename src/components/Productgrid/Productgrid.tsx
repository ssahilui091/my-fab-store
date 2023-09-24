import React from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

import { GridProps } from "./Productgrid.types";
import { StyledTableCell } from "../../styledComponents/TableCell";

export default function ProductGrid(props: GridProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Product table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((products, index) => (
            <TableRow key={index}>
              <StyledTableCell>{products.title}</StyledTableCell>
              <StyledTableCell>{products.price.toFixed(2)}</StyledTableCell>
              <StyledTableCell>{products.description}</StyledTableCell>
              <StyledTableCell>{products.rating}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
