import {useEffect, useState } from "react";
import * as React from "react";
import ApiCall from "../components/ApiCall";

export default function Alpabhetsec() {
  const [allEntities, setAllEntities] = useState([]);
  const [params, setparams] = useState({
    offset: 0,
    limit: 50,
  });

  const arrangeEntities = (entities) => {
    let arrangedEntities = {
      a: [],
      b: [],
      c: [],
      d: [],
      e: [],
      f: [],
      g: [],
      h: [],
      i: [],
      j: [],
      k: [],
      l: [],
      m: [],
      n: [],
      o: [],
      p: [],
      q: [],
      r: [],
      s: [],
      t: [],
      u: [],
      v: [],
      w: [],
      x: [],
      y: [],
      z: [],
    };
    for (var i = 0; i < entities.length; i++) {
      let string = entities[i].name;
      let aftertrim = string.trim();
      let frst = aftertrim.charAt(0).toLowerCase();
      let htmlarray = {
        name: entities[i].name,
        slug: entities[i].slug,
        html: entities[i].address.line1,
        city: entities[i].address.city,
        postalCode: entities[i].address.postalCode,
      };
	  if(arrangedEntities[frst]){
		arrangedEntities[frst].push(htmlarray);
	  }
    }

    return arrangedEntities;
  };
  useEffect(() => {
      ApiCall.getAlphabet(params).then((data) => {
        let oldEntities = allEntities;
        //console.log("data.response.entities", data.response.entities);
        //console.log("oldEntities", oldEntities);
        oldEntities = [...oldEntities, ...data.response.entities];
        setAllEntities(oldEntities);
        if (typeof data.response.pageToken != "undefined") {
            setparams({ offset: params.offset + params.limit, limit: 50 });
            return false;
        }
    });
  }, [params]);

  const arrangedEntities = arrangeEntities(allEntities);
  //console.log("arrangedEntities", arrangedEntities);
  return (
    <>
      <ul className="top-alpha bg-red-900 sticky top-0 text-white py-4  flex justify-center flex-wrap">
        {Object.keys(arrangedEntities).map((key) => {
          let noDataClass = arrangedEntities[key].length > 0 ? " hi-selected" : "";
          return (
            <li
              key={key}
              className={`px-2 lg:px-4 opacity-50 uppercase text-xs sm:text-base ${noDataClass}`}
            >
              <a href={`#letter_${key}`}>
                <span>{key}</span>
              </a>
            </li>
          );
        })}
      </ul>
      {Object.keys(arrangedEntities).map((key) => {
        if (arrangedEntities.hasOwnProperty(key)) {
          var location_items = arrangedEntities[key];;
          if (location_items.length > 0) {
            return (
              <div
                key={key}
                className="flex flex-wrap pt-16 lg:pt-20"
                id={`letter_${key}`}
              >
                <div className="letter leading-9 w-auto text-4xl text-[#024B58] uppercase ml-2 md:ml-0 w-[50px]  md:w-[100px] ">
                  {key}
                </div>
                <ul className="w-[calc(100%_-_100px)]  grid grid-cols-1 md:grid-cols-3 gap-8" >
                 {location_items.map((item)=>{ 
                     
                 
                      
                                         return( 
                                                
                <li   key={item.name} className="px-4 pb-4 " ><h5 className="text-lg font-nexa_boldregular  text-[#024B58]"> <a className="alphabet" href={item.slug}>{item.name}</a></h5>{item.html},{item.postalCode},<br/>{item.city}</li>
                                      ); 
                                             
                                            }) 
                                           
                                          }
                                             </ul>
                   
                                     
                              
              </div>
              )}
                                        }
            })
          }
    </>
  );
}
