import axios from 'axios';

export async function listOfCarsFromDatabase(body){
        const response = await axios.get('http://localhost:5000/signin',body)
        console.log(response)

        const data= await response.json()
        return data
}


export async function addCar (car, user) {
    const payload = {
        ...car,
        ownerId: user.userId,
        available:1,
    }
    console.log(payload);
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    }
    const response = await fetch(`http://localhost:5000/car/add`, options);
    const status = response.status;
    const data = await response.json();
    return {status, data};
}