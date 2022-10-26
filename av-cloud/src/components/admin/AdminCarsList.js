import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  Card,
  CardGroup,
  Col,
  Row,
  Spinner,
  Button,
} from "react-bootstrap";
import axios from "axios";
import AdminNavBar from "./AdminNavigationBar";

const AdminCarsList = () => {
  const history = useHistory();

  const [cars, setCars] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("admin");
    console.log("User: ", user);
    if (user !== null && user !== undefined) {
      setUserInfo(JSON.parse(user));
    } else {
      history.push("/admin/login");
      document.location.reload();
    }

    //   axios.get(`http://localhost:3000/users/${JSON.parse(user).username}`)
    //       .then((res) => {
    //         if (res.status === 200) {
    //           console.log(res.data);
    //           setUserDetails(res.data.data);
    //         } else {
    //           history.push("/login");
    //           document.location.reload();
    //         }
    //       });

    axios.get("https://avcloud-node.herokuapp.com/cars").then((res) => {
      if (res.status === 200) {
        console.log(res.data.data);

        setCars(res.data.data);
        console.log(cars);
      } else {
        history.push("/admin/login");
        document.location.reload();
      }
    });
  }, []);


  const handleDelete =(event) =>{
    console.log(event.target.value);
        const deleteCar = event.target.value;
        console.log(deleteCar)
        
        axios.delete(`https://avcloud-node.herokuapp.com/cars/${deleteCar}`)
        .then((res) =>{
            if (res.status === 200){
                console.log(res.data);
                window.alert('Delete car complete')
                document.location.reload()
            }
            else{
                window.alert('Cannot delete car! Please try again!')
                document.location.reload()
            }


        });
  }



  return (
    <div>
      <>
      <AdminNavBar/>
        {cars?.map((car) => (
          <Card style={{ margin: "2%"  }}>
            <Card.Header>Car ID: {car.car_id}<Button value={car.car_id} onClick={handleDelete} style={{float:'right'}}>Delete</Button></Card.Header>
            <Card.Body>
              <Card.Title> Car Name : {car.car_type} </Card.Title>
              <Card.Text>
                <ListGroup variant="flush">
                  <ListGroup.Item><b>Car state : </b>{car.use_state}</ListGroup.Item>
                  <ListGroup.Item><b>Car Location- X : </b>{car.car_loc_x} <b> , Car Location- Y : </b>{car.car_loc_y}</ListGroup.Item>
                </ListGroup>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </>
    </div>
  );
};

export default AdminCarsList;
