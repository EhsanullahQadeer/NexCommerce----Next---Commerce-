import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}, &.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(95deg, #cc9966 0%, #cc9966 50%, #cc9966 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ ownerState }) => ({
  backgroundColor:
    ownerState.active || ownerState.completed ? "#cc9966" : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: ownerState.active ? "0 4px 10px 0 rgba(0,0,0,.25)" : "none",
  "@media (max-width: 640px)": {
    width: 35, 
    height: 35, 
  },
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed } = props;

  const icons: { [index: string]: React.ReactElement<any> } = {
    1: <i className="la la-truck text-lg sm:text-2xl" />,
    2: <i className="la la-credit-card text-lg sm:text-2xl" />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

export default function CustomizedSteppers({
  steps,
}: {
  steps: React.ReactNode[];
}) {
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up('sm'));
  
  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Stepper
      alternativeLabel
        activeStep={1}
        orientation={isMdScreen ? "horizontal" : "vertical"}
        connector={isMdScreen ? <ColorlibConnector /> : null} 
      >
        {steps.map((label, idx) => (
          <Step key={idx}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}