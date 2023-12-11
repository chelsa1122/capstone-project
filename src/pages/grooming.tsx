import FeatureBox from "@/components/Featurebox";
import StepDescription from "@/components/StepDescription";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  IconButton,
  Rating,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import Link from "next/link";
import React, { useState } from "react";
import Footer from "./Footer";


function Grooming() {
    const [formValues, setFormValues] = useState({
        Address: "",
        PetService: "",
        Date: "",
        PetNumber: "",
      });
    const [searchClicked, setSearchClicked] = useState(false);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

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

  // Set banner height and adjust starting of search bar depending on it.
  let bannerHeight = 75; // vw
  let contentMarginTop = bannerHeight - 14; // vw
  contentMarginTop = contentMarginTop <= 50 ? 50 : contentMarginTop; // clip at 50%
  return (
    <Box>
        <Box sx={{
            width: '100vw', 
            position: "absolute",
            height: bannerHeight + "vw",
            left: 0,
            top: 0,
            // height: "70%",
            backgroundImage: "url(\"/Images/grooming-banner.jpg\")",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            zIndex: "-1",
            }}>
            </Box>
        <Box>
            <Container
                sx={{
                    borderRadius:"67.5px",
                    background: "#FAFAFA",
                    marginTop: contentMarginTop + "vw",
                    // paddingTop: "2%",
                    paddingBottom: "2%",
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
                          required
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
                        <Typography>Dates</Typography>
                        <TextField
                          name="Date"
                          placeholder="Add Date"
                          value={formValues.Date}
                          onChange={handleInputChange}
                          type="date"
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
                      <Grid item xs={12} alignItems="center" md={1} display="flex" flexDirection="column">
                        {!isSmallScreen ? (
                          <IconButton type="submit" size="large" sx={{ backgroundColor: "#3F51B5" }}>
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
            </Container>
            {/* GRoomer features */}
            <Container sx={{marginTop: "3%"}}>
                <Container>
                    <Typography align="center" variant="h4">
                        Looking for an A-grade Dog Groomer?
                    </Typography> 
                    {/* Feature Items */}
                    <Stack direction="column" spacing={3} sx={{marginTop: "2%"}}>
                        <Stack direction="row" spacing={1}>
                            <FeatureBox
                                title="POOCH PERFECT"
                                content="HelloDoggo: Where Pampering Paws Meet Passionate Groomers! Trust your beloved pet with the best in the business."
                            />
                            <FeatureBox
                                title="Varying serice levels"
                                content="HelloDoggo offers tailored grooming experiences with varying service levels to meet your pet's unique needs."
                            />
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <FeatureBox
                                title="Easy to book"
                                content="HelloDoggo makes grooming hassle-free! Our easy-to-use platform allows you to book grooming services with just a few clicks."
                            />
                            <FeatureBox
                                title="Peace of mind"
                                content="At HelloDoggo! Our trusted and professional groomers provide top-notch care, ensuring your pet is in safe hands."
                            />
                        </Stack>
                    </Stack>
                </Container>
                {/*Divider*/}
                <div style={{
                    "width": "1286px",
                    "marginTop": "3%",
                    "marginBottom": "3%",
                }}
                    >
                    <svg width="1286" height="2" viewBox="0 0 1286 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 1.00012L1286 1.00001" stroke="#BDBDBD" stroke-width="2"/>
                    </svg> 
                </div>
            </Container>
            
            {/* How grooming works*/}
            <Container sx={{
                    "marginBottom": "2%",
            }}>
                <Typography align="center" sx={{
                    "color": "#FFB300",
                    "fontSize": "48px",
                    "fontStyle": "normal",
                    "fontWeight": 700,
                    "lineHeight": "normal",
                    "letterSpacing": "1.44px",
                }}>
                    How Does Dog Grooming Works?
                </Typography> 
                <Stack direction="row" useFlexGap={true} spacing={20} justifyContent="center">
                    <StepDescription
                        number={1}
                        title="Find a Groomer"
                        content="Confirm and pay to secure your booking ahead of time"
                    />
                    <StepDescription
                        number={2}
                        title="Tame their Tresses"
                        content="Choose from a tidy-up trim to a full top-to-tail treatment"
                    />
                    <StepDescription
                        number={3}
                        title="Repeat when ready"
                        content="Book their next groom to keep them looking furbulous"
                    />
                </Stack>
            </Container>
        </Box>
        {/*<Box
            sx={{
                "borderRadius": "50px",
                "background": "#3949AB",
            }}
        >
            <Stack direction="row">
                <Box>
                    <img src="Images/Grooming_Dogs.svg"  height="200px" />
                </Box>
                <Stack direction="column">
                    <Typography variant="h4" sx={{color: "white"}}>
                        We have a wide variety of Dog Groomers ready to give your pet the 5-star treatment.
                    </Typography>
                </Stack>
            </Stack>
        </Box>*/}
        <Stack justifyContent="center" alignItems="center" mt={5} color="#616161">
            <Typography variant="h4">FAQs</Typography>
        </Stack>
        <Footer />
    </Box>
  );
}

export default Grooming;
