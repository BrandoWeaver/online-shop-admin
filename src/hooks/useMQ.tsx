/* eslint-disable react-hooks/rules-of-hooks */
import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function useMQ() {
  const theme = useTheme();
  let isMobile = false;
  let isSmDown = false;
  const SSR = typeof window === 'undefined';
  if (!SSR) {
    isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  }

  return { isMobile, isSmDown };
}
