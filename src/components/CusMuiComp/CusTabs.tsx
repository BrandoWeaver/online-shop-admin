import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs, { TabsProps } from '@mui/material/Tabs';
import Tab, { TabProps } from '@mui/material/Tab';

interface StyledTabsProps extends TabsProps {
  children?: React.ReactNode;
  value: number | string;
  onChange: (event: React.SyntheticEvent, newValue: number | string) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs variant='scrollable' scrollButtons={false} {...props} />
))(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledTab = styled((props: TabProps) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    minWidth: 160,
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightBold,
  })
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number | string;
  value: number | string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

export { StyledTabs, StyledTab, TabPanel };
