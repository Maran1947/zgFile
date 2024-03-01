"use client";
import Head from "next/head";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import React, { useRef, useState, useEffect } from "react";
import { BASE_URL, endpoints } from "../../../helpers/constants/endpoints";
import axios from "axios";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import Loading from "../../../components/loading/Loading";
import { Box, Stack, Typography } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import CancelIcon from "@mui/icons-material/Cancel";
import { Share as ShareIcon } from "@mui/icons-material";
import EventIcon from "@mui/icons-material/Event";
import LinearProgress from "@mui/material/LinearProgress";
import { useRouter } from "next/router";
import VisibilityIcon from '@mui/icons-material/Visibility';

const LinearProgressWithLabel = ({ value }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1, position: "relative" }}>
        <LinearProgress
          sx={{ height: 30, borderRadius: 2 }}
          variant="determinate"
          value={value}
        />
        <Typography
          sx={{
            position: "absolute",
            top: "20%",
            left: "50%",
            color: "#fff",
          }}
          variant="body2"
        >{`${Math.round(value)}%`}</Typography>
      </Box>
    </Box>
  );
};

export default function Home() {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(0);
  const [shareData, setShareData] = useState({});

  const router = useRouter();
  const { shareId } = router.query;

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
        setFiles((prevState) => [...prevState, e.dataTransfer.files[i]]);
      }
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleUploadFile = (e) => {
    e.preventDefault();
    const inputFiles = e.target.files;
    if (inputFiles && inputFiles[0]) {
      for (let i = 0; i < inputFiles["length"]; i++) {
        setFiles((prevState) => [...prevState, inputFiles[i]]);
      }
    }
  };

  const removeFile = (filename, idx) => {
    const filterFiles = [...files];
    filterFiles.splice(idx, 1);
    setFiles([]);
    setFiles(filterFiles);
  };

  const openFileExplorer = () => {
    inputRef.current.value = "";
    inputRef.current.click();
  };

  const handleClearAll = () => {
    setFiles([]);
  };

  const handleUploadAll = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      files.map((file, index) => {
        formData.append(`images`, file);
      });
      formData.append("shareId", shareId);
      const response = await axios.post(
        `${BASE_URL}${endpoints.UPLOAD_FILE}`,
        formData,
        {
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            const fileSize = Math.floor(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setLoaded(fileSize);
          },
        }
      );
      if (response.status === 200) {
        handleViewShare();
      }
    } catch (err) {
      console.log(err);
      setLoaded(0);
      alert(
        err.response?.data?.message ||
        (err.response?.data?.errors.length > 0 &&
          err.response.data.errors[0]) ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const getShare = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL + endpoints.SHARE + "/" + shareId}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setShareData(response.data.data.share);
      }
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "Something went wrong");
    }
  };

  const handleViewShare = () => {
    router.replace(`/share/view/${shareId}`);
  }

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
            {
              shareData.isShared ?
                <Stack sx={{
                  maxWidth: "300px",
                  minHeight: "250px",
                  margin: "1rem auto",
                  borderRadius: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#ced8e0",
                  padding: '2rem'
                }} >
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
                      Already Shared!
                    </Typography>
                  </Stack>
                  <Button
                    onClick={handleViewShare}
                    sx={{
                      width: "100%",
                    }}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<VisibilityIcon />}
                  >
                    View share
                  </Button>
                </Stack>
                : <>
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
                      variant="h5"
                      sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                    >
                      <ShareIcon />
                      {shareData.name ?? "Not found"}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1.2rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <EventIcon />
                      {new Date(shareData?.createdAt).toDateString()}
                    </Typography>
                  </Stack>
                  <form
                    style={{
                      maxWidth: "600px",
                      minHeight: "250px",
                      margin: "1rem auto",
                      borderRadius: "20px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px dashed #0070f3",
                      background: dragActive ? "#ced8e0" : "transparent",
                    }}
                    onDragEnter={handleDragEnter}
                    onSubmit={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <UploadFileIcon
                        style={{ fontSize: "6rem", color: "#4e79ef" }}
                      />
                      <div>
                        <input
                          placeholder="fileInput"
                          style={{
                            display: "none",
                          }}
                          ref={inputRef}
                          type="file"
                          multiple={true}
                          onChange={handleUploadFile}
                          accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                        />
                        <span style={{ fontSize: "1.2rem" }}>
                          Drag your file(s) here or{" "}
                        </span>
                        <span
                          style={{
                            fontSize: "1.2rem",
                            cursor: "pointer",
                            color: "#0070f3",
                          }}
                          onClick={openFileExplorer}
                        >
                          browse
                        </span>
                      </div>
                    </div>
                  </form>

                  {files && files.length > 0 && (
                    <>
                      <Stack
                        sx={{
                          width: "600px",
                          margin: "1rem auto",
                        }}
                      >
                        <LinearProgressWithLabel value={loaded} />
                      </Stack>

                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{
                          width: "600px",
                          margin: "0rem auto",
                        }}
                      >
                        <Button
                          onClick={handleClearAll}
                          sx={{
                            borderColor: "#ff0000",
                            color: "#ff0000",
                            mr: "1rem",
                            "&:hover": {
                              borderColor: "#ff0000",
                              color: "#ff0000",
                              background: "#ff00002e",
                            },
                          }}
                          component="label"
                          variant="outlined"
                          tabIndex={-1}
                          startIcon={<DeleteIcon />}
                        >
                          Clear All
                        </Button>
                        <Button
                          onClick={handleUploadAll}
                          component="label"
                          variant="outlined"
                          tabIndex={-1}
                          startIcon={<CloudUploadIcon />}
                        >
                          {loading ? (
                            <Loading
                              width="28px!important"
                              height="28px!important"
                              color="#0070f3"
                            />
                          ) : (
                            "Upload All"
                          )}
                        </Button>
                      </Stack>
                    </>
                  )}
                  <Box
                    sx={{
                      width: "600px",
                      margin: "2rem auto",
                    }}
                  >
                    {files && files.length > 0 ? (
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
                              <p style={{ margin: "0rem", color: "#0b76f3" }}>
                                {" "}
                                {file.name}{" "}
                                <b
                                  style={{
                                    color: "#000",
                                    marginLeft: "8px",
                                  }}
                                >{`( ${file.size < 1024
                                  ? file.size + " KB"
                                  : (file.size / (1024 * 1024)).toFixed(2) + " MB"
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
                            <CancelIcon
                              sx={{ fontSize: "20px" }}
                              onClick={() => removeFile(file.name, idx)}
                            />
                          </Button>
                        </Stack>
                      ))
                    ) : (
                      <Typography
                        style={{
                          fontSize: "1.2rem",
                          width: "100%",
                          textAlign: "center",
                          color: "#92a2b9",
                        }}
                      >
                        {" "}
                        You haven't selected any image/file.{" "}
                      </Typography>
                    )}
                  </Box>
                </>
            }
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
