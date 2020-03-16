import * as jsonld from "jsonld";

export const constructFrame = (response, type) => ({
        "@context": response["@context"],
        "@type": type,
        "@embed": "@always" //to nest duplicate URIs, e. g. the inspirations 
    })

export const frameData = (data, type) => jsonld.frame(data, constructFrame(data, type))