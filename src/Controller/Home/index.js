import * as React from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import ViewQuiltOutlinedIcon from "@mui/icons-material/ViewQuiltOutlined";
import DataObjectOutlinedIcon from "@mui/icons-material/DataObjectOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link as RouterLink } from "react-router-dom";

import logo from "src/assets/logo.svg";
import demoGif from "src/assets/bombie.gif";

const features = [
  {
    icon: ViewQuiltOutlinedIcon,
    title: "Drag-and-drop canvas",
    body: "Compose Material-UI components visually. Drop, nest, rearrange — no boilerplate.",
  },
  {
    icon: DataObjectOutlinedIcon,
    title: "JSON-as-source",
    body: "The design is plain data — easy to version, persist, and re-render anywhere with one library.",
  },
  {
    icon: CodeOutlinedIcon,
    title: "Code generation",
    body: "Export the tree as a working React component the moment your layout is ready.",
  },
  {
    icon: VisibilityOutlinedIcon,
    title: "Live preview",
    body: "Every change is reflected immediately. Tweak props in a side panel and see the result.",
  },
];

export default function Home() {
  const theme = useTheme();

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${alpha(
          theme.palette.primary.main,
          0.06
        )} 0%, ${theme.palette.background.default} 60%)`,
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        {/* Experimental notice — keeps expectations honest. */}
        <Alert
          severity="warning"
          icon={<ScienceOutlinedIcon />}
          variant="outlined"
          sx={{
            mb: { xs: 4, md: 6 },
            borderRadius: 2,
            alignItems: "flex-start",
            bgcolor: alpha(theme.palette.warning.main, 0.06),
          }}
        >
          <AlertTitle sx={{ fontWeight: 700, mb: 0.5 }}>
            Experimental preview — not production ready
          </AlertTitle>
          Bombie is a personal demo project deployed to GitHub Pages. Expect
          rough edges, breaking changes, and partial features (e.g. JSON
          upload/download buttons are placeholders). Use the live demo to
          explore — not to ship products with.
        </Alert>

        {/* Hero */}
        <Grid
          container
          spacing={{ xs: 4, md: 8 }}
          alignItems="center"
          sx={{ mb: { xs: 8, md: 12 } }}
        >
          <Grid item xs={12} md={7}>
            <Stack spacing={3}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ flexWrap: "wrap", gap: 1 }}
              >
                <Chip
                  label="React drag-and-drop UI builder"
                  color="primary"
                  variant="outlined"
                  sx={{ fontWeight: 500 }}
                />
                <Chip
                  icon={<ScienceOutlinedIcon />}
                  label="Experimental"
                  color="warning"
                  variant="filled"
                  sx={{ fontWeight: 600 }}
                />
              </Stack>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                  fontSize: { xs: "2.5rem", md: "3.75rem" },
                }}
              >
                Build Material-UI screens
                <br />
                by{" "}
                <Box component="span" sx={{ color: "primary.main" }}>
                  dragging and dropping.
                </Box>
              </Typography>
              <Typography
                variant="h6"
                component="p"
                color="text.secondary"
                sx={{ fontWeight: 400, maxWidth: 560 }}
              >
                Bombie turns Material-UI components into a visual canvas.
                Compose a layout, edit props live, then ship the result as JSON
                or React code.
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ pt: 1 }}
              >
                <Button
                  component={RouterLink}
                  to="/generate-component"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ px: 3, py: 1.25, fontWeight: 600 }}
                >
                  Open the builder
                </Button>
                <Button
                  component="a"
                  href="https://github.com/amith-moorkoth/bombie"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  size="large"
                  startIcon={<GitHubIcon />}
                  sx={{ px: 3, py: 1.25, fontWeight: 600 }}
                >
                  GitHub
                </Button>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: { xs: 4, md: 6 },
                borderRadius: 4,
                background: `radial-gradient(circle at center, ${alpha(
                  theme.palette.primary.main,
                  0.18
                )} 0%, ${alpha(theme.palette.primary.main, 0)} 70%)`,
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="Bombie logo"
                sx={{
                  width: { xs: 160, md: 220 },
                  height: "auto",
                  filter: "drop-shadow(0 12px 32px rgba(25,118,210,0.25))",
                }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Features */}
        <Box sx={{ mb: { xs: 8, md: 12 } }}>
          <Stack spacing={1} sx={{ mb: 4, textAlign: "center" }}>
            <Typography
              variant="overline"
              color="primary"
              sx={{ fontWeight: 700, letterSpacing: "0.12em" }}
            >
              Why Bombie
            </Typography>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 700 }}>
              Designed for fast UI iteration
            </Typography>
          </Stack>
          <Grid container spacing={3}>
            {features.map(({ icon: Icon, title, body }) => (
              <Grid item xs={12} sm={6} md={3} key={title}>
                <Card
                  variant="outlined"
                  sx={{
                    height: "100%",
                    transition: "transform 180ms ease, box-shadow 180ms ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 3,
                      borderColor: "primary.light",
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "inline-flex",
                        p: 1.25,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: "primary.main",
                        mb: 2,
                      }}
                    >
                      <Icon fontSize="medium" />
                    </Box>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ fontWeight: 700, mb: 1 }}
                    >
                      {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {body}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Demo */}
        <Box
          sx={{
            mb: { xs: 6, md: 10 },
            p: { xs: 2, md: 4 },
            borderRadius: 4,
            background: alpha(theme.palette.primary.main, 0.04),
            border: "1px solid",
            borderColor: alpha(theme.palette.primary.main, 0.15),
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={4}
            alignItems="center"
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="overline"
                color="primary"
                sx={{ fontWeight: 700, letterSpacing: "0.12em" }}
              >
                See it in action
              </Typography>
              <Typography
                variant="h4"
                component="h2"
                sx={{ fontWeight: 700, mt: 1, mb: 2 }}
              >
                From empty canvas to working layout.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Drop components from the palette, configure their props on the
                right, and watch the JSON tree update in real time. When
                you&rsquo;re done, copy the output and render it anywhere.
              </Typography>
              <Button
                component={RouterLink}
                to="/generate-component"
                variant="contained"
                endIcon={<ArrowForwardIcon />}
              >
                Try the builder
              </Button>
            </Box>
            <Box
              sx={{
                flex: 1,
                width: "100%",
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: 4,
                background: "white",
              }}
            >
              <Box
                component="img"
                src={demoGif}
                alt="Animated demo of the Bombie drag-and-drop builder"
                sx={{ display: "block", width: "100%", height: "auto" }}
              />
            </Box>
          </Stack>
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 2,
            pt: 4,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box component="img" src={logo} alt="" width={28} height={28} />
            <Typography variant="body2" color="text.secondary">
              Bombie · React drag-and-drop UI builder toolkit
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()}{" "}
            <Link
              href="https://github.com/amith-moorkoth/bombie"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              color="inherit"
            >
              Amith Moorkoth
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
