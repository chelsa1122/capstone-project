import { userAtom } from "@/atoms";
import urls from "@/constants/urls";
import AdbIcon from "@mui/icons-material/Adb";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useAtomValue } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const user = useAtomValue(userAtom);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await fetch(`${urls.apiHost}/logout`, {
      credentials: "include",
    });
    window.location.href = "/?logout=true";
    handleClose();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              color: "#1A237E",
              textDecoration: "none",
            }}
          >
            Hello <span style={{ color: "#E64A19" }}>DoG</span>Go
            <Image src="/Images/Logo.svg" alt="logo" width={30} height={30} />
          </Typography>

          <AdbIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1, color: "white" }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1 }}></Box>
          {user ? (
            <>
              <Typography color="primary">
                Hello,&nbsp;
                {user?.email}
              </Typography>
              <IconButton
                onClick={handleClick}
                color="inherit"
                aria-controls="profile-menu"
                aria-haspopup="true"
                sx={{ color: "inherit" }}
              >
                <Avatar sx={{ bgcolor: "#1A237E" }}>U</Avatar>
              </IconButton>

              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {settings.map((setting, index) => (
                  <MenuItem
                    key={index}
                    onClick={
                      setting === "Logout"
                        ? handleLogout
                        : () => {
                            router.push(`/${setting.toLowerCase()}`);
                            handleClose();
                          }
                    }
                  >
                    {setting}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              <Button LinkComponent={Link} sx={{ mr: 2 }} href="/login">
                Login
              </Button>
              <Button
                variant="contained"
                color="primary"
                LinkComponent={Link}
                href="/registration"
              >
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
