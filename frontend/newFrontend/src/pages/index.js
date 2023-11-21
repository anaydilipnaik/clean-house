import { Box, Container, Grid, Button } from "@mui/material";
import { UpcomingAppts } from "../components/dashboard/vendor/upcoming-appointments";
import { PastAppts } from "../components/dashboard/vendor/past-appointments";
import { DashboardLayout } from "../components/dashboard-layout";
import CreateService from "../components/dashboard/vendor/create-service";
// Customer Imports
import { UpcomingApptsCustomer } from "../components/dashboard/customer/upcoming-appointments";
import { PastApptsCustomer } from "../components/dashboard/customer/past-appointments";
import { CustomerServices } from "../components/dashboard/customer/customer-services";
import { useEffect, useState } from "react";

const Page = () => {
  const [userType, setUserType] = useState(null);
  const [isServices, setIsServices] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      let userTypeTemp = JSON.parse(localStorage.getItem("user")).user_type;
      setUserType(userTypeTemp);
    }
  }, []);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Grid container direction="column" spacing={3}>
          {userType && userType === "VENDOR" ? (
            <>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <CreateService />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <UpcomingAppts />
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <PastAppts />
              </Grid>
            </>
          ) : userType && userType === "CUSTOMER" ? (
            isServices ? (
              <CustomerServices isServices={isServices} setIsServices={setIsServices} />
            ) : (
              <>
                <Grid item>
                  <Button
                    variant="text"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsServices(true);
                    }}
                    sx={{ fontStyle: "italic" }}
                  >
                    ← View All Services
                  </Button>
                </Grid>
                <Grid item md={12}>
                  <UpcomingApptsCustomer />
                </Grid>
                <Grid item md={12}>
                  <PastApptsCustomer />
                </Grid>
              </>
            )
          ) : null}
        </Grid>
      </Container>
    </Box>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
