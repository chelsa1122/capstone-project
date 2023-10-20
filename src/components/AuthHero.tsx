import { Stack, Typography } from "@mui/material";
import Image from "next/image";

function AuthHero() {
  return (
    <div
      style={{
        flex: "0 0 40%", // width of the yellow background
      }}
    >
      <Image
        src="/images/SideLogo.svg"
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
          marginTop="20%"
          variant="h5"
          textAlign="left"
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
            left: "17%",
            width: "35%",
          }}
        />
      </Stack>
    </div>
  );
}

export default AuthHero;
