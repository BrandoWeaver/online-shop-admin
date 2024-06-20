import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';

interface Istep {
  status: string | undefined;
  orderTracking: Iorder.OrderTracking[] | undefined;
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

  const stepper = (review: string, date: string, url: string) => {
    return (
      <>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'baseline',
          }}
        >
          {url !== null && (
            <Typography
              sx={{
                fontSize: {
                  xs: 'body2.fontSize',
                  md: 'body1.fontSize',
                },
              }}
            >
              Tracking URL:
            </Typography>
          )}
          {url !== null && (
            <Link to={`${url}`} target='blank'>
              {url}
            </Link>
          )}
          <Typography
            sx={{
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },
            }}
          >{`${
            review === 'review'
              ? 'Review'
              : review === 'pending'
              ? 'Pending'
              : review === 'confirmed'
              ? 'Confirmed'
              : review === 'waiting_driver'
              ? 'Waiting_driver'
              : review === 'delivering'
              ? 'Delivering'
              : props.status === 'completed'
              ? 'Completed'
              : props.status === 'on_hold' || 'false'
              ? 'On_hold'
              : props.status === 'cancelled'
              ? 'Cancelled'
              : props.status === 'pre_cancelled' && 'Pre_cancelled'
          }`}</Typography>
          <Typography
            sx={{
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },
              color: 'text.secondary',
            }}
          >
            {moment(date).format('MMM DD, hh:mm A')}
          </Typography>
        </Box>
      </>
    );
  };
  return (
    <Stepper activeStep={activeStep} orientation='vertical'>
      {props.orderTracking?.map((el) => {
        return (
          <Step key={el.id}>
            <StepLabel>{stepper(el.status, el.createdAt, el.url)}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
}
export default StepperTracking;
