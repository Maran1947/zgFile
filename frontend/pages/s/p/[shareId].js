"use client";
import Head from "next/head";

import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Share as ShareIcon } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import DownloadIcon from "@mui/icons-material/Download";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { BASE_URL, endpoints } from "../../../helpers/constants/endpoints";

export default function Home() {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [isPassword, setIsPassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const [shareData, setShareData] = useState({});
    const [files, setFiles] = useState([]);

    const router = useRouter();
    const { shareId } = router.query;

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const handleDownloadFiles = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL + endpoints.DOWNLOAD_FILES + '/' + shareId}`, {
                password
            })
            if(response.status === 200) {
                window.open(
                    response.data.data.download_link,
                    "_blank"
                )
            }
        } catch (err) {
            console.log(err)
            alert(err?.response?.data?.message || 'Something went wrong')
        } finally {
            setLoading(false);
        }
    };

    const getShare = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL + endpoints.GET_PUBLISH_SHARE + "/" + shareId}`,
            );
            if (response.status === 200) {
                console.log(response.data);
                setShareData(response.data.data.share);
                setIsPassword(response.data.data.isPassword)
            }
        } catch (err) {
            console.log(err);
            alert(err?.response?.data?.message || "Something went wrong");
        }
    };

    useEffect(() => {
        if (shareId) getShare();
    }, [shareId]);

    return (
        <>
            <div>
                <Head>
                    <title>Download Shareable Files</title>
                </Head>
                <main
                    style={{
                        padding: "0.5rem 5rem",
                        minHeight: "500px",
                        marginBottom: "1rem",
                    }}
                >

                    <form
                        style={{
                            maxWidth: "600px",
                            minHeight: "250px",
                            margin: "1rem auto",
                            borderRadius: "20px",
                            display: "flex",
                            flexDirection: "column",
                            background: "#ced8e0",
                            padding: '2rem'
                        }}
                        method='post'
                        onSubmit={handleDownloadFiles}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Stack
                                direction="column"
                                alignItems="center"
                                spacing={1}
                                sx={{ mb: 3 }}
                            >
                                <ShareIcon sx={{ fontSize: '2rem' }} />
                                <Typography
                                    sx={{
                                        fontSize: "1.5rem",
                                        fontWeight: "600",
                                    }}
                                >
                                    Access the shareable files
                                </Typography>
                            </Stack>



                            {
                                isPassword &&
                                <FormControl sx={{ width: "300px", mb: 2 }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">
                                        Password
                                    </InputLabel>
                                    <OutlinedInput
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        id="outlined-adornment-password"
                                        type={showPassword ? "text" : "password"}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                        required
                                    />
                                </FormControl>
                            }

                            <Stack
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                    width: '300px',
                                    margin: "0rem auto",
                                    '@media (max-width: 425px)': {
                                        width: '200px'
                                    }
                                }}
                            >
                                <Button
                                    type="submit"
                                    sx={{
                                        width: "100%",
                                    }}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<DownloadIcon />}
                                >
                                    Download files
                                </Button>
                            </Stack>
                        </div>
                    </form>
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

        @media screen and (max-width: 600px) {
          main {
            padding: 0.5rem 2rem!important;
          }
        }

        @media screen and (max-width: 425px) {
          main {
            padding: 0.5rem 1rem!important;
          }
        }
      `}</style>
            </div>
        </>
    );
}
