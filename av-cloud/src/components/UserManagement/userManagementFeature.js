import axios from 'axios';

export async function updateUserProfile(body){
        const response = await axios.put('http://localhost:5000/signin',body)
        console.log(response)

        const data= await response.json()
        return data
}


export async function getDetailsOfUser(id){
    const response = await axios.get('http://localhost:5000/login')
    console.log(response)

    const data= await response.json()
    return data;
}

export async function deleteUserProfile(id){
    const response = await axios.delete('http://localhost:5000/login')
    console.log(response)

    const data= await response.json()
    return data;
}