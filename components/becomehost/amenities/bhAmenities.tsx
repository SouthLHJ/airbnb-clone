import {Box,Typography} from "@mui/material"
import {Dispatch,SetStateAction,useState, useEffect} from "react"
import { Amenities } from "../../../interfaces/becomehost/accommodation";
import AmenitiesNomal from "./amenities_nom";
import AmenitiesSafety from "./amenities_safety";
import AmenitiesSpecial from "./amenities_special";

type Props = {
    amenity: Amenities | undefined,
    setAmenity: Dispatch<SetStateAction<Amenities | undefined>>
}

function BecomeHostAmenities({amenity,setAmenity}:Props) {
    const [nomal , setNomal] = useState<string[]>([]);
    const [special , setSpecial] = useState<string[]>([]);
    const [safety , setSafety] = useState<string[]>([]);

    useEffect(()=>{
        if(amenity){
            setNomal(amenity.convenient);
            setSpecial(amenity.specialConvenient);
            setSafety(amenity.safeItem);
        }
    },[])

    useEffect(()=>{
        setAmenity({
            convenient : nomal,
            specialConvenient : special,
            safeItem : safety
        })
    },[nomal,special,safety])

    return (
        <Box sx={{width : "100%" , height : "800px", overflow : "scroll"}}>
            <AmenitiesNomal nomal={nomal} setNomal={setNomal}/>
            <AmenitiesSpecial special={special} setSpecial={setSpecial}/>
            <AmenitiesSafety safety={safety} setSafety={setSafety}/>
        </Box>
    );
}

export default BecomeHostAmenities;
