import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { serverURL } from "../../../../../newFrontend/src/utils/config";
import axios from "axios";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const UpcomingAppts = (props) => {
  const [userId, setUserId] = useState(null);
  const [futureServices, setFutureServices] = useState([]);

  const onApprovalClick = (e, service_id, status) => {
    e.preventDefault();
    axios
      .put(`${serverURL}/services/${service_id}`, { status: status })
      .then((res) => {
        console.log("onApprovalClick");
        getDetails();
      })
      .catch((err) => {
        console.log("Err ", err);
      });
  };

  const getDetails = () => {
    axios
      .get(`${serverURL}/services/requests/${userId}`)
      .then((res) => {
        setFutureServices(res.data.future_services);
      })
      .catch((err) => {
        console.log("Err ", err);
      });
  };

  useEffect(() => {
    getDetails();
  }, [userId]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      let userIdTemp = JSON.parse(localStorage.getItem("user")).id;
      setUserId(userIdTemp);
    }
  }, []);

  return (
    <Card style={{ width: "70rem" }} sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Upcoming Appointments
            </Typography>
          </Grid>
          <Grid item>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Service Type</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Time</TableCell>
                    <TableCell align="center">Location</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="center">Customer ID</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {futureServices.map((row) => {
                    return (
                      <TableRow
                        key={row.id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell align="center" component="th" scope="row">
                          {row.service_type}
                        </TableCell>
                        <TableCell align="center">
                          {row.date.split(" ").slice(0, 4).join(" ")}
                        </TableCell>
                        <TableCell align="center">{row.time}</TableCell>
                        <TableCell align="center">{row.location}</TableCell>
                        <TableCell align="center">${row.price}</TableCell>
                        <TableCell align="center">{row.description}</TableCell>
                        <TableCell align="center">{row.customer_id}</TableCell>
                        <TableCell align="center">
                          {row.status == "PENDING" ? (
                            <>
                              <Box
                                sx={{
                                  display: "grid",
                                  gap: 2,
                                  gridTemplateColumns: "repeat(2, 1fr)",
                                }}
                              >
                                <Button
                                  type="submit"
                                  variant="outlined"
                                  size="small"
                                  onClick={(e) => onApprovalClick(e, row.id, "REJECTED")}
                                  style={{ backgroundColor: "red", color: "white" }}
                                >
                                  Reject
                                </Button>

                                <Button
                                  type="submit"
                                  variant="outlined"
                                  size="small"
                                  onClick={(e) => onApprovalClick(e, row.id, "APPROVED")}
                                  style={{ backgroundColor: "green", color: "white" }}
                                >
                                  Accept
                                </Button>
                              </Box>
                            </>
                          ) : (
                            row.status
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
