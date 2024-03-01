"use client";
import Head from "next/head";

import React, { useState, useEffect } from "react";
import { BASE_URL, endpoints } from "../../../helpers/constants/endpoints";
import axios from "axios";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import Loading from "../../../components/loading/Loading";
import {
    Box,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import { Share as ShareIcon } from "@mui/icons-material";
import EventIcon from "@mui/icons-material/Event";
import { useRouter } from "next/router";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function Home() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [shareData, setShareData] = useState({});
    const [shareLink, setShareLink] = useState();

    const router = useRouter();
    const { shareId } = router.query;

    const getShare = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL + endpoints.SHARE + "/" + shareId}`,
                {
                    withCredentials: true,
                }
            );
            if (response.status === 200) {
                console.log(response.data);
                setShareData(response.data.data.share);
                setFiles(response.data.data.files);
                setShareLink(
                    `http://localhost:3000/s/p/${response.data.data.share._id}`
                );
            }
        } catch (err) {
            console.log(err);
            alert(err?.response?.data?.message || "Something went wrong");
        }
    };

    const handleGoTo = () => {
        router.replace("/");
    };

    const handleViewFile = (file) => {
        window.open(
            `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${file.path}`,
            "_blank"
        );
    };

    useEffect(() => {
        if (shareId) getShare();
    }, [shareId]);

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
                            minHeight: "500px",
                            marginBottom: "1rem",
                        }}
                    >
                        {!shareData ? (
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
                                    background: "#ced8e0",
                                    padding: "2rem",
                                }}
                            >
                                <Stack
                                    direction="column"
                                    alignItems="center"
                                    spacing={1}
                                    sx={{ mb: 3 }}
                                >
                                    <ShareIcon sx={{ fontSize: "2rem" }} />
                                    <Typography
                                        sx={{
                                            fontSize: "1.5rem",
                                            fontWeight: "600",
                                        }}
                                    >
                                        Not found!
                                    </Typography>
                                </Stack>
                                <Button
                                    onClick={handleGoTo}
                                    sx={{
                                        width: "100%",
                                    }}
                                    variant="contained"
                                >
                                    Go to home
                                </Button>
                            </Stack>
                        ) : (
                            <>
                                <Stack
                                    sx={{
                                        maxWidth: "600px",
                                        margin: "0rem auto",
                                    }}
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                        }}
                                    >
                                        <ShareIcon sx={{ fontSize: "2rem" }} />
                                        Your Share
                                    </Typography>
                                </Stack>
                                <div
                                    style={{
                                        maxWidth: "600px",
                                        minHeight: "100%",
                                        margin: "1rem auto",
                                        borderRadius: "20px",
                                        background: "#dcedff",
                                        padding: "1.5rem",
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        sx={{ mb: 1 }}
                                    >
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.5rem",
                                            }}
                                        >
                                            <span style={{ fontSize: "1rem" }}>Name: </span>
                                            {shareData.name ?? "Not found"}
                                        </Typography>
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.5rem",
                                            }}
                                        >
                                            <span style={{ fontSize: "1rem" }}>Total files: </span>
                                            {shareData.totalFiles ?? "Not found"}
                                        </Typography>
                                    </Stack>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        sx={{ mb: 1 }}
                                    >
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontSize: "1.2rem",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.5rem",
                                            }}
                                        >
                                            <span style={{ fontSize: "1rem" }}>Created At: </span>
                                            {new Date(shareData?.createdAt).toDateString()}
                                        </Typography>
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontSize: "1.2rem",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.5rem",
                                            }}
                                        >
                                            <span style={{ fontSize: "1rem" }}>Total size: </span>
                                            {
                                                shareData.totalSize &&
                                                (shareData.totalSize < 1024 ?
                                                    `${shareData.totalSize} KB`
                                                    : `${
                                                        Number(
                                                            shareData.totalSize.toFixed(2).match(/\d+(?:\.\d+)?/)[0]
                                                          ).toFixed(2)
                                                    } MB`)
                                            }
                                        </Typography>
                                    </Stack>
                                    <Stack sx={{ mt: 4 }}>
                                        <TextField
                                            value={shareLink}
                                            id="outlined-basic"
                                            label="Share Link"
                                            variant="outlined"
                                            hiddenLabel
                                            inputProps={{
                                                readOnly: true,
                                            }}
                                            InputProps={{
                                                style: {
                                                    // color: '#cbcdd4'
                                                },
                                                className: "Mui-disabled",
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        <CopyToClipboard text={shareLink}
                                                            onCopy={() => alert('Link copied!')} >
                                                            <ContentCopyIcon
                                                                sx={{
                                                                    cursor: "pointer", '&:hover': {
                                                                        color: '#0b76f3'
                                                                    }
                                                                }} />
                                                        </CopyToClipboard>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{
                                                color: "#0b76f3!important",
                                            }}
                                            focused
                                        />
                                    </Stack>
                                </div>
                                <Box
                                    sx={{
                                        width: "600px",
                                        margin: "2rem auto",
                                    }}
                                >
                                    {files &&
                                        files.length > 0 &&
                                        files.map((file, idx) => (
                                            <Stack
                                                key={idx}
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="space-between"
                                                sx={{
                                                    padding: "0.8rem",
                                                    background: "#dcedff",
                                                    borderRadius: "10px",
                                                    position: "relative",
                                                    mb: 2,
                                                }}
                                            >
                                                <Stack direction="row" alignItems="center">
                                                    <DescriptionIcon
                                                        sx={{
                                                            fontSize: "36px",
                                                            color: "#0b76f3",
                                                            mr: 1,
                                                        }}
                                                    />
                                                    <Stack>
                                                        <p
                                                            onClick={() => handleViewFile(file)}
                                                            style={{
                                                                margin: "0rem",
                                                                color: "#0b76f3",
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            {" "}
                                                            {file.originalname}{" "}
                                                            <b
                                                                style={{
                                                                    color: "#000",
                                                                    marginLeft: "8px",
                                                                }}
                                                            >{`( ${file.size < 1024
                                                                ? file.size + " KB"
                                                                : (file.size / (1024 * 1024)).toFixed(2) +
                                                                " MB"
                                                                } )`}</b>
                                                        </p>
                                                    </Stack>
                                                </Stack>

                                                <Button
                                                    sx={{
                                                        "&:hover": {
                                                            background: "transparent",
                                                        },
                                                    }}
                                                    color="inherit"
                                                    size="small"
                                                >
                                                    <CheckIcon
                                                        sx={{ fontSize: "20px", color: "#0b76f3" }}
                                                    />
                                                </Button>
                                            </Stack>
                                        ))}
                                </Box>
                            </>
                        )}
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
            }
        </>
    );
}
