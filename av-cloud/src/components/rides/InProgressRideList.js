import React, {useState, useEffect, useContext} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AuthContext } from '../authenticaion/ProvideAuth';
import {fechInProgressRides} from '../../services/rideService';

// function createData(rideNumber, carNumber, date,  charge) {
//   return { rideNumber, carNumber, charge, date };
// }

// const rows = [
//   createData('1', '8CPA850', '11/10/2021', 16.0 ),
//   createData('2', '7YPN393', '11/09/2021', 29.0),
//   createData('3', '8AMF954', '11/09/2021', 56.0),
//   createData('4', '8AMF954', '10/19/2021', 76.0),
//   createData('5', '8AMF954', '10/09/2021', 76.0),
//   createData('6', '8AMF954', '10/06/2021', 146.0),
//   createData('7', '7MWL676', '09/30/2021', 122.0),
//   createData('8', '7MWL676', '09/29/2021', 102.0),
//   createData('9', '8AMF954', '09/19/2021', 56.0),
//   createData('10','8AMF954', '05/09/2021', 86.0),
//   createData('11', '8AMF954', '05/09/2021', 86.0),

// ];

const InProgressRideList = props => {


    const authContext = useContext(AuthContext);
    const {user} = authContext;
    const [inProgressRides, setInProgressRides] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        getInProgressRides();
    },[])

    const getInProgressRides = async () => {
        setLoading(true);
        const {userId, persona} = user;
        const resp = await fechInProgressRides(userId, persona);
        if(resp.status === 200){
            setInProgressRides(resp.data.payload);
            setLoading(false);
        }
        else{
            console.log(resp.data.message);
        }
    }

    //   const selectRide = (e) =>{
    //     const {carId,model, chargePerDay } = JSON.parse(e.target.value);
    //     console.log("Ride selected", JSON.parse(e.target.value));
    //     const {setRide, ride} = props;
    //     setRide({
    //       ...ride,
    //       carId,
    //       model, 
    //       chargePerDay,
    //     })
    //   }

    //   const fetchCarList = async (type) => {
    //     const resp = await fetchCarListFromDB(type);
    //     console.log(resp);
    //     if(resp.status === 200){
    //       console.log(resp.data.payload);
    //       const rows = [];
    //       resp.data.payload.forEach(el => {
    //         const { carId, ownerId, type, model, chargePerDay, mileage} = el;
    //         rows.push({
    //           carId,
    //           ownerId, 
    //           type, 
    //           model,
    //           chargePerDay, 
    //           mileage,
    //         })
    //       });
    //       setCarList(rows);

    //       setLoading(false);
    //     }
    //     else{
    //       console.log(resp.data.message);
    //     }

    //   }

    return (
        <>
        {!loading && (
        <>
        {inProgressRides.length > 0 ? (
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Source</TableCell>
                    <TableCell align="right">Destination</TableCell>
                    <TableCell align="right">Car Number</TableCell>
                    <TableCell align="right">Status</TableCell>
    
                </TableRow>
                </TableHead>
                <TableBody>
                {inProgressRides.map((row) => (
                    <TableRow
                    key={row.rideId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.source}
                    </TableCell>
                    <TableCell align="right">{row.destination}</TableCell>
                    <TableCell align="right">{row.carId}</TableCell>
                    <TableCell style={{color:' green'}}align="right">{row.status}</TableCell>
    
    
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        ) : (
            <span>No Rides in Progress</span>
        )
        }
        
        </>
        )}
        </>
    );
}

export default InProgressRideList;