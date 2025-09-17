import React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step, { stepClasses } from '@mui/joy/Step';
import StepIndicator from '@mui/joy/StepIndicator';
import { Check } from 'lucide-react';
import Image from 'next/image';
import gift from '@/assets/png/gift.gif';
function SignupStepper() {
  return (
    <div className="">
      <Stepper
        orientation="vertical"
        sx={{
          '--stepper-color': 'yellow',
          '--Step-connectorThickness': '4px',
          '--Step-connectorInset': '2px',
          '--Stepper-verticalGap': '54px',
          '--StepIndicator-size': '55px',
        [`& .${stepClasses.completed}::after`]: {
          bgcolor: 'yellow',
        }}}
      >
        <Step
          completed
          sx={{ 'color': 'yellow' }}
          indicator={
            <StepIndicator
              variant="solid"
              sx={{
                'color': 'white',
                '--StepIndicator-size': '35px',
                background: 'yellow',
              }}
            >
              <Check />
            </StepIndicator>
          }
        />

        <Step
          indicator={
            <StepIndicator
              variant="solid"
              sx={{ '--StepIndicator-size': '35px' }}
              color="neutral"
            >
              2
            </StepIndicator>
          }
        />

        <Step
          indicator={
            <StepIndicator variant="plain">
              <Image src={gift} alt="gift" width={200} height={200} />
            </StepIndicator>
          }
        />
      </Stepper>
    </div>
  );
}

export default SignupStepper;
