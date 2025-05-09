import { Box, Divider, Pagination, Paper } from "@mui/material"

import { Head } from "../../components/Head.component"
import { Filter } from "../../components/Filter.component"
import { usePagination } from "../../../hooks/usePagination";
import { TablaClients } from "./components/TablaClients";
import { ModalClient } from "./components/ModalClient";
import { useEffect, useState } from "react";
import { useClientesStore } from "../../../hooks/useClientesStore";


export const PagClientes = () => {
  //?Estados
  const { traerClientes, crearCliente, traerCliente, updateCliente, deleteCliente, dischargePDF } = useClientesStore()

  const [modalClient, setModalClient] = useState(false);
  const [client, setClient] = useState(undefined)
  const [clients, setclients] = useState([]);
  //hook
  const { handleChangePage, page, paginatedData, rowsPerPage, searchName, setSearchName, filteredEmployees } = usePagination(clients, 'nombre', 7)
  //?funciones
  const handleOpenModal = async (id) => {

    if (id !== undefined) {
      const data = await traerCliente(id);
      setClient(data);
    }

    setModalClient(true);
  }
  const handleCloseModal = () => {
    setModalClient(false);
    setClient(undefined);
  }
  //traer datos async
  const handleGetClientes = async () => {
    const data = await traerClientes();
    
    setclients(data);

  }
  //?efecto
  useEffect(() => {
    if (clients.length === 0) {
      handleGetClientes()
    }
  }, [])


  return (
    <Box>
      <Head title={'Clientes'} subtitle={'Gestion de Clientes'} textButton={'Agregar Cliente'} handleFunctionButton={() => handleOpenModal()} handleFuctionPDF={dischargePDF} />
      <Paper
        sx={{
          p: 2,
          border: "1px solid #dbe0e6",
          borderRadius: 2,
        }}
        elevation={0}
      >
        <Filter message={'Total Clientes'} totalMessage={clients.length} nameSearch=" el nombre" changeSearch={setSearchName} valueSearch={searchName} />
        <Divider sx={{ mt: 2 }} />
        <TablaClients paginated={paginatedData} handleOpenModal={handleOpenModal} deleteCliente={deleteCliente} handleGetData={handleGetClientes} />
      </Paper>
      <Box display={'flex'} justifyContent={'right'} mt={2}>
        <Pagination
          color="primary"
          count={Math.ceil(filteredEmployees.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
      <ModalClient open={modalClient} handleClose={handleCloseModal} createClient={crearCliente} updateClient={updateCliente} client={client} handleGetData={handleGetClientes} />
    </Box>
  )
}
