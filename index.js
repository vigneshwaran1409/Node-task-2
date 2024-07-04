import express from 'express';
const app= express();
app.use(express.json())
const PORT=8000;


const rooms=[
    { roomId:1,
    roomName:"Single",
    amenitiesinRoom:["Free wifi","hot shower","Room Service","AC"],
    numberofSeatsAvailable:"1",
    pricefor1Hour:"200",
    bookedStatus:false,
    customerDetails:{
        customerName:"",
        date:"",
        startTime:"",
        endTime:""}
    },

    { roomId:2,
    roomName:"Studio",
    amenitiesinRoom:["personal care","tissuebox","coffee kit"],
    numberofSeatsAvailable:"3",
    pricefor1Hour:"400",
    bookedStatus:true,
    customerDetails:{
        customerName:"nagaraj",
        date:"20/02/2023",
        startTime:"10.00 AM",
        endTime:"9.00 PM"}
    },

    { roomId:3,
    roomName:"Hollywood Twin",
    amenitiesinRoom:["Bathrobes&slippers","FreeBreakfast","Freewifi"],
    numberofSeatsAvailable:"5",
    pricefor1Hour:"300",
    bookedStatus:false,
    customerDetails:{
        customerName:"",
        date:"",
        startTime:"",
        endTime:""}
    },

    { roomId:4,
    roomName:"Quad",
    amenitiesinRoom:["optinsforpillows","premiumcoffee"],
    numberofSeatsAvailable:"4",
    pricefor1Hour:"200",
    bookedStatus:true,
    customerDetails:{
           customerName:"saravana",
           date:"21/02/2023",
           startTime:"2.00 PM",
           endTime:" 4.00 AM"}
    },


    { roomId:5,
    roomName:"Deluxe Room",
    amenitiesinRoom:["mobilecheckIn","Gym","Free wifi"],
    numberofSeatsAvailable:"2",
    pricefor1Hour:"200",
    bookedStatus:"true",
    customerDetails:{
            customerName:"Mani",
            date:"23/02/2023",
            startTime:"6.00AM",
            endTime:"2.00PM"}
    },
]

// routes to home

app.get('/',(req,res)=>{
    res.send("Hall Booking");
})

//room creation

app.post('/rooms/create',(req,res)=>{
    const newRoom=req.body;
    rooms.push(newRoom);
    res.send(newRoom)
})

//booking a room

app.post('/rooms', (req, res) => {
    const { roomId, customerName, date, startTime, endTime } = req.body;
    const room = rooms.find(room => room.roomId === roomId);

    if (!room) {
        res.status(404).send('Room not found');
        return;
    }

    if (room.customerDetails.date != date) {
        room.customerDetails.customerName = customerName;
        room.customerDetails.date = date;
        room.customerDetails.startTime = startTime;
        room.customerDetails.endTime = endTime;
        res.status(200).send('Room booked successfully');
    } else {
        res.status(400).send("Room already booked on this date");
    }

    return room;
});


//list all rooms with booked data

app.get('/rooms',(req,res)=>{
    res.status(200).send(
        rooms.map((room)=>{
            if(room.bookedStatus==true)
                {
                return{
                    "Room name":room.roomName,
                    "Booked Status":"Booked",
                    "Customer Name":room.customerDetails.customerName,
                    "Date":room.customerDetails.date,
                    "Start Time":room.customerDetails.startTime,
                    "End Time":room.customerDetails.endTime,
                    }
                }
            else{
                return{"Room name":room.roomName,"Booked Status":"Vacant"}
                }
        })
    );
});

//list all customers with booked data
app.get('/customer',(req,res)=>{
    res.status(200).send(
        rooms.map((room)=>{
            if(room.bookedStatus==true)
                {
                return{
                    "Room name":room.roomName,
                    "Customer Name":room.customerDetails.customerName,
                    "Date":room.customerDetails.date,
                    "Start Time":room.customerDetails.startTime,
                    "End Time":room.customerDetails.endTime,
                    }
                }

        })
    );
});


app.listen(PORT,()=>console.log(`server is listening http://localhost:${PORT}`))