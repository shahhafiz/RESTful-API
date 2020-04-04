import React, { useState, useEffect } from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    container:{
        height: '100vh',
        display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
    },

    pagination:{
        '& > *': {
            background: "transparent",
            // marginTop: theme.spacing(2),
        },
    },

    table: {
        minWidth: 650,
    },
}));

function Home() {
    const classes = useStyles();
    const [data,setData] = useState([]);
    const [rows, setRows] = useState([]);
    const [pages, setPages] = useState(0);
    
    useEffect(( ) => {
        fetch("http://localhost/excercise/api")
            .then(response => response.json())
            .then(data => {
                setPages(Math.ceil(data.length/5));
                setData(data);
                if(pages === 1){
                    setRows(data);
                } else {
                    setRows(data.slice(0,5))
                }
            }); 
    }, [])

    const handleChange = (event, value) => {
        const start = (value-1) * 5;
        const end = value * 5;
        setRows(data.slice(start, end));
    };
    

    return(
        <div className={classes.container}>
            <h1>Welcome!</h1>
            <div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Mobile No.</TableCell>
                            <TableCell align="center">Gender</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                            <TableRow key={row.login_ID}>
                                <TableCell align="center" key={row.login_ID}>{row.login_ID}</TableCell>
                                <TableCell align="center">{row.login_name}</TableCell>
                                <TableCell align="center">{row.mobile_no}</TableCell>
                                <TableCell align="center">{row.gender}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className={classes.pagination}>
                        <Pagination count={pages} onChange={handleChange}/>
                    </div>
                </TableContainer>
            </div>
            <Link to="/login">
                <Button color="primary" type="submit"><u> Logout </u></Button>
            </Link>
        </div>
    );
}

export default Home;