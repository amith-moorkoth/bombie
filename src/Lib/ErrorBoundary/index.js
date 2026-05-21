import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Hook for an external logging service (Sentry, Datadog, etc.).
    // Kept verbose so this is the single place to wire one up.
    if (typeof this.props.onError === "function") {
      this.props.onError(error, info);
    }
  }

  handleReset = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <Box
        role="alert"
        sx={{
          p: 4,
          maxWidth: 720,
          mx: "auto",
          mt: 6,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          background: "white",
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h5" component="h1">
            Something went wrong.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The application hit an unexpected error. You can try again, or
            reload the page if the problem persists.
          </Typography>
          {process.env.NODE_ENV !== "production" && (
            <Box
              component="pre"
              sx={{
                p: 2,
                background: "#f5f5f5",
                overflow: "auto",
                fontSize: 12,
              }}
            >
              {String(error?.stack || error?.message || error)}
            </Box>
          )}
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={this.handleReset}>
              Try again
            </Button>
            <Button variant="outlined" onClick={() => window.location.reload()}>
              Reload
            </Button>
          </Stack>
        </Stack>
      </Box>
    );
  }
}

export default ErrorBoundary;
