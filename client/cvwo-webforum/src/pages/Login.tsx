import { TextField, Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Login() {
    const [data, setData] = useState({
        name: '',
      });

    async function loginUser(e: React.FormEvent) {
        e.preventDefault();
        const { name } = data;
        const loading = toast.loading('Attempting Login')

        try {
          const { data } = await axios.post('/login', { name });
          if (data.error) {
            toast.dismiss(loading);
            toast.error(data.error);
          } else {
            setData({ name: '' });
            // if (keepSignedIn) {
            //   localStorage.setItem('user', JSON.stringify(data));
            // }
            // dispatch({ type: 'LOGIN', payload: data });
            toast.dismiss(loading);
            toast.success('Logged in succesfully')
            // navigate('/');
          }
        } catch (error) {
          console.error('Error during login:', error);
          toast.dismiss(loading)
          toast.error('Error occurred during login.');
        }
      }

    document.title = "Login";

    return (
        <>
            <TextField label="Hello" />
            <h1>Login Page</h1>
            <form onSubmit={loginUser}>
                <TextField label="Username" variant="outlined" fullWidth margin="normal" required id="name" type="text"
                value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                <Button type="submit" variant="contained" color="primary" fullWidth> Continue </Button>
            </form>
        </>
    )
}