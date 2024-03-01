'use client'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Router from 'next/router'
import axios from 'axios'
import { Button, Stack, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Loading from '../components/loading/Loading'
import { validateConfirmPassword, validateEmail, validateFullName, validatePassword } from '../helpers/FormValidation'
import { BASE_URL, endpoints } from '../helpers/constants/endpoints'

const Signup = () => {

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')


  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleOnSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formErrors = {
      fullName: validateFullName(fullName),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(password, confirmPassword)
    }

    if (Object.values(formErrors).every((error) => error === undefined)) {
      setErrors({})
      const data = {
        fullName,
        email,
        password
      }

      try {
        const response = await axios.post(`${BASE_URL + endpoints.SIGNUP}`, data, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setLoading(false)
          Router.push('/')
        }
      } catch (err) {
        setLoading(false)
        console.log(err, err.response);
        alert(err?.response?.data?.message || err?.response?.data?.error || 'Something went wrong!')
      }

    } else {
      setLoading(false);
      console.log(formErrors)
      setErrors(formErrors)
    }
  }

  return (

    <div className={styles.container}>
      <Head>
        <title>Sign up</title>
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome to <a href="#">zgFile!</a>
        </h1>

        <p className={styles.description}>
          Want to upload images/files? <code>Sign up now</code>
        </p>

        <div className={styles.grid}>
          <form method="post" onSubmit={handleOnSignUp}>
            <Stack>
              <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="signupUsername">Full Name</InputLabel>
                <OutlinedInput
                  id="signupFullNameId"
                  type='text'
                  label="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  autoComplete='off'
                />
                {errors.fullName && <div style={{ color: '#f00', fontSize: '0.9rem' }} >{errors.fullName}</div>}
              </FormControl>
              <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="signupEmail">Email</InputLabel>
                <OutlinedInput
                  id="signupEmailId"
                  type='email'
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete='off'
                />
                {errors.email && <div style={{ color: '#f00', fontSize: '0.9rem' }} >{errors.email}</div>}
              </FormControl>
              <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="signupPassword">Password</InputLabel>
                <OutlinedInput
                  id="signupPasswordId"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff sx={{ color: '#afafaf' }} /> : <Visibility sx={{ color: '#afafaf' }} />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  required
                  autoComplete='off'
                />
                {errors.password && <div style={{ color: '#f00', fontSize: '0.9rem' }} >{errors.password}</div>}
              </FormControl>
              <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="signupConfirmPassword">Confirm Password</InputLabel>
                <OutlinedInput
                  id="signupConfirmPasswordId"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff sx={{ color: '#afafaf' }} /> : <Visibility sx={{ color: '#afafaf' }} />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                  required
                  autoComplete='off'
                />
                {errors.confirmPassword && <div style={{ color: '#f00', fontSize: '0.9rem' }} >{errors.confirmPassword}</div>}
              </FormControl>
              <FormControl sx={{ m: 1 }} >
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    background: '#0058ff!important'
                  }} >
                  {
                    loading ? <Loading /> : "Sign up"
                  }
                </Button>
              </FormControl>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={0.5}
              sx={{
                m: 1,
                mt: 3,
                mb: 0
              }} >
              <Typography sx={{
                color: '#7f7f7f',
                fontSize: '0.9rem'
              }} >
                Already have an account?
              </Typography>
              <Link href="/signin" style={{
                fontSize: '0.9rem',
                color: '#0058ff',
              }} >Sign in</Link>
            </Stack>
          </form>
        </div>
      </main>

      <style jsx>{`
        main {
          padding: 2rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
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
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export default Signup