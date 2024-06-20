import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -5,
    top: -10,
    // border: `2px solid ${theme.palette.background.paper}`,
    // padding: '0 4px',
  },
}));

export { StyledBadge };
