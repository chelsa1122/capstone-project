import urls from "@/constants/urls";
import { Search } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  Rating,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});
function Homepage() {
  const [formValues, setFormValues] = useState({
    Address: "",
    PetService: "",
    Date: null,
    PetNumber: "",
  });
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);

  const handleFormSubmit = (e) => {
        e.preventDefault();
        const { Address, PetService, Date, PetNumber } = formValues;
        if(Address.trim().length == 0){
            return;
        }
        else{
            window.location.href = `/GroomingList?loc=${encodeURIComponent(Address)}`;
        }
    };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <>
      <Stack justifyContent="center" alignItems="center">
        <Box
          sx={{
            minHeight: "60vh",
            width: "100%",
            background: `url('/Images/HomePage_Img.svg') no-repeat center center`,
            backgroundSize: "cover",
          }}
        ></Box>

        <Box
          sx={{
            backgroundColor: "#FAFAFA",
            borderRadius: 2,
            mt: -5,
            p: 2,
            maxWidth: "lg",
            mx: "auto",
            boxShadow: 3,
          }}
        >
          <form onSubmit={handleFormSubmit}>
            <Grid
              container
              spacing={3}
              justifyContent="center"
              alignItems="center"
              // component="form"
            >
              <Grid item xs={12} md={3} display="flex" flexDirection="column">
                <Typography>Location</Typography>
                <TextField
                  name="Address"
                  placeholder="Enter address or suburb"
                  value={formValues.Address}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={2.5} display="flex" flexDirection="column">
                <Typography>Service</Typography>
                <TextField
                  name="PetService"
                  placeholder="Choose a pet service"
                  value={formValues.PetService}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={2.5} display="flex" flexDirection="column">
                <Typography>Date</Typography>
                <TextField
                  name="Date"
                  type="date"
                  value={formValues.Date}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={2.5} display="flex" flexDirection="column">
                <Typography>Pets</Typography>
                <TextField
                  name="PetNumber"
                  placeholder="How many pets?"
                  value={formValues.PetNumber}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid
                item
                xs={12}
                alignItems="center"
                md={1}
                display="flex"
                flexDirection="column"
              >
                {!isSmallScreen ? (
                  <IconButton
                    type="submit"
                    size="large"
                    sx={{ backgroundColor: "#3F51B5" }}
                  >
                    <Search sx={{ color: "white" }} />
                  </IconButton>
                ) : (
                  <Button variant="contained" type="submit" color="primary">
                    Search
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        </Box>
      </Stack>

      <Stack alignItems="center" mt={5}>
        <img src="/Images/paw.svg" width={80} />
        <Typography fontWeight="bold" variant="h5" pt={1}>
          What your Pet needs, when they need it?
        </Typography>
      </Stack>

      <Box maxWidth="lg" mx="auto">
        <Typography
          textAlign="center"
          mt={5}
          variant="h5"
          fontWeight="bold"
          color="#757575"
        >
          Pet Services
        </Typography>
        <hr />
        <Grid container mt={3} columnSpacing={4}>
          <Grid item md={4} display="flex" flexDirection="row" gap={2}>
            <img src="/Images/chat.png" width={100} />

            <Stack spacing={1}>
              <Typography fontWeight="bold" variant="body1">
                Chat Application
              </Typography>
              <Typography variant="body2">
                Tail-wagging conversations, just a paw tap away – the ultimate
                chat app designed for dog lovers.
              </Typography>
            </Stack>
          </Grid>

          <Grid item md={4} display="flex" flexDirection="row" gap={2}>
            <img src="/Images/HomePage_Dog.svg" width={100} />
            <Stack spacing={1}>
              <Typography fontWeight="bold" variant="body1">
                Grooming
              </Typography>
              <Typography variant="body2">
                Experience expert grooming for your beloved pup for the perfect
                pampering experience.
              </Typography>
            </Stack>
          </Grid>

          <Grid item md={4} display="flex" flexDirection="row" gap={2}>
            <img src="/Images/Video.svg" width={100} />
            <Stack spacing={1}>
              <Typography fontWeight="bold" variant="body1">
                Informational Videos
              </Typography>
              <Typography variant="body2">
                Unlock a treasure trove of canine wisdom with our enlightening
                informational videos.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <Box maxWidth="md" mx="auto" mt={5}>
        <img src="/Images/HomePage_HowItWorks.svg" width="100%" />
      </Box>

      <Stack
        style={{ backgroundColor: "#FCEFEB" }}
        mt={5}
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h5" textAlign="center" mt={5}>
          Celebrating HelloDoGGo Experiences: Customer Testimonials
        </Typography>

        <Card
          sx={{
            display: "flex",
            maxWidth: { xs: "90%", md: "80%" },
            flexDirection: { xs: "column", md: "row" }, // Change flex direction based on screen size

            mt: 5,
            mb: 5,
            backgroundColor: "#FDD1C3",
            borderRadius: 5,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Chip label="Alex Martinez" />

              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                "I've been using this chat application for dog owners for a few
                weeks now, and I'm amazed at how it has transformed my
                experience as a dog parent. The community here is not just
                friendly; they're like a family. I've found invaluable advice on
                training, health, and even the best dog-friendly spots in town.
                Being able to connect with fellow dog lovers has made me more
                confident in understanding my dog's needs. Kudos to the creators
                for bringing us together in this fantastic digital space!"
              </Typography>
            </CardContent>
            <Typography component="legend">Rating</Typography>
            <StyledRating
              defaultValue={5}
              name="read-only"
              value={5}
              readOnly
              icon={<FavoriteIcon fontSize="inherit" />}
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            />
          </Box>
          <CardMedia
            component="img"
            sx={{ width: { md: "50%", xs: "100%" } }}
            image="/Images/CardImage.svg"
            alt="Live from space album cover"
          />
        </Card>
      </Stack>

      <Stack justifyContent="center" alignItems="center" mt={5} color="#616161">
        <Typography variant="h4">FAQs</Typography>
      </Stack>
    </>
  );
}

export default Homepage;
