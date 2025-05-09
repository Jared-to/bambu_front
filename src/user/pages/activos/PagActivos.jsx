import { Box, Tab, Tabs } from "@mui/material"
import { useState } from "react";
import { Perecederos } from "./components/perecederos/Perecederos";
import { NoPerecederos } from "./components/no-perecederos/NoPerecederos";


export const PagActivos = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Activos Perecederos" sx={{ textTransform: 'none' }} />
          <Tab label="Activos No Perecederos" sx={{ textTransform: 'none' }} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Perecederos />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <NoPerecederos />
      </CustomTabPanel>
    </Box>
  )
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
