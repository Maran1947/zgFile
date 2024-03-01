import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Router from 'next/router';
import axios from 'axios'
import Link from 'next/link'

import { Button, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import Loading from '../components/loading/Loading';
import { BASE_URL, endpoints } from '../helpers/constants/endpoints'
import { validateEmail, validatePassword } from '../helpers/FormValidation'

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  }

  const handleSignIn = async (e) => {
    e.preventDefault() 
    setLoading(true)
    const formErrors = {
        email: validateEmail(email),
        password: validatePassword(password),
    } 

    if (Object.values(formErrors).every((error) => error === undefined)) {
        setErrors({}) 
        const data = {
            email,
            password
        } 

        try {
          const response = await axios.post(`${BASE_URL + endpoints.SIGNIN }`, data, {
            withCredentials: true
          });
          if(response.status === 200) {
            setLoading(false)
            Router.replace('/')
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
        <title>Sign In</title>
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome back to <a href="#">zgFile!</a>
        </h1>

        <p className={styles.description}>
          Want to get your uploaded images/files? <code>Sign in now</code>
        </p>

        <div className={styles.grid}>
          <form method="post" onSubmit={handleSignIn} >
            <Stack>
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
                    loading ? <Loading /> : "Sign in"
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
                Don't have an account?
              </Typography>
              <Link href="/signup" style={{
                fontSize: '0.9rem',
                color: '#0058ff',

              }} >Sign up</Link>
            </Stack>
          </form>
        </div >
      </main >

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
    </div >
  )
}

export default Signin