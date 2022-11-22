import { Box, Button, Typography } from "@mui/material";
import { CustomColor } from "../../interfaces/setting/color";
import { styled } from '@mui/material/styles';

import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';

type Props = {
    onPrevPage : ()=>void,
    onNextPage : ()=>void,
    page : number,
    register ?: boolean
}

function BecomehostBottom({onPrevPage,onNextPage, page, register = false}:Props) {
    

    return (
    <>
        <Stack sx={{ width: '90%' }} spacing={10}>
            <Stepper alternativeLabel activeStep={page} connector={<QontoConnector />}>
                {steps.map((label) => (
                <Step key={label}>
                    {/* <StepLabel StepIconComponent={QontoStepIcon}>
                        {label}
                    </StepLabel> */}
                </Step>
                ))}
            </Stepper>
        </Stack>
        <Box sx={{display :"flex", flexDirection : "row", justifyContent :"space-between" ,width : '100%'}} >
            <Button onClick={()=>onPrevPage()} >
                <Typography fontWeight={"bold"} sx={{color:CustomColor.black, fontSize:"14px"}}>뒤로가기</Typography>
            </Button>
            <Button onClick={()=>onNextPage()} sx={{backgroundImage:`linear-gradient(90deg,${CustomColor.mainHover}, ${CustomColor.main})`}}>
                <Typography sx={{color:CustomColor.white}}>{register ? "완료":"다음"}</Typography>
            </Button>
        </Box>
    </>
    );
}

export default BecomehostBottom;


const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: -5,
      left: 'calc(-50% + 1px)',
      right: 'calc(50% + 1px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        // border: "1px solid",
        // borderColor : CustomColor.mainHover,
        backgroundImage:
        `linear-gradient( 95deg,${CustomColor.sub} 0%,${CustomColor.main} 50%, ${CustomColor.mainHover} 100%)`
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        // borderColor: CustomColor.sub,
        backgroundImage:
        `linear-gradient( 95deg,${CustomColor.sub} 0%,${CustomColor.sub} 50%, ${CustomColor.sub} 100%)`
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 2,
      border: 0,
      backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderRadius: 3
    },
  }));

  const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
      color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : CustomColor.whiteHover,
      display: 'flex',
      height: 8,
      alignItems: 'center',
      ...(ownerState.active && {
        color: CustomColor.mainHover,
      }),
      '& .QontoStepIcon-completedIcon': {
        color: CustomColor.sub,
        zIndex: 1,
        fontSize: 18,
      },
      '& .QontoStepIcon-circle': {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
      },
    }),
  );
  
  function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;
  
    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
            <></>
        //   <Check className="QontoStepIcon-completedIcon" />
        ) : (
            <></>
        //   <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }
  
//   const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
//     [`&.${stepConnectorClasses.alternativeLabel}`]: {
//       top: 22,
//     },
//     [`&.${stepConnectorClasses.active}`]: {
//       [`& .${stepConnectorClasses.line}`]: {
//         backgroundImage:
//           'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
//       },
//     },
//     [`&.${stepConnectorClasses.completed}`]: {
//       [`& .${stepConnectorClasses.line}`]: {
//         backgroundImage:
//           'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
//       },
//     },
//     [`& .${stepConnectorClasses.line}`]: {
//       height: 3,
//       border: 0,
//       backgroundColor:
//         theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
//       borderRadius: 1,
//     },
//   }));
  
//   const ColorlibStepIconRoot = styled('div')<{
//     ownerState: { completed?: boolean; active?: boolean };
//   }>(({ theme, ownerState }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
//     zIndex: 1,
//     color: '#fff',
//     width: 50,
//     height: 50,
//     display: 'flex',
//     borderRadius: '50%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     ...(ownerState.active && {
//       backgroundImage:
//         `linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)`,
//       boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
//     }),
//     ...(ownerState.completed && {
//       backgroundImage:
//         'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
//     }),
//   }));
  
//   function ColorlibStepIcon(props: StepIconProps) {
//     const { active, completed, className } = props;
  
//     const icons: { [index: string]: React.ReactElement } = {
//       1: <SettingsIcon />,
//       2: <GroupAddIcon />,
//       3: <VideoLabelIcon />,
//     };
  
//     return (
//       <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
//         {icons[String(props.icon)]}
//       </ColorlibStepIconRoot>
//     );
//   }
  
  const steps = ['1',"2","3",'4','5','6','7','8','9','10'];