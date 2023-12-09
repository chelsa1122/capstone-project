import { Grid, Typography, Link } from "@mui/material";
import Image from "next/image";
import { Facebook, Instagram, Pinterest } from "@mui/icons-material";

const LinkItem = (text, href) => {
  return {text: text, href: href || "#"}
};

const FooterLinkSection = ({ title, links }: { title: string; links: LinkItem[] }) => (
  <Grid item xs={12} md={2} display="flex" flexDirection="column" gap={2} mt={{ xs: 5, md: 0 }}>
    <Typography variant="h5" color="white" fontWeight="bold">
      {title}
    </Typography>
    {links.map((link) => (
      <a key={link.text} href={link.href}>
        <Typography  variant="h6" color="white">
          {link.text}
        </Typography>
      </a>
    ))}
  </Grid>
);

function Footer() {
  const socialIcons = [
    <Facebook key="facebook" sx={{ color: "white" }} />,
    <Instagram key="instagram" sx={{ color: "white" }} />,
    <Pinterest key="pinterest" sx={{ color: "white" }} />,
  ];

  return (
    <Grid container style={{ backgroundColor: "#3F51B5" }} mt={5} p={5} textAlign={{ xs: "center", md: "inherit" }}>
      <Grid item xs={12} md={2}>
        <Typography variant="h5" color="#FFB300">
          Hello<span style={{ color: "#E64A19" }}>DoG</span>Go
          <Image src="/Images/Logo.svg" alt="logo" width={30} height={30} />
        </Typography>
      </Grid>
      <FooterLinkSection title="Corporate" links={[
        LinkItem("Careers"), 
        LinkItem("About Us"), 
        LinkItem("Contact Us"), 
        LinkItem("FAQs"), 
        LinkItem("Vendors"),
        ]} />
      <FooterLinkSection title="Information" links={[
        LinkItem("Online Store"), LinkItem("Privacy Policy")
        ]} />
      <FooterLinkSection title="Services" links={[
        LinkItem("Grooming", "/grooming"),
        LinkItem("Informational Videos"), 
        LinkItem("Chat Application")
        ]} />
      <FooterLinkSection title="Newsletter" links={[
          LinkItem("Get to know about the Exciting events."),
        ]} />
      <Grid item xs={12} display="flex" flexDirection="row" gap={2} justifyContent="center" mt={3}>
        {socialIcons}
      </Grid>
    </Grid>
  );
}

export default Footer;

