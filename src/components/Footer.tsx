import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import { Facebook, Instagram, Pinterest } from "@mui/icons-material";

function Footer() {
  return (
    <Grid
      container
      style={{ backgroundColor: "#3F51B5" }}
      mt={5}
      p={5}
      textAlign={{ xs: "center", md: "inherit" }}
    >
      <Grid item xs={12} md={2}>
        <Typography variant="h5" color="#FFB300">
          Hello<span style={{ color: "#E64A19" }}>DoG</span>Go
          <Image src="/Images/Logo.svg" alt="logo" width={30} height={30} />
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={2}
        display="flex"
        flexDirection="column"
        gap={2}
        mt={{ xs: 5, md: 0 }}
      >
        <Typography variant="h5" color="white" fontWeight="bold">
          Corporate
        </Typography>
        <Typography variant="h6" component="a" href='#' color="white">
          Careers
        </Typography>
        <Typography variant="h6" component="a" href='#' color="white">
          About Us
        </Typography>
        <Typography variant="h6" component="a" href='#' color="white">
          Contact Us
        </Typography>
        <Typography variant="h6" component="a" href='#' color="white">
          FAQs
        </Typography>
        <Typography variant="h6" component="a" href='#' color="white">
          Vendors
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={2}
        display="flex"
        flexDirection="column"
        gap={2}
        mt={{ xs: 5, md: 0 }}
      >
        <Typography variant="h5" color="white" fontWeight="bold">
          Information
        </Typography>
        <Typography variant="h6" component="a" href='#' color="white">
          Online Store
        </Typography>
        <Typography variant="h6" component="a" href='#' color="white">
          Privacy Policy
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={2}
        display="flex"
        flexDirection="column"
        gap={2}
        mt={{ xs: 5, md: 0 }}
      >
        <Typography variant="h5" color="white" fontWeight="bold">
          Services
        </Typography>
        <Typography variant="h6" component="a" href='#' color="white">
          Grooming
        </Typography>
        <Typography variant="h6" component="a" href='#' color="white">
          Informational Videos
        </Typography>
        <Typography variant="h6" component="a" href='#' color="white">
          Chat Application
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={2}
        display="flex"
        flexDirection="column"
        gap={2}
        mt={{ xs: 5, md: 0 }}
      >
        <Typography variant="h5" color="white" fontWeight="bold">
          Newsletter
        </Typography>
        <Typography variant="h6" component="a" href='#' color="white">
          Get to know about the Exciting events.
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        display="flex"
        flexDirection="row"
        gap={2}
        justifyContent="center"
        mt={3}
      >
        <Facebook sx={{ color: "white" }} />
        <Instagram sx={{ color: "white" }} />
        <Pinterest sx={{ color: "white" }} />
      </Grid>
    </Grid>
  );
}
export default Footer;
