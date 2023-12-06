import GroomingHero from "@/components/GroomingHero";
import Navbar from "@/components/Navbar";
import FeatureBox from "@/components/Featurebox";
import StepDescription from "@/components/StepDescription";
import CalendarIcon from "@/components/CalendarIcon";
// import GroomingResultItem from "@components/GroomingResultItem";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Rating,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  SvgIcon,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import Link from "next/link";
import React, { useState } from "react";
import Footer from "./Footer";

function GroomingResultItem({id,title, imageUri, description, address, price, timing, rating, onBookAppointmentClick}) {
  return (
    <Box sx={{
        borderRadius: "20px",
        border: "2px solid #3949AB",
        background: "#FFF",
        color: "#616161",
    }}>
        <Stack direction="row" sx={{"marginTop": "1%", padding: "1%",}}>
            <Box sx={{"minHeight": "100%"
                   }}>
                <img src={imageUri} width="200px"  height="200px" 
                 style={{
                    "borderRadius": "20px",
                }} />
            </Box>
            <Stack direction="column" sx={{marginLeft: "2%"}}>
                {/* Title */}
                <Box>
                    <Typography variant="h6" sx={{fontWeight: 500}}>
                        {title}
                    </Typography>
                </Box>
                <Box sx={{marginTop: "3%"}}>
                    <Typography sx={{fontWeight: 400}}>
                        {description}
                    </Typography>
                </Box>
                <Box sx={{marginTop: "3%"}}>
                    <Typography sx={{fontWeight: 300}}>
                        {address}
                    </Typography>
                </Box>
                <Stack direction="row" sx={{marginTop: "5%"}}>
                    <Box>
                        <Typography>
                            {price}
                        </Typography>
                    </Box>
                    <Box sx={{ height: "25px", marginLeft: "15px", paddingRight: "15px", borderLeft: "1px solid #BDBDBD"}}>
                    </Box>
                    <Typography sx={{color: "#2E7D32"}}>open</Typography>
                    <Typography sx={{marginLeft: "5%"}}>{timing}</Typography>
                </Stack>
                <Box>
                    <Rating name="read-only" value={rating || 1} precision={0.5} size="small" readOnly />
                </Box>
                <Stack direction="row-reverse" >
                    <Box>
                        <Button class="btn btn-primary" variant="contained"
                            endIcon={<CalendarIcon/>}
                            sx={{borderRadius:"10px"}}
                        >Book Appointment</Button>
                    </Box>
                </Stack>
            </Stack>
        </Stack>
    </Box>
  );
}

function GroomingList({initialResults}) {
    const [formValues, setFormValues] = useState({
        Address: "",
        PetService: "grooming",
        Date: "",
        PetNumber: "",
      });
      const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

      const handleFormSubmit = (e) => {
        e.preventDefault();
        // setSearchClicked(true);
        // fetch searchbar data
        const { Address, PetService, Date, PetNumber } = formValues;
        console.log(Address, PetService, Date, PetNumber);
        // setLoading(true);
        // setResults([]);
        fetch("http://localhost:3001/api/services/" + Address, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("SEARCH RESULTS");
            // setResults(data);
            // Handle the data from the response
          })
          .catch((error) => {
            console.error("Error:", error);
          })
          .finally(() => {
            // setLoading(false);
          });
      };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      };

    const handleAppointmentClick = (appointmentResult) => {
        console.log("Clicked ", appointmentResult);
    };

    let results = [
        {
            title: "Zen Dog Service",
            description: "Unleash the Beauty: Pamper Your Pooch with Pawsome Grooming!",
            imageUri: "Images/grooming-results/zen.jpg",
            address: "584 Church Street Toronto, ON M4Y 2E5",
            price: "$50:00 / session",
            timing: "10:00 am - 7:00 pm",
            rating: 4,
        },
        {
            title: "Tailspin Dog spa",
            description: "From Fluff to Fabulous: Tail-wagging Elegance Awaits at Our Grooming Salon!",
            imageUri: "Images/grooming-results/tailspin.jpg",
            address: "12 Irwin Avenue Toronto, ON M4Y 1K9",
            price: "$50:00 / session",
            timing: "10:00 am - 7:00 pm",
            rating: 4,
        },
    ];

    

    let resultItems = results.map((result, idx) => {
        return (
            <Box id={idx}>
                <GroomingResultItem 
                    id={idx}
                    title={result.title}
                    imageUri={result.imageUri} 
                    description={result.description}
                    address={result.address}
                    price={result.price}
                    timing={result.timing}
                    rating={result.rating}
                    onBookAppointmentClick={handleAppointmentClick}
                />
                
            </Box>
        );
    });
    return (
    <Box>
        <Box>
            <Navbar />
            <Box
                sx={{
                    background: '#FAFAFA',
                    marginTop: "1%",
                    paddingBottom: "2%",
                }}
                >
                <form onSubmit={handleFormSubmit}>
                    <Grid
                     container
                     spacing={3}
                     justifyContent="center"
                     alignItems="center"
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
                            <Button variant="contained" type="submit" color="primary"
                              sx={{ borderRadius: "30px", padding: "10px 40px" }}
                            >
                                Search
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box> 
        <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
        >
            <Grid item xs={2} md={4} display="flex" flexDirection="column">
            </Grid>
            <Grid item xs={8} md={4} display="flex" flexDirection="column">
                <Stack direction="column"  divider={<Divider orientation="horizontal" flexItem />}
                 spacing={2}>
                    {resultItems}
                </Stack>
            </Grid>
            <Grid item xs={2} md={4} display="flex" flexDirection="column">
            </Grid>
        </Grid>
        
        <Footer />
    </Box>
  );
}

export default GroomingList;