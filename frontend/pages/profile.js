import Head from "next/head";
import { useEffect, useState } from "react";
import { BASE_URL, endpoints } from "../helpers/constants/endpoints";
import axios from "axios";
import { imageExtensions } from "../helpers/imageExtensions";
import { Skeleton, Stack, Typography, Button } from "@mui/material";
import no_image from "../public/images/no_image.png";
import { Share as ShareIcon } from "@mui/icons-material";
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function Profile() {
  const [shares, setShares] = useState([]);
  const [loading, setLoading] = useState(false);

  const getShares = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}${endpoints.GET_ALL_SHARE_BY_USERID}`,
        {
          withCredentials: true
        }
      );
      if (response.status === 200) {
        console.log(response.data.data)
        setLoading(false);
        setShares(response.data.data);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        handleLogout();
      } else {
        alert(err?.response?.data?.message || "Something went wrong1");
      }
    }
  };

  const handleViewShare = (share) => {
    window.open(
      `/share/view/${share._id}`,
      "_blank"
    );
  };

  const handleImageError = (e) => {
    if (e.target.src) {
      e.target.src = no_image.src;
    }
  };

  useEffect(() => {
    getShares();
  }, []);

  return (
    <>
      {
        <div>
          <Head>
            <title>zgFile Home</title>
          </Head>

          <main
            style={{
              padding: "0.5rem 5rem",
              minheight: "600px",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                padding: "2rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              {loading ? (
                [1, 2, 3, 4].map((index) => {
                  return (
                    <Skeleton
                      sx={{ borderRadius: "5px" }}
                      key={index}
                      variant="rectangular"
                      width={300}
                      height={200}
                    />
                  );
                })
              ) : shares && shares.length > 0 ? (
                shares.map((share, idx) => (
                  <div
                  className="user_image_card"
                  key={idx}
                    style={{
                      width: "300px",
                      height: "200px",
                      padding: "1.2rem",
                      border: "1px dashed #0070f3",
                      borderRadius: "10px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "0.5s all",
                      background: '#ced8e0'
                    }}
                  >
                    <Stack 
                     sx={{
                      maxWidth: "300px",
                      minHeight: "250px",
                      margin: "1rem auto",
                      borderRadius: "20px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: '1rem'
                    }} >
                      <Stack
                        direction="column"
                        alignItems="center"
                        spacing={1}
                        sx={{ mb: 2 }}
                      >
                        <ShareIcon sx={{ fontSize: '1.8rem' }} />
                        <Typography
                          sx={{
                            fontSize: "1.5rem",
                            fontWeight: "600",
                            lineHeight: '1.2',
                            textAlign: 'center'
                          }}
                        >
                          {share.name}
                        </Typography>
                      </Stack>
                      <Button
                        onClick={() => handleViewShare(share)}
                        sx={{
                          width: "150px",
                        }}
                        variant="contained"
                        startIcon={<VisibilityIcon />}
                      >
                        View share
                      </Button>
                    </Stack>
                  </div>
                ))
              ) : (
                <p
                  style={{
                    height: "200px",
                    fontSize: "2rem",
                    width: "100%",
                    textAlign: "center",
                    color: "#92a2b9",
                  }}
                >
                  You haven't uploaded any image(s).
                </p>
              )}
            </div>
          </main>

          <style jsx global>{`
        html,
        body {
          padding: 0 
          margin: 0 
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif 
        }
        * {
          box-sizing: border-box 
        }
        .user_image_card:hover {
            // border: 2px dashed #0070f3!important;
            box-shadow: 0px 3px 20px 3px #0000002e
        }

        @media screen and (max-width: 600px) {
          main {
            padding: 0.5rem 2rem!important;
          }
          .user_image_card {
            width: 100%!important;
          }
        }

        @media screen and (max-width: 425px) {
          main {
            padding: 0.5rem 1rem!important;
          }
      `}</style>
        </div>
      }
    </>
  );
}
