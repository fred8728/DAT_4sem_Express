import IPosition from "../interfaces/Position"

/*
According to this calculator one Degree of latitude (at lattitude:55.772780384609256 ) 
corresponds to 111337.6487 meters, so one meter corresponds to 1/111337.6487 degrees
http://www.csgnetwork.com/degreelenllavcalc.html

const latInside = 55.772780384609256 + ((DISTANCE_TO_CENTER - 1) / 111337.6487)
const latOutside = 55.772780384609256 + ((DISTANCE_TO_CENTER + 1) / 111337.6487)
*/

function getLatitudeInside(latitude: number, radius: number) {
  return latitude + ((radius - 1) / 111337.6487)
}
function getLatitudeOutside(latitude: number, radius: number) {
  return latitude + ((radius + 1) / 111337.6487)
}

function positionCreator(lon: number, lat: number, userName: string, name: string, dateInFuture: boolean): IPosition {
  let date = new Date()
  if (dateInFuture) {
    date = new Date("2022-09-25T20:40:21.899Z")
  }
  var position: IPosition = {
    userName, name, lastUpdated: date,
    location: {
      type: "Point",
      coordinates: [lon, lat]
    }
  };

  return position;
}

export {getLatitudeInside,getLatitudeOutside,positionCreator}

