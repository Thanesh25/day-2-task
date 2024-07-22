import { format } from "date-fns";

let rooms = [
  {
    room_id: 1,
    room_name: "Mini-Hall",
    room_status: "available",
    amenities: "TV,AC,Wifi",
    seats: 4,
    price: 2000,
  },

  {
    room_id: 2,
    room_name: "DG-Hall",
    room_status: "available",
    amenities: "Tv,AC,Wifi",
    seats: 4,
    price: 2000,
  },
  {
    room_id: 3,
    room_name: "MKV-wedding-Hall",
    room_status: "available",
    amenities: "Tv,AC,Wifi",
    seats: 4,
    price: 2000,
  },
];

let bookingRoom = [
    {
    Booking_id: 1,
    Customer_id:1,
    customer_name: "Tharun",
    Date: "04-07-2024",
    Start_time: "04-07-2024-10-00-00",
    End_time: "04-07-2024-12-00-00",
     room_id: "1",
    room_name: "MGR-wedding-Hall"
   
  },
    {
     Booking_id: 2,
    Customer_id:2,
    Customer_Name: "Rahul",
    Date: "12-07-2024",
    Start_Time: "12-07-2024-10-00-00",
    End_Time: "12-07-2024-12-00-00",
    room_id: "2",
    room_name: "Luxury-Hall"
    
  },
];

//Create room
export const createRoom = async (req, res) => {
  try {
    const { room_name, room_status, amenities, seats, price } = req.body;
    const newRoom = {
      room_id: rooms.length + 1,
      room_name: room_name,
      room_status: room_status,
      amenities: amenities,
      seats: seats,
      price: price,
    };
    rooms.push(newRoom);
    res
      .status(200)
      .json({ message: "room created successfully", data: newRoom });
  } catch (error) {
    res.status(404).json({ message: "ERROR " });
  }
};

//Get All room
export const getAllRoom = async (req, res) => {
  try {
    await res.status(200).json({ message: "all get successfully", rooms });
  } catch (error) {
    res.status(404).json({ Message: "ERROR" });
  }
};

//booking
export const bookRoom = async (req, res) => {
    try {
        const {Customer_id, Customer_Name, Date, Start_Time, End_Time, Room_ID } = req.body

        let room = rooms.filter((e) => e.room_status === 'available' && e.room_id === Room_ID)
        if (!room) {
            res.status(404).json({ message: "Room is not available" })
        }
        else {
            let bookingRoomDate = bookingRoom.filter((Dates) => Dates.Date === Date)
            console.log(bookingRoomDate);
            
            if (!bookingRoomDate) {
                console.log('true block')
                res.status(404).json({ message: "Date is not available" })
            }
            
            else {
                console.log('false block')
                const booking = {
                    Booking_id: bookingRoom.length + 1,
                    Customer_id:Customer_id,
                    Customer_Name: Customer_Name,
                    Date:Date,
                    Start_Time:Start_Time,
                    End_Time:End_Time,
                    Room_ID:Room_ID,
                    room_name: rooms.filter(room => room.room_id == Room_ID)[0].room_name
                }
                console.log(booking);
                bookingRoom.push(booking)
                res.status(200).json({message: "successfully booked" ,BookedRoom:bookingRoom})
               
            }
      
        }
    } catch (error) {
     res.status(400).json({ message: "room not available" })
    }

    
}

//booked Room
export const bookedRoom = async (req, res) => {
  try {
    res.status(200).json({Message:"get all bookedRoom successfully",bookingRoom})
  } catch (error) {
    
  }
}

//get all customer data 
export const getCustomer = async (req, res) => {
  try {
    const customerdata = bookingRoom.map((book) => {
      const room = rooms.find((e) => e.room_id === book.Room_ID)
      return {
        Customer_Name: book.Customer_Name,
        Room_Name: book.room_name,
        Date: book.Date,
        Start_Time: book.Start_Time,
        End_Time: book.End_Time,
      }
      
    })
    res.status(200).json({message:"GET all customer details here",customerdata})

  } catch (error) {
    res.status(200).json({message:"not able to get details"})
  }
}

