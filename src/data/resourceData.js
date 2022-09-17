import { collection, getDocs , addDoc } from "firebase/firestore";
import {db} from '../firebase'

var resourceData = []

class Car {
    constructor (text, id, desc, imgLink ) {
        this.text = text;
        this.id = id;
        this.desc = desc;
        this.imgLink = imgLink;
    }
}

const CarConverter = {
    toFirestore: (Car) => {
        return {
            text: Car.text,
            id: Car.id,
            desc: Car.desc,
            imgLink: Car.imgLink
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Car(data.text, data.id, data.desc, data.imgLink);
    }
};

async function getCars() {
    const querySnapshot = await getDocs(collection(db, "Cars").withConverter(CarConverter));
    querySnapshot.forEach((doc) => {
            resourceData.push(doc.data())
      });

};

async function setCars()
{
    console.log(resourceData)
    var id = resourceData[resourceData.length-1].id
    console.log(id)
    var name = resourceData[resourceData.length-1].text
    var desc = resourceData[resourceData.length-1].desc
    var imgLink = resourceData[resourceData.length-1].imgLink

    const docRef = await addDoc(collection(db, "Cars").withConverter(CarConverter), {
        text: name,
        id: id,
        desc: desc,
        imgLink: imgLink
      });
}

getCars();





export{ resourceData , setCars , getCars}