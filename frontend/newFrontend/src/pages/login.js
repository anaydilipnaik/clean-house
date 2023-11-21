import NextLink from "next/link";
import { Box, Button, Container, Link, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { serverURL } from "../utils/config";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let data = {};
    data.email = email;
    data.password = password;
    axios
      .post(serverURL + "/login", data)
      .then((res) => {
        let currentUser = res.data.curr_user;
        localStorage.setItem("user", JSON.stringify(currentUser));
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data);
        setIsSubmitting(false);
      });
  };

  return (
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
      }}
    >
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <Box sx={{ my: 3 }}>
            <Typography color="textPrimary" variant="h4">
              Sign in
            </Typography>
          </Box>
          <TextField
            fullWidth
            label="Email Address"
            margin="normal"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            variant="outlined"
            required
          />
          <Box sx={{ py: 2 }}>
            <Button
              color="primary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Sign In Now
            </Button>
          </Box>
          {errorMessage ? (
            <Typography
              sx={{
                color: "red",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              Incorrect Username/Password!
            </Typography>
          ) : null}
          <Typography color="textSecondary" variant="body2">
            Don&apos;t have an account?{" "}
            <NextLink href="/register">
              <Link
                to="/register"
                variant="subtitle2"
                underline="hover"
                sx={{
                  cursor: "pointer",
                }}
              >
                Sign Up
              </Link>
            </NextLink>
          </Typography>
        </form>
      </Container>
    </Box>
  );
};

export default Login;
