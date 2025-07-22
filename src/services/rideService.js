
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/booking`;

const index = async () => {

  try {
    const res = await fetch(BASE_URL); //GET request
    return res.json(); //retruns JSON response
  } catch (err) {
    console.log(err);
  }
};

const createBooking = async (bookingData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(bookingData),
    });
    return res.json();
  } catch (error) {
    console.error("Error Creating Booking",error);
  }
};

console.log(await index());

export { index, createBooking };

