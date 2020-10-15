import axios from 'axios';

const apiKey = "6d86fecf1d7d49f5b9b34e0c3ffb11d6"
const url = "https://yuuki.cognitiveservices.azure.com/face/v1.0/detect";
var params = {
    "returnFaceId": "true",
    "returnFaceLandmarks": "false",
    "returnFaceAttributes":
        "age,gender,headPose,smile,facialHair,glasses,emotion," +
        "hair,makeup,occlusion,accessories,blur,exposure,noise"
};


export const inputImage = (e, setFace, setIsFetched, setImage) => {
    e.preventDefault()
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
        fetchFace(reader.result, setFace, setIsFetched)
        setImage(reader.result)
    }
    reader.readAsDataURL(file)
}
const fetchFace = (image , setFace, setIsFetched) => {
    const bin = atob(image.split(',')[1]);
    const buffer = new Uint8Array(bin.length)
    for(let i = 0; i < bin.length; i++){
        buffer[i] = bin.charCodeAt(i);
    }
    const blob = new Blob([buffer.buffer], {type: 'application/octet-stream'});
    return axios({
        method: 'POST',
        url: `${url}?`,
        params: params,
        headers:{
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': apiKey
        },
        data: blob
    })
    .then(response => {
        console.log(response.data)
        setFace(response.data[0].faceAttributes)
        setIsFetched(true)
    })
    .catch(error => console.log(error.response))
}