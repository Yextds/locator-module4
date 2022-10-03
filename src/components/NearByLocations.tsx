import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import GetDirection from "../components/GetDirection";
import OpenCloseStatus from "../components/OpenCloseStatus";

type props = {
  prop: any;
};
const NearByLocations = (latlng: props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getRestoData();
  }, []);
  function getRestoData() {
    let url = `https://liveapi-sandbox.yext.com/v2/accounts/me/entities/geosearch?radius=500&location=${latlng.prop.latitude},${latlng.prop.longitude}&filter={}&api_key=feaf6138bbb396a404cf75165b165b7b&v=20181201&resolvePlaceholders=true&entityTypes=location`;

    return axios
      .get(url)
      .then((res) => {
        setData(res.data.response.entities);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
  <>
          <h2 className="text-xl font-semibold mb-4">Near By Locations</h2>       
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data ? (
                <>
                  {data.map((i: any) => {
                    return (
                      <>
                        <div className="bg-gray-200 p-4 rounded-lg drop-shadow-md space-y-5">  
						<h3 className="text-lg font-semibold">
                              <a href="">{i.name}</a>
                            </h3>
                            <div className="store-address">
                              <p><svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="21.23"
                                height="30"
                                viewBox="0 0 21.23 30"
                              >
                                <g transform="translate(0 0)">
                                  <path
                                    d="M6.789,23.576c1.079,1.719,2.246,3.8,3.4,5.825.427.747.813.859,1.326-.027,1.113-1.931,2.207-3.931,3.359-5.8,3.5-5.661,9.223-11.181,4.67-18.8C15.5-1.987,4.5-1.265,1.216,5.034c-3.769,7.219,2.117,13.039,5.574,18.542Z"
                                    fill="#d61a0c"
                                    fill-rule="evenodd"
                                  />
                                  <path
                                    d="M10.61,6.247a4.116,4.116,0,1,1-4.116,4.116A4.117,4.117,0,0,1,10.61,6.247Z"
                                    fill="#a60d0d"
                                    fill-rule="evenodd"
                                  />
                                </g>
                              </svg>
                                {i.address.line1},{i.address.city},{} <br />{" "}
                                {i.address.region},{i.address.postalCode}
                              </p>
                            </div>
                            <div className="store-phone">                              
                              <p>
							  <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="23.987"
                                height="23.987"
                                viewBox="0 0 23.987 23.987"
                              >
                                <path
                                  d="M19.64,17.328c-.617,1.876-3.036,2.812-4.764,2.656A15.194,15.194,0,0,1,8,17.14,22.652,22.652,0,0,1,.885,8.652C-.22,6.3-.468,3.411,1.176,1.268A2.827,2.827,0,0,1,3.429,0C4.8-.063,4.992.721,5.463,1.943c.351.913.819,1.845,1.08,2.792C7.032,6.5,5.321,6.575,5.105,8.019c-.133.911.969,2.132,1.468,2.781A13.473,13.473,0,0,0,10.051,14c.76.479,1.984,1.341,2.853.865,1.339-.733,1.213-2.991,3.084-2.227a30.12,30.12,0,0,1,2.833,1.463c1.431.769,1.364,1.567.819,3.223h0"
                                  transform="translate(4.5) rotate(13)"
                                  fill="#d61a0c"
                                  fill-rule="evenodd"
                                />
                              </svg>
                                <a href="tel:02076134893">{i.mainPhone}</a>
                              </p>
                            </div>
							<div className="store-link">
							<OpenCloseStatus timezone={i.timezone} hours={i.hours}></OpenCloseStatus>
							</div>
                            <div className="store-link">
                       <GetDirection buttonText="Get Direction" latitude={i.yextDisplayCoordinate.latitude}
                  longitude={i.yextDisplayCoordinate.longitude} ></GetDirection>                  
                            </div>
                          </div>                       
                      </>
                    );
                  })}
                </>
              ) : (
                <>data not Available</>
              )}           
          </div>
</>		  
  );
};
export default NearByLocations;
