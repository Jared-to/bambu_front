import { useEffect, useState } from 'react';
import { Grid, Box, Paper, Tabs, Tab, } from '@mui/material';
import { useParams } from 'react-router-dom';

import { PaperInfo } from './components/PaperInfo';
import { TablaVentas } from './components/TablaVentas';
import { useCajaStore } from '../../../hooks/useCajaStore';
import { TablaGastos } from './components/TablaGastos';
import { useSaleStore } from '../../../hooks/useSaleStore';



export const PagCajaInfo = () => {
  //?Estados
  const { id } = useParams();
  const { getCaja, dischargePDF } = useCajaStore()
  const { getVenta } = useSaleStore()

  const [tabIndex, setTabIndex] = useState(0);
  const [caja, setCaja] = useState({});
  //?funciones
  //tabs
  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };
  //traer datos async
  const handleGetData = async (id) => {
    const data = await getCaja(id);
    setCaja(data);
  }

  const handleDischarPDF = async () => {
    await dischargePDF(id)
  }

  //efectos
  useEffect(() => {

    if (id) {
      handleGetData(id)
    }

  }, [id])


  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {/* Grid para información general */}
        <Grid item xs={12} md={3} lg={4}>
          <PaperInfo caja={caja} handleDischarPDF={handleDischarPDF} />
        </Grid>

        {/* Grid para el Tab */}
        <Grid item xs={12} md={9} lg={8}>
          <Box display={'flex'} justifyContent={'center'}>
            <Tabs value={tabIndex} onChange={handleTabChange} indicatorColor="primary" textColor="primary" >
              <Tab label="Ventas" />
              <Tab label="Gastos" />
            </Tabs>
          </Box>


          {/* Panel para Ventas */}
          <TabPanel value={tabIndex} index={0}>
            <TablaVentas data={caja.ventas} getVenta={getVenta} />
          </TabPanel>

          {/* Panel para Gastos */}
          <TabPanel value={tabIndex} index={1}>
            <TablaGastos data={caja.gastos} />
          </TabPanel>

        </Grid>
      </Grid>
    </Box>
  );
};

const TabPanel = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};