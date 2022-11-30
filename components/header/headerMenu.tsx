import { Menu, MenuItem, Avatar, Divider, ListItemIcon } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {useContext}from "react"
import { useAccountDispatch } from "../../contexts/account";
import { AppContext } from "../../pages/_app";

type Props = {
    anchor: HTMLElement | null,
    popup: boolean,
    offPopupIcon: React.MouseEventHandler<HTMLElement>,
    onRegisterAccount: React.MouseEventHandler<HTMLElement>
}

export default function HeaderMenu({ anchor, popup, offPopupIcon, onRegisterAccount }: Props) {
    const { data, status } = useSession();
    const dispatch = useAccountDispatch();
    const loading = useContext(AppContext)
    const router = useRouter();
    
    // console.log(data, status)
    return (
        <>
            {
                status === "authenticated" ?
                    <Menu
                        anchorEl={anchor}
                        id="account-menu"
                        open={popup}
                        onClose={offPopupIcon}
                        onClick={offPopupIcon}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 5,
                                width: 250,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                    >



                        <MenuItem onClick={() => { }} sx={{ fontWeight: "bold" }}>
                            메세지
                        </MenuItem>
                        <MenuItem onClick={() => { }} sx={{ fontWeight: "bold" }}>
                            알림
                        </MenuItem>
                        <MenuItem onClick={() => {router.push(`${process.env.NEXT_PUBLIC_SERVER_URI}/trip`) ; loading?.ready();}} sx={{ fontWeight: "bold" }}>
                            여행
                        </MenuItem>
                        <MenuItem onClick={() => { }} sx={{ fontWeight: "bold" }}>
                            위시리스트
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={()=>{router.push("/become-a-host")}}>
                            숙소 호스트 되기
                        </MenuItem>
                        <MenuItem>
                            체험 호스팅 하기
                        </MenuItem>
                        <MenuItem>
                            계정
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                            도움말
                        </MenuItem>
                        <MenuItem onClick={()=>{signOut();dispatch({type :"remove"}) ; }}>
                            로그아웃
                        </MenuItem>

                    </Menu>
                    :

                    <Menu
                        anchorEl={anchor}
                        id="account-menu"
                        open={popup}
                        onClose={offPopupIcon}
                        onClick={offPopupIcon}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 5,
                                width: 250,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                    >

                        <MenuItem onClick={(evt)=>onRegisterAccount(evt)} sx={{ fontWeight: "bold" }}>
                            {/* <Avatar /> 회원가입 */}
                            회원가입
                        </MenuItem>
                        <MenuItem onClick={(evt)=>onRegisterAccount(evt)}>
                            {/* <Avatar /> 로그인 */}
                            로그인
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                            {/* <ListItemIcon>
                                <PersonAdd fontSize="small" />
                            </ListItemIcon> */}
                            숙소 호스트 되기
                        </MenuItem>
                        <MenuItem>
                            {/* <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon> */}
                            체험 호스팅 하기
                        </MenuItem>
                        <MenuItem>
                            {/* <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon> */}
                            도움말
                        </MenuItem>

                    </Menu>
            }
        </>
    )
}