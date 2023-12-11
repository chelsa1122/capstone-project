import GroomingHero from "@/components/GroomingHero";
import FeatureBox from "@/components/Featurebox";
import StepDescription from "@/components/StepDescription";
import CalendarIcon from "@/components/CalendarIcon";
import GroomingResultItem from "@/components/GroomingResultItem";
import AppointmentDialog from "@/components/AppointmentDialog";

import {
  Alert,
  AlertTitle,
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
  Select,
  MenuItem,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import { useRouter } from 'next/router'


function getServices(address){
    return fetch("http://localhost:3001/api/services/" + address, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
    }).then((response) => response.json());
}

function requestAppointment(serviceId, apptDate, apptTime){
  var appointmentStartdate = new Date(
    apptDate.getFullYear() +
     "-" + apptDate.getMonth() + "-" + apptDate.getDate() +
     " " + apptTime);
  console.log(apptDate, apptTime, appointmentStartdate);
  return fetch("http://localhost:3001/api/createAppointment", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "serviceId": serviceId,
        "appointmentStartDate": appointmentStartdate,}),
      credentials: 'include',
  }).then((response) => response.json());
}

function formatZip(zip){
  // remove space
  return zip.replace(/s+/g, '').toUpperCase();
}

function formatAddress(result){
  // format address of grooming item
  return `${result.street_address} ${result.service_location}, ${result.province}, ${formatZip(result.zip)}`;
}

/**
 * APPOINTMENT FORM
 * 
 * */
function AppointmentForm({serviceId, title, imageUri, addr, price, showNextDays, blockedSlots, onRequestComplete, onCancel, onSubmitFail}){
  const [formValues, setFormValues] = useState({
    appointmentDate: new Date(),
    time: "10:00 am"
  });
  const am_times = [10, 11].map((t)=>{return `${t}:00 am`});
  const pm_times = [12, 1, 2, 3, 4, 5].map((t)=>{return `${t}:00 pm`});
  const times = am_times.concat(pm_times);

  const handleInputChange = (e) => {
    const { name} = e.target;
    var value = null;
    if(e.target.type == "date"){
      value = e.target.valueAsDate;
    }
    if(value == null){value = e.target.value;}
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const trySubmitAppointment = (e) => {
    e.preventDefault();
    var apptDate = formValues.appointmentDate;  
    var apptTime = formValues.time;
    requestAppointment(serviceId, apptDate, apptTime)
      .then((result)=>{
        if(result.error){
          console.error("appointment api error:", result.error);
          throw new Error("Cannot complete request");
        }
        onRequestComplete(result);
      })
      .catch((err)=>{
        console.error("Error booking appointment:", err);
        if(onSubmitFail != null){
          onSubmitFail(err);
        }
      });
  };

  return (
    <Box>
      <Stack direction="row">
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
                  <Typography sx={{marginTop: "3%", fontWeight: 300}}>
                      {addr}
                  </Typography>
                  <Box sx={{marginTop: "3%"}}>
                    <Typography>
                        ${price} / session
                    </Typography>
                  </Box>
              </Box>
            </Stack>
        </Stack>
      </Stack>
      <form onSubmit={trySubmitAppointment}>
        <Grid
           container
           spacing={3}
           justifyContent="center"
           alignItems="center"
          >
            <Grid item xs={12} md={6} display="flex" flexDirection="column">
                <Typography>Date</Typography>
                <TextField
                  name="appointmentDate"
                  type="date"
                  placeholder="Enter appointment date"
                  value={formValues.appointmentDate.toISOString().split('T')[0]}
                  onChange={handleInputChange}
                />
            </Grid>
            <Grid item xs={12} md={6} display="flex" flexDirection="column">
                <Typography>Time</Typography>
                 <Select
                    labelId="select-time-label"
                    id="select-time"
                    value={formValues.time}
                    label="Time"
                    name="time"
                    onChange={handleInputChange}
                  >
                    {
                      times.map(function(t){
                        return <MenuItem key={t} value={t}>{t}</MenuItem>
                      })
                    }
                  </Select>
            </Grid>
        </Grid>
        <Stack direction="row" justifyContent="end" spacing={3} sx={{marginTop: "2%"}}>
          <Button className="btn btn-primary" variant="contained"
              sx={{borderRadius:"10px"}}
              onClick={trySubmitAppointment}
          >Book Appointment</Button>
          <Button className="btn btn-secondary" variant="contained"
              sx={{borderRadius:"10px"}}
              onClick={onCancel}
          >Cancel</Button>
        </Stack>
      </form>
    </Box>
  );
}

/**
 * GROOMING LIST
 * */
function GroomingList() {
    const [openAddressForm, setOpenAddressForm] = useState(false);
    const [statusText, setStatusText] = useState({
      show: false,
      message: "",
      className: "",
      severity: "",
    });
    const router = useRouter();
    const [formValues, setFormValues] = useState({
        Address:  router.query || "toronto",
        PetService: "grooming",
        Date: "",
        PetNumber: "",
      });
    const [results, setResults] = useState([]);
    const [clickedResult, setClickedResult] = useState({});
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    // Load and set api results
    const loadResults = function(addr){
      getServices(addr || formValues.Address)
        .then((data)=>{
          if(data == null || data.error){
            console.log("get services returned:", data);
            alert("Looks like there was a problem");
          }
          else{
            setResults(data);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("There was an error fetching results");
        });
    };
    // Initially load based on query location.
    useEffect(()=>{
      setFormValues((prevValues)=>({
        ...prevValues, Address: router.query.loc || "Toronto",
      }));
      loadResults(router.query.loc || "Toronto" );
    }, [router]);
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        // setSearchClicked(true);
        // fetch searchbar data
        const { Address, PetService, Date, PetNumber } = formValues;
        console.log(Address, PetService, Date, PetNumber);
        // setLoading(true);
        setResults([]);
        getServices(Address)
          .then((data)=>{
            if(data == null || data.error){
              console.log("get services returned:", data);
              alert("Looks like there was a problem");
            }
            setResults(data);
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("There was an error fetching results");
          });
      };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      };

    const closeAppointmentDialog = ()=>{
      setOpenAddressForm(false);
    };
    const handleAppointmentClick = (appointmentResult) => {
        console.log("Clicked ", appointmentResult);
        setOpenAddressForm(true);
        setClickedResult(appointmentResult);
    };

    const closeStatusText = ()=>{
      setStatusText({
        show: false,
        message: "",
        className: "",
        severity: "",
      });
    }
    const handleAppointmentRequestComplete = (requestResult) => {
      setOpenAddressForm(false);
      if(requestResult.status == "success"){
        setStatusText({
          show: true,
          message: requestResult.message,
          className: "success",
          severity: "success",
        });
      }
      else{
        setStatusText({
          show: true,
          message: requestResult.message,
          className: "danger",
          severity: "error",
        });
      }
      // setTimeout(()=>{
      //   setStatusText({
      //     show: false,
      //     message: "",
      //     className: "",
      //   }, 3600);
      // })
    }

    // let results = [
    //     {
            //   id: 1,
            //   service_location: "toronto",
            //   service: "Zen Dog Service",
            //   description: "Unleash the Beauty: Pamper Your Pooch with Pawsome Grooming!",
            //   imageName: "zen.jpg",
            //   street_address: "584 Church Street",
            //   province: "Ontario",
            //   zip: "M4Y2E5",
            //   price_per_session: "50.00",
            //   posted_timing: "10:00 am - 7:00 pm",
            //   rating: 4,
            // },
            // {
            //   id: 2,
            //   service_location: "toronto",
            //   service:"Tailspin Dog spa",
            //   description: "From Fluff to Fabulous: Tail-wagging Elegance Awaits at Our Grooming Salon!",
            //   imageName: "tailspin.jpg",
            //   street_address: "12 Irwin Avenue",
            //   province: "Ontario",
            //   zip: "M4Y1K9",
            //   price_per_session: "50.00",
            //   posted_timing: "10:00 am - 7:00 pm",
            //   rating: 4,
            // },
    // ];
    let resultItems = results.map((result, idx) => {
        return (
            <Box key={result.id}>
                <GroomingResultItem 
                    id={result.id}
                    title={result.service}
                    imageUri={"/Images/grooming-results/" + result.imageName} 
                    description={result.description}
                    address={formatAddress(result)}
                    price={result.price_per_session}
                    timing={result.posted_timing}
                    rating={result.rating}
                    onBookAppointmentClick={(e)=>{handleAppointmentClick(result)}}
                />                
            </Box>
        );
    });

    return (
    <Box>
        <Box>
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
        <Box
          sx={{width: "100%"}}
        >
          <Container>
          {(statusText.show)?(
              <Alert severity={statusText.severity} onClose={closeStatusText}>
                
                  <AlertTitle sx={{textTransform: "capitalize"}}>{statusText.severity}</AlertTitle>
                  {statusText.message}
              </Alert>
          ):(<Box></Box>)}
          </Container>
        </Box>
        <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
        >
            <Grid item xs={2} sm={3} md={4} display="flex" flexDirection="column">
            </Grid>
            <Grid item xs={8} sm={6} md={4} display="flex" flexDirection="column">
                <Stack direction="column"  divider={<Divider orientation="horizontal" flexItem />}
                 spacing={2}>
                    {resultItems}
                </Stack>
            </Grid>
            <Grid item xs={2} sm={3} md={4} display="flex" flexDirection="column">
            </Grid>
        </Grid>
          <AppointmentDialog open={openAddressForm} handleClose={closeAppointmentDialog} >
            {clickedResult.id !=null ? (
              <AppointmentForm 
                serviceId={clickedResult.id}
                title={clickedResult.service}
                imageUri={"/Images/grooming-results/" + clickedResult.imageName} 
                price={clickedResult.price_per_session}
                addr={formatAddress(clickedResult)}
                showNextDays={14}
                blockedSlots={[]}
                onRequestComplete={handleAppointmentRequestComplete}
                onCancel={closeAppointmentDialog}
              />
            ) : (<Typography>Something went wrong</Typography>)}
          </AppointmentDialog>  
        
        <Footer />
    </Box>
  );
}

export default GroomingList;