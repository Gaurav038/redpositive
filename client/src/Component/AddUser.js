import react, { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core';
import { addUser } from '../Service/api';
import {useNavigate} from 'react-router-dom';

const initialValue = {
    employee_name: '',
    employee_phone: '',
    employee_email: '',
    employee_hobbies: '',
    status:'false'
}

const useStyles = makeStyles({
    container: {
        width: '50%',
        margin: '5% 0 0 25%',
        '& > *': {
            marginTop: 5
        }
    }
})

const AddUser = () => {
    const [user, setUser] = useState(initialValue);
    const [formError, setformError] = useState({});
    const [isSubmit, setisSubmit] = useState(false);
    const classes = useStyles();
    const navigate = useNavigate();

    const onValueChange = (e) => {
        console.log(e.target.value);
        setUser({...user, [e.target.name]: e.target.value})
    }

    const addUserDetails = async() => {
        setformError(validate(user))
        setisSubmit(true)
        if(Object.keys(formError).length === 0 && isSubmit){
            console.log(user)
            await addUser(user);
        navigate('/');
        window.alert("User added Succesfully")
        }
        
    }

    const validate = (values) => {
        const errors = {}
        const exp = /^[A-Za-z0-9? , _-]+$/
        const exp1 = /^[a-zA-Z0-9]*$/gm
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!values.employee_name){
            errors.employee_name = "name required "
        }

        if(!values.employee_phone){
            errors.employee_phone = "Mobile required"
        }else if (values.employee_phone.length !== 10) {
            errors.employee_phone = "Mobile  must be 10 number";
        }

        if(!values.employee_email){
            errors.employee_email = "Email required"
        }else if (!regex.test(values.employee_email)) {
            errors.employee_email = "This is not a valid email format!";
        }
        if(!values.employee_hobbies){
            errors.employee_hobbies = "hobbies required"
        }
        return errors;
    }

    return (
        <>
      <FormGroup className={classes.container}>
      <Typography variant="h4">Add User</Typography>
      
      <FormControl>
          <InputLabel htmlFor="my-input">Name</InputLabel>
          <Input onChange={(e) => onValueChange(e)} name='employee_name' value={user.employee_name} id="my-input" />
          <p style={{color: 'red'}}>{formError.employee_name}</p>
      </FormControl>
      <FormControl>
          <InputLabel htmlFor="my-input">Mobile No</InputLabel>
          <Input onChange={(e) => onValueChange(e)} name='employee_phone' value={user.employee_phone} id="my-input"/>
          <p style={{color: 'red'}}>{formError.employee_phone}</p>
      </FormControl>
      <FormControl>
          <InputLabel htmlFor="my-input">Email</InputLabel>
          <Input onChange={(e) => onValueChange(e)} name='employee_email' value={user.employee_email} id="my-input" />
          <p style={{color: 'red'}}>{formError.employee_email}</p>

      </FormControl>
      <FormControl>
          <InputLabel htmlFor="my-input">Hobbies</InputLabel>
          <Input onChange={(e) => onValueChange(e)} name='employee_hobbies' value={user.employee_hobbies} id="my-input" />
          <p style={{color: 'red'}}>{formError.employee_hobbies}</p>

      </FormControl>
      <FormControl>
          <Button variant="contained" color="primary" onClick={() => addUserDetails()}>Add User</Button>
      </FormControl>
  </FormGroup>
  </>
    )
}

export default AddUser;