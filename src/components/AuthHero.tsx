import { Stack, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";

function AuthHero() {
  const matches = useMediaQuery("(min-width:600px)");
  return (
    <div
      style={{
        flex: matches ? "0 0 40%" : "0 0 100%", // width of the yellow background
      }}
    >
      <Image
        src="/Images/Logo.svg"
        alt="logo"
        width={50}
        height={40}
        style={{
          padding: "10px",
        }}
      />
      <Stack paddingLeft={10} paddingRight={10} direction="column">
        <Typography
          color="#FFFFFF"
          marginTop="10%"
          variant="h5"
          textAlign="left"
          sx={{ zIndex: 111 }}
        >
          {" "}
          🐾 Are you a dog lover? Join our pack and embark on a journey filled
          with furry companions, wagging tails, and endless paw-sibilities!
        </Typography>
        <img
          src="/images/dog.svg"
          alt="dog"
          style={{
            position: "absolute",
            bottom: "0",
            left: matches ? "19%" : "0",
            width: matches ? "27%" : "100%", // Make the dog image smaller in mobile view
          }}
        />
      </Stack>
    </div>
  );
}

export default AuthHero;
