import * as React from "react";
import "../index.css";
import { GetPath, Template, TemplateProps, TemplateRenderProps } from "@yext/pages";
import { SearchHeadlessProvider } from "@yext/search-headless-react";
import { FilterSearch, VerticalResults, ResultsCount, AppliedFilters, ApplyFiltersButton, LocationBias, Pagination } from "@yext/search-ui-react";
import { Location } from "../types/search/locations";
import MapboxMap from "../components/MapboxMap";
import MapPin from "../components/MapPin";
import LocationCard from "../components/LocationCard";
import PageLayout from "../components/PageLayout";
import UseMyLocation from "../components/UseMyLocation"
import { Address } from "../types/search/locations";
import { useSearchActions } from "@yext/search-headless-react";
import { useEffect } from "react";


export const getPath: GetPath<TemplateProps> = () => {
  return `/index.html`;
};

const Locator: Template<TemplateRenderProps> = () => {
 
 

  const endpoints =  {
    universalSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/query",
    verticalSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/query",
    questionSubmission: "https://liveapi-sandbox.yext.com/v2/accounts/me/createQuestion",
    universalAutocomplete: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/autocomplete",
    verticalAutocomplete: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/autocomplete",
    filterSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/filtersearch"
  }
  return (
    <>
      <PageLayout>
     
        <SearchHeadlessProvider
          experienceKey="yext-matalan"
          locale="en"
          apiKey="cc8b0bde99d9d71f0f7a6fa03200807b"
          verticalKey="locations"
          experienceVersion="STAGING"
          sessionTrackingEnabled={true}
          endpoints={endpoints}    
        >
          
          <div className="w-full h-screen flex flex-col max-h-screen">
            <div className="flex flex-row w-full h-full overflow-y-auto">
              <div className="w-1/3 h-full bg-slate-50 border-r border-slate-300 shadow-md overflow-auto">
                <div className="sticky top-0 z-20 bg-slate-50 border-b border-slate-300">
                  <h3 className="m-2 font-semibold text-slate-900">
                    Find a Location
                  </h3>
                   <FilterSearch
                    customCssClasses={{
                      filterSearchContainer: "m-2",
                    }}
                    searchOnSelect={true}
                    searchFields={[
                      {
                        entityType: "location",
                        fieldApiName: "name",
                      },
                    ]}
                  />
                  <ResultsCount
                    customCssClasses={{resultsCountContainer: "mx-2 my-0" }}
                  />
                    <ApplyFiltersButton/>
                    <AppliedFilters
                      customCssClasses={{
                        appliedFiltersContainer: "mx-4",
                        clearAllButton: "bg-slate-300 rounded border-2 border-black p-2",
                        removableFilter: "bg-sky-500 text-white",
                      }}
                    />
                </div>
                
                <VerticalResults<Location>
                  displayAllOnNoResults={false}
                  customCssClasses={{
                    verticalResultsContainer:
                      "flex flex-col divide-y divide-slate-300 overflow-auto",
                  }}
                  CardComponent={LocationCard}
                />
                  <Pagination />
                    
     
              </div>
              <div className="w-full h-full bg-blue-200">
                <MapboxMap<Location>
                  mapboxAccessToken="pk.eyJ1IjoicmFodWxyYXRob3JlIiwiYSI6ImNsOGVoM2NycjFsMDYzbnFrdGlpbGE4djEifQ.IWRyhB7OIqpBdtUtj0ki_w"
                  getCoordinate={(location) =>
                  location.rawData.yextDisplayCoordinate}
                  PinComponent={MapPin}
                />
              </div>
            </div>
          </div>
     
        </SearchHeadlessProvider>
        
   
      </PageLayout>
    </>
  );
};

export default Locator;