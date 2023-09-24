import { Box } from "@mui/material";

export default function Navbar() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "4.125rem",
        width: "100%",
        backgroundColor: "black",
        color: "white",
        boxShadow: "0rem .25rem .5rem 0rem rgba(0, 0, 0, 0.3)",
      }}
    >
      <h1>My Fabulous Store</h1>
    </Box>
  );
}
