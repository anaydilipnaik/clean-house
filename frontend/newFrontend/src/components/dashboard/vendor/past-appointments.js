import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverURL } from "../../../../../newFrontend/src/utils/config";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CustomizedDialogs from "./service-feedback";

export const PastAppts = (props) => {
  const [userId, setUserId] = useState(null);
  const [pastServices, setPastServices] = useState([]);

  //Fix the reviews button
  const onReviewsClick = (service_id) => {
    console.log("onReviewsClick", service_id);
    // axios
    //   .get(`${serverURL}/services/reviews/${service_id}`)
    //   .then((res) => {
    //     console.log("onReviewsClick");
    //     console.log("testtt3", res.data);
    //   })
    //   .catch((err) => {
    //     console.log("Err ", err);
    //   });
  };

  useEffect(() => {
    axios
      .get(`${serverURL}/services/requests/${userId}`)
      .then((res) => {
        setPastServices(res.data.past_services);
      })
      .catch((err) => {
        console.log("Err ", err);
      });
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
        <Grid container direction="column" spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Past Appointments
            </Typography>
          </Grid>
          <Grid item>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Service Type</TableCell>
                    <TableCell align="Center">Date</TableCell>
                    <TableCell align="Center">Time</TableCell>
                    <TableCell align="Center">Location</TableCell>
                    <TableCell align="Center">Price</TableCell>
                    <TableCell align="Center">Description</TableCell>
                    <TableCell align="Center">Customer ID</TableCell>
                    <TableCell align="Center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pastServices.map((row) => {
                    console.log("scdscsd", pastServices);
                    return (
                      <TableRow
                        key={row.id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell align="Center" component="th" scope="row">
                          {row.service_type}
                        </TableCell>
                        <TableCell align="Center">
                          {row.date.split(" ").slice(0, 4).join(" ")}
                        </TableCell>
                        <TableCell align="Center">{row.time}</TableCell>
                        <TableCell align="Center">{row.location}</TableCell>
                        <TableCell align="Center">${row.price}</TableCell>
                        <TableCell align="Center">{row.description}</TableCell>
                        <TableCell align="Center">{row.customer_id}</TableCell>
                        <TableCell align="Center">
                          {/* <Button
                            type="submit"
                            variant="outlined"
                            size="small"
                            onClick={() => onReviewsClick(row.id)}
                            style={{ backgroundColor: "blue", color: "white" }}
                          >
                            View Feedback
                          </Button> */}
                          <CustomizedDialogs id={row.id} customer_id={row.customer_id} />
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
