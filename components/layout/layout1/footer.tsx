import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {Typography}from "@mui/material"
export default function Footer(){
    return (
        <AppBar position="fixed"  sx={{ top: 'auto', bottom: 0 , boxShadow :0 }} color="default">
            <Toolbar>
            <Typography fontSize={"12px"}>웹사이트 제공자: abclone CC, private unlimited company, 8 Hanover Quay Dublin 2, D02 DP23 Ireland | 이사: Daniel Nivelra Evan | VAT 번호: ABCDEFGHI | 사업자 등록 번호: HI 123456 | 연락처: aaaa@aaaaa.com, 웹사이트, 080-822-0230 | 호스팅 서비스 제공업체: Vercel | 통신판매 중개자로 플랫폼을 통하여 게스트와 호스트 사이에 이루어지는 통신판매의 당사자가 아닙니다. 플랫폼을 통하여 예약된 숙소, 체험, 호스트 서비스에 관한 의무와 책임은 해당 서비스를 제공하는 호스트에게 있습니다.</Typography>
            </Toolbar>
        </AppBar>
    )
}