import Axios from "axios";
export const base_url = 'http://localhost:4000';

export const axios = Axios.create({
    baseURL: base_url
})


const getAllStudent = async  () => {
    return   axios('/students/all')
}

const createNewStudent = (studentData: any) => {
    let date1 = new Date(studentData.dob)
    delete studentData.dob;
    let body = {
        dob: date1.toISOString(),
        ...studentData
    }
    return axios({
        method: 'post',
        url: "/students",
        headers: {},
        data: body
    })
}

const deleteStudent = (id: any) => {
    return axios({
        method: 'DELETE',
        url: `/students/${id}`,
        headers: {},
    })
}

const updateStudent = (data:any,id:any) => {
    return   axios({
        method: 'PATCH',
        url: `/students/${id}`,
        headers: {
        },
        data: data
    })
}

export {getAllStudent, createNewStudent, deleteStudent,updateStudent}


