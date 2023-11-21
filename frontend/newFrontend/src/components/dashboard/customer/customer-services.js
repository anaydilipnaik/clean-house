import { Card, CardContent, Grid, Typography, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverURL } from "../../../utils/config";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Book from "./Book";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export const CustomerServices = (props) => {
  const [userId, setUserId] = useState(null);
  const [allServices, setAllServices] = useState([]);
  const [bookingModal, setBookingModal] = useState(false);
  const [serviceId, setServiceId] = useState(null);
  const [location, setLocation] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [serviceDate, setServiceDate] = useState(null);

  const onBookingClick = (e, serviceId) => {
    e.preventDefault();
    setBookingModal(true);
    setServiceId(serviceId);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setBookingModal(false);
    getDetails();
  };

  const getDetails = () => {
    axios
      .get(
        `${serverURL}/services?location=${location}&service-type=${serviceType}&date=${
          serviceDate ? serviceDate.toISOString().split("T")[0].replace(/-/g, "/") : ""
        }`
      )
      .then((res) => {
        console.log("res: ", res);
        setAllServices(res.data.services);
      })
      .catch((err) => {
        console.log("Err ", err);
      });
  };

  useEffect(() => {
    getDetails();
  }, [userId, location, serviceDate, serviceType]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      let userIdTemp = JSON.parse(localStorage.getItem("user")).id;
      setUserId(userIdTemp);
    }
  }, []);

  return (
    <>
      <Card style={{ width: "70rem" }} sx={{ height: "100%" }} {...props}>
        <CardContent>
          <Grid container direction="column" spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item container direction="row" justifyContent={"space-between"}>
              <Grid item>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="overline"
                  sx={{
                    fontSize: "20px",
                  }}
                >
                  All Services
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={(e) => {
                    e.preventDefault();
                    props.setIsServices(false);
                  }}
                >
                  View My Appointments
                </Button>
              </Grid>
              <Grid container direction="column" spacing={2}>
                <Grid item container direction="row" spacing={2}>
                  <Grid item>
                    <TextField
                      placeholder="Location"
                      defaultValue={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      placeholder="Service Type"
                      defaultValue={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="Date"
                        value={serviceDate}
                        onChange={(newValue) => {
                          setServiceDate(newValue);
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </Grid>
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
                      <TableCell align="Center"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allServices.length > 0 &&
                      allServices.map((row) => {
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
                            <TableCell align="Center">
                              <Button
                                type="submit"
                                variant="outlined"
                                size="small"
                                onClick={(e) => onBookingClick(e, row.id)}
                                style={{ backgroundColor: "blue", color: "white" }}
                              >
                                Book
                              </Button>
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
      <Book
        open={bookingModal}
        handleClose={handleClose}
        serviceId={serviceId}
        userId={userId}
        setIsServices={props.setIsServices}
      />
    </>
  );
};
