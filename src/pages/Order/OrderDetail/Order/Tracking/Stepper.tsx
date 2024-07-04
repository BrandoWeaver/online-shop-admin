import React, { useEffect, useState } from 'react';

import Stepper from '@mui/material/Stepper';

interface Istep {
  status: string | undefined;
  orderTracking: any;
  date?: string;
  StepStatus?: string;
}

function StepperTracking(props: Istep) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (props.status === 'review') {
      setActiveStep(0);
    } else if (props.status === 'pending') {
      setActiveStep(1);
    } else if (props.status === 'confirmed') {
      setActiveStep(2);
    } else if (props.status === 'waiting_driver') {
      setActiveStep(3);
    } else if (props.status === 'delivering') {
      setActiveStep(4);
    } else {
      setActiveStep(5);
    }
  }, [props.status]);

  return <Stepper activeStep={activeStep} orientation='vertical'></Stepper>;
}
export default StepperTracking;
