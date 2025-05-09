import { useEffect, useState } from "react"
import { Box, Grid } from "@mui/material"
import { useParams } from "react-router-dom"

import { PaperInfoCuotas } from "./components/PaperInfoCuotas"
import { TablaCuotas } from "./components/TablaCuotas"
import { useCuotasStore } from "../../../hooks/useCuotasStore"
import { ModalCuota } from "./components/ModalCuota"


export const PagCuotasVenta = () => {
  //?estados
  const { id } = useParams();
  const { getCuotas, nuevaCuota } = useCuotasStore();
  const [cuotas, setCuotas] = useState({pagos:[]});
  const [modalCuota, setModalCuota] = useState({ on: false, data: undefined });
  //?Funciones
  //traer info
  const handleGetData = async (id) => {
    const data = await getCuotas(id);
    setCuotas(data)
  }
  //modal cuota
  const handleOpenModal = async (id) => {
    if (!id) {
      setModalCuota({ on: true, data: undefined })
    }
  }
  const handleCloseModal = async () => {
    setModalCuota({ on: false, data: undefined })

  }

  //efecto
  useEffect(() => {
    if (id) {
      handleGetData(id)
    }
  }, [])

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item md={3}>
          <PaperInfoCuotas info={cuotas} handleOpenModal={handleOpenModal} />
        </Grid>
        <Grid item md={9}>
          <TablaCuotas cuotas={cuotas.pagos} />
        </Grid>
      </Grid>
      <ModalCuota open={modalCuota.on} handleClose={handleCloseModal} handleGetData={handleGetData} id={id} nuevaCuota={nuevaCuota} />
    </Box>
  )
}
