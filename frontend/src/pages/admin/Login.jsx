import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAdmin } from '../../context/AdminContext'
import { useNavigate } from "react-router-dom";
import styles from './Login.module.css'
import logo from '../../assets/home/logo.png'
export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { adminLogin, user } = useAdmin();

  // Check if user is already authenticated
  useEffect(() => {
    if (user && user.type === 'admin') {
      navigate('/adminDashboard/employeeManagement');
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setLoading(true);
    setError('');

    try {
      await adminLogin(formData);
      navigate("/adminDashboard/employeeManagement");
    } catch (err) {
      console.log(err);
      setError("Login failed");
    }

    setLoading(false);
  };

  return (
    <div className={styles.div}>
      <img src={logo} className={styles.img} />
      <Container className={styles.container}>
        <h1><i className="fa-solid fa-user-tie"></i>Admin Login</h1>
        <br /><br />

        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3">
            <Form.Label htmlFor='username'>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="username"
              name="username"
              id='username'
              value={formData.username}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              id='password'
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Button type="submit" variant="success" >
            Login
          </Button>
          <Button type='button' variant='danger' className={styles.Button} onClick={()=> navigate('/')}>
            back
          </Button>

        </Form>

        {error && <p style={{color:"red"}}>{error}</p>}

      </Container>
    </div>
  )
}