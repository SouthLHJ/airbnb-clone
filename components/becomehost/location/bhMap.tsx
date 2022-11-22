import {useEffect,useState, ChangeEventHandler, useRef,Dispatch,SetStateAction} from "react"
import Box from "@mui/material/Box";
import { Button, Typography, Grid, ToggleButton,TextField,  InputAdornment ,FormControl, Input, CircularProgress } from "@mui/material";
import Image from "next/image";
import {FaMapMarkerAlt} from "react-icons/fa"
import {MdGpsFixed} from "react-icons/md"
import {FaBuilding} from "react-icons/fa"
import { CustomColor } from "../../../interfaces/setting/color";
import BecomeHostAddress from "./bhAddress";
import BecomeHostGoogleMap from "./bhgoogleMap";
import { Location } from "../../../interfaces/becomehost/accommodation";
//GOOGLE_MAP_KEY="AIzaSyBFxnUo7bBm2sr4m3l9-AI1Pe9bu6c9gGw"

type PlaceList = {
    description: string,
    matched_substrings: any[],
    place_id: string,
    reference: string,
    structured_formatting: any[],
    terms: any[],
    types: string[]
}

type Props = {
    placeAbout : Location | undefined,
    setPlaceAbout: Dispatch<SetStateAction<Location | undefined>>,
    setFixed : Dispatch<SetStateAction<boolean>>,
    fixed: boolean

}

function BecomeHostMap({placeAbout,setPlaceAbout,fixed,setFixed} :Props) {
    const [lat , setLat] = useState<string>("37.5666805");
    const [lng , setLng] = useState<string>("126.9784147");

    const [placeSearch, setPlaceSearch] = useState<string>("")
    const [placeList, setPlaceList] =  useState<PlaceList[]>([]);

    const [detail, setDetail] = useState<boolean>(false);
    const [focus, setFocus] = useState<boolean>(false);
    
    // const url = useRef<string>("")
    const url  = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=17&size=2000x2000&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&markers=color:blue%7Clabel:S%7C${lat},${lng}`
    
    useEffect(()=>{
        // url.current = `http://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=17&size=2000x2000&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&markers=color:blue%7Clabel:S%7C${lat},${lng}`

    },[])

    useEffect(()=>{
        // 값이 변경되면 타이머 작동
        const timerId = setTimeout(()=>{
            // console.log(placeSearch, "!")
            placeAutoComplete(placeSearch)
        },800);
        // 값이 계속 변경되서 해제가 된다면 타이머 작업을 끄게 만든다.
        return ()=>{
            // console.log(timerId + "...canceled")
            // 강제종료 타임아웃
            clearTimeout(timerId);
        }
    },[placeSearch])

    const placeAutoComplete = async(place : string)=>{
        setPlaceSearch(place)
        const rcv = await fetch(`/redis/maps/api/place/autocomplete/json?input=${place}&location=37.76999%2C127&radius=500&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&components=country:kr`,{method : "get"})
        const data = await rcv.json()
        // console.log(data)
        setPlaceList(data.predictions)
    }

    const onSeletPoint = async(place_id :string)=>{
        const rcv = await fetch(`/redis/maps/api/place/details/json?place_id=${place_id}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}`)
        const data = await rcv.json()
        console.log(data.result);
        const ad = data.result.formatted_address as string;
        const address = ad.split(" ");
        const zip = data.result.address_components.find((one:any)=>{
            // console.log(one.long_name.includes("-"), one.long_name)
            return one.long_name.includes("-")
        }) ?? ""
        console.log(address)
        const placeAb  : Location = {
            countrycode : address[0] ?? "",
            state : address[1] ?? "",
            city :  address[2] ?? "",
            street :`${address[3] ?? ""} ${address[4] ?? ""}`,
            zipcode : zip?.long_name ?? "",
            view : false,
            lat : lat,
            lng : lng
        }

        // console.log(placeAb)        
        setLat(data.result.geometry.location.lat);
        setLng(data.result.geometry.location.lng);
        setPlaceAbout(placeAb);
        setPlaceSearch("");
        setDetail(true);
    }

    

    const CurrentPoint = async()=>{
        let latitude;
        let longitude;
        navigator.geolocation.getCurrentPosition(async function(pos) {
            latitude = pos.coords.latitude.toString();
            longitude = pos.coords.longitude.toString();
            const rcv = await fetch(`/redis/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}`,{method:"get"})
            const data = await rcv.json();
            const rst : any[] = data.results 
            // console.log(rst)
            const item = rst.sort((a:any, b: any)=>{
                // console.log(a.address_components.length - b.address_components.length, a.address_components.length , b.address_components.length)
                return (b.address_components.length - a.address_components.length)
            })
            // console.log(item)
            const address = item[0].formatted_address.split(" ");
            const zip = item[0].address_components.find((one:any)=>{
                // console.log(one.long_name.includes("-"), one.long_name)
                return one.long_name.includes("-")
            }) ?? ""
            const placeAb  : Location = {
                countrycode : address[0] ?? "",
                state : address[1] ?? "",
                city :  address[2] ?? "",
                street : `${address[3] ?? ""} ${address[4] ?? ""}`,
                zipcode : zip?.long_name ?? "",
                view : false,
                lat : latitude,
                lng : longitude
            }
            // console.log(placeAb)        
            setLat(latitude);
            setLng(longitude);
            setPlaceAbout(placeAb);
            setPlaceSearch("");
            setDetail(true);
            // alert("현재 위치는 : " + latitude + ", "+ longitude);
        });      

    }


    return (
        <>
            <Box sx={{width:"100%", height : "100%", overflow : "hidden", position :"relative"}}>

                <Box sx={{display : "flex",flexDirection :"column", alignItems : "center", justifyContent : "center", width : "100%", height : "88vh", zIndex : -100, overflow : "hidden"}}>
                    { 
                    fixed ?
                    <>
                        <BecomeHostGoogleMap mapLocation={{lat:Number(lat), lng: Number(lng)}} setLat={setLat} setLng={setLng} />
                        {/* <Typography>핀을 움직여</Typography> */}
                    </>
                    :
                    <Image
                        alt={"map"}
                        src={url}
                        // width={600}
                        // height={750}
                        fill = {true}
                        style={{ borderRadius: "5px" , objectFit: 'cover'}}
                        
                    />}

                </Box>

                <Box style={{
                    zIndex : 100,
                    top : 200,             
                    width : "100%",
                    // height: "100%",
                    position : "absolute"
                }}>
                    <Box sx={{width: "100%",display : "flex", alignItems : "center", flexDirection : "column"}}>
                        <TextField
                            style={{width : "60%", backgroundColor : "white",zIndex : 100}}
                            onFocus={()=>{setFocus(true)}}
                            onBlur={()=>setFocus(false)}
                            value={fixed ? `${placeAbout?.countrycode} ${placeAbout?.state} ${placeAbout?.city} ${placeAbout?.street} ${placeAbout?.apt}`: placeSearch}
                            disabled={fixed}
                            onChange={(evt)=>{
                                setPlaceSearch(evt.target.value)    
                                // placeAutoComplete(evt)
                            }}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <FaMapMarkerAlt />
                                </InputAdornment>
                                ),
                            }}
                            autoComplete="off"
                            placeholder = "도로명 주소를 입력하세요.(예시. 서울특별시 중구 세종대로 110) "
                        />
                        {
                            placeList &&
                            placeList.map(one=>{
                                return (
                                    <Box key={one.description} sx={[{width : "60%", backgroundColor : "white", padding : 2, display :"flex", alignItems : "center", cursor:"pointer"},{"&:hover": {backgroundColor : "lightgray"}}]} onMouseDown={()=>{onSeletPoint(one.place_id)}}>
                                        <Box sx={{mr  : 1}}>
                                            <FaBuilding />
                                        </Box>
                                        <Typography fontSize={"13px"}  color={CustomColor.black}>
                                            {one.description}
                                        </Typography>
                                    </Box>
                                )
                            })
                        }
                        {
                            (focus && placeList.length===0) &&
                            <Box style={{width : "60%", backgroundColor : "white", padding : 15,  display :"flex", alignItems : "flex-end" , cursor:"pointer" }} onMouseDown={CurrentPoint}>
                                <Box sx={{mr  : 1}}>
                                    <MdGpsFixed/>
                                </Box>
                                <Typography fontSize={"13px"} color={CustomColor.black} sx={{mt : 1,}}>
                                    현재 위치 받아오기
                                </Typography>
                            </Box>

                        }
                        {
                            focus &&
                            <Box style={{width : "60%", backgroundColor : "white", padding : 15, borderBottomRightRadius : 5, borderBottomLeftRadius : 5}}  >
                                <Typography fontWeight={"bold"}  fontSize={"13px"} color={CustomColor.black} sx={{mt : 1, cursor:"pointer", textDecoration : "underline"}}  onMouseDown={CurrentPoint}>주소 직접 작성하기</Typography>
                            </Box>

                        }
                    </Box>

                </Box>
            {
                detail &&

                <Box style={{
                    zIndex : 100,
                    top : 80,             
                    width : "100%",
                    height: "80%",
                    position : "absolute",
                    display : "flex",
                    justifyContent : "center"
                    
                }}>

                    <BecomeHostAddress placeAbout={placeAbout} setPlaceAbout={setPlaceAbout} setDetail={setDetail} setFixed={setFixed} />

                </Box>
            }
                
            </Box>
        </>
    );
}
//.css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root {
//     border-radius: 20px
// }
export default BecomeHostMap;