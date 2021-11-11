import axios from "axios"

export default function (url,method='get',data={}){
    if(Object.keys(data).length){
        axios({
            url,
            data,
            method
        })
    }else{
        return axios({
            url,
            method
        })
    }
}