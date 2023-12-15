import urls from "@/constants/urls";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import Link from "next/link";

function Profile({ petDetails, user }) {
  return (
    <div style={{ padding: 30 }}>
      <Typography p={3} variant="h4">
        My Profile
      </Typography>
      <Card container sx={{ ml: 3, p: 3 }} spacing={2}>
        <Typography variant="h6">Email</Typography>
        <p>{user.email}</p>
      </Card>
      <Typography p={3} variant="h4">
        My Pets
      </Typography>
      <Button
        LinkComponent={Link}
        href="/pet-details"
        variant="contained"
        color="primary"
        sx={{ ml: 3, width: "10rem" }}
      >
        Add
      </Button>
      <Grid container p={3} gap={3}>
        {petDetails?.map((pet) => (
          <Grid component={Card} boxShadow={4} item>
            <CardContent>
              <Typography variant="h5">{pet.name}</Typography>
              <p>DOB: {new Date(pet.dob).toDateString()}</p>
              <p>Breed: {pet.breed}</p>
              <p>Location: {pet.city}, {pet.state}</p>
              <p>
                
              </p>
              {/* <p>Weight: {pet.weight} lb</p> */}
              <Button
                onClick={() => {
                  axios
                    .delete(`${urls.apiHost}/deletePetDetail?pet_id=${pet.id}`)
                    .then((res) => {
                      window.location.reload();
                    });
                }}
                variant="contained"
                color="error"
              >
                Remove
              </Button>
              <Button
                component={Link}
                href={`/pet-details/edit/${pet.id}`}
                variant="contained"
                color="success"
                sx={{ marginLeft: 2 }}
              >
                Edit
              </Button>
            </CardContent>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const user = await axios.get(`${urls.apiHost}/check-session`, {
    headers: {
      Cookie: req?.headers.cookie,
    },
  });

  if (!user.data.userData) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (user.data.userData) {
    const petDetailsRes = await axios.get(`${urls.apiHost}/getPetDetails`, {
      headers: {
        Cookie: req.headers.cookie,
      },
    });
    const petDetails = petDetailsRes.data;

    return {
      props: {
        petDetails,
        user: user.data.userData,
      },
    };
  }

  return {
    props: {},
  };
};

export default Profile;
