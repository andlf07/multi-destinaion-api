const TripService = require("../../services/tripService");

const tripService = new TripService();

const getTrips = async (req, res) => {
  try {
    //get id from request in JWT
    const { id } = req;
    //get alltrips
    const getTrips = await tripService.getAllTrips(id);

    if (getTrips == false) {
      return res.status(400).json({
        error: "dont have trips",
      });
    }

    //response
    res.status(200).json({
      data: getTrips,
      msg: "All trips, sucessfully get",
    });
  } catch (err) {
    return err;
  }
};

const getTripsById = async (req, res) => {
  //get trip id in params
  const { tripId } = req.params;

  try {
    //get single trip(subDoc) from db
    const tripById = await tripService.getSingleTrip(tripId);

    if (!tripById) {
      return res.status(400).json({
        error: `There no trip with id: ${tripId}`,
      });
    }

    //send response
    res.status(200).json({
      data: tripById,
      msg: `Trip ${tripId}, sucessfully get`,
    });
  } catch (err) {
    return err;
  }
};

const postTrips = async (req, res) => {
  // Get data in body
  const { body: data } = req;
  //get id user in JWT
  const { id } = req;

  data.user = id;

  try {
    //Create trip in User trips
    const createTrip = await tripService.createTrip(id, data);
    //all is ok
    res.status(201).json({
      data: createTrip,
      msg: "Order successfully create",
    });
  } catch (err) {
    return err;
  }
};

const patchTrips = async (req, res) => {
  //Get tripId and trip to update
  const { tripId } = req.params;
  // trip = data to update
  const { body: data } = req;
  try {
    //Send data to modify
    const tripUpdate = await tripService.updateTrip(tripId, data);

    if (!tripUpdate) {
      return res.status(400).json({
        error: `There no trip with id: ${tripId}`,
      });
    }

    //all is ok
    res.status(200).json({
      data: tripUpdate,
      msg: "Trip sucessfully update",
    });
  } catch (err) {
    return err;
  }
};

const deleteTrips = async (req, res) => {
  //get trip id in request
  const { tripId } = req.params;
  //get id = UserId from request
  const { id } = req;
  try {
    //Delete from db
    const deleteTripId = await tripService.deleteTrip(id, tripId);

    //if doest not exist
    if (!deleteTripId) {
      return res.status(400).json({
        error: `There no trip with id: ${tripId}`,
      });
    }

    //send response
    res.status(200).json({
      data: deleteTripId,
      msg: "Order trip, sucessfully delete",
    });
  } catch (err) {
    return err;
  }
};

module.exports = {
  getTrips,
  getTripsById,
  postTrips,
  patchTrips,
  deleteTrips
};
