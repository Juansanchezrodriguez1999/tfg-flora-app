import Dexie from "dexie";
import { v4 as uuidv4 } from "uuid";

const localStorage = new Dexie("Time");
localStorage.version(1).stores({
  DateTime:
    "id"
});

const Time ={
    insertTime: ()=>{
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let hour = newDate.getHours();
        let minutes = newDate.getMinutes();
        let seconds = newDate.getSeconds();
        const newDateTime = new Date(`${year}/${month<10?`0${month}`:`${month}`}/${date} ${hour}:${minutes<10?`0${minutes}`:`${minutes}`}:${seconds<10?`0${seconds}`:`${seconds}`}` );
        const dateTimeNum = newDateTime/60000
        const dataObject ={
            id:dateTimeNum,
            strDate: newDateTime
        }   
        return localStorage.DateTime.add(dataObject);
    },
    getAllTime: () => {
        return localStorage.DateTime.toArray().then((localSamples) => localSamples.map((doc) => doc));
    },
    removeTime:(id) =>{
        return localStorage.DateTime.delete(id);
    }
}
export { Time };