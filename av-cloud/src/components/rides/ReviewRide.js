import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ReviewRide = (props) => {
  const { ride } = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        {/* <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead> */}
        <TableBody>
        <TableRow
            key={ride.car_id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="ride">
              Car ID
            </TableCell>
            <TableCell align="right">{ride.car_id}</TableCell>
          </TableRow>
          <TableRow
            key={ride.source}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="ride">
              Source
            </TableCell>
            <TableCell align="right">{ride.start_loc}</TableCell>
          </TableRow>
          <TableRow
            key={ride.destination}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="ride">
              Destination
            </TableCell>
            <TableCell align="right">{ride.destination_loc}</TableCell>
          </TableRow>

          <TableRow
            key={ride.car_type}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="ride">
              Model
            </TableCell>
            <TableCell align="right">audi.a2</TableCell>
          </TableRow>

          
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReviewRide;
