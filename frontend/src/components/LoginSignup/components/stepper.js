import React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepIndicator from '@mui/joy/StepIndicator';
function SignupStepper() {
    return (
        <div className='h-1/2'>

    <Stepper orientation="vertical" sx={{'--stepper-color': 'yellow',}}>
      <Step
        indicator={
            <StepIndicator variant="solid" sx={{color:"yellow"}}>
            1
          </StepIndicator>
        }
        />

      <Step
        indicator={
            <StepIndicator variant="solid" color="success">
            2
          </StepIndicator>
        }
        />

      <Step
        indicator={
            <StepIndicator variant="solid" color="success">
            3
          </StepIndicator>
        }
        />
    </Stepper>
        </div>
  );
}

export default SignupStepper;
