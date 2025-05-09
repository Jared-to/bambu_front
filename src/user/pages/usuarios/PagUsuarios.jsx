import { useEffect, useState } from "react";
import { Box, Divider, Pagination, Paper } from "@mui/material";

import { Head } from "../../components/Head.component";
import { Filter } from "../../components/Filter.component";
import { TablaUsuarios } from "./components/TablaUsuarios";
import { usePagination } from "../../../hooks/usePagination";
import { ModalUser } from "./components/ModalUser";
import { useUserStore } from "../../../hooks/useUserStore";


export const PagUsuarios = () => {
  //?Estados
  const { getUsers, createUser, getUser, updateUser, isStatus,deleteUser} = useUserStore()

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(undefined)
  const [modalUser, setModalUser] = useState(false);
  //hook
  const { handleChangePage, page, paginatedData, rowsPerPage, searchName, setSearchName, filteredEmployees } = usePagination(users, 'fullName', 7)

  //?funciones
  const handleOpenModal = async (id) => {

    if (id !== undefined) {
      const data = await getUser(id);
      setUser(data);
    }

    setModalUser(true)
  }
  const handleCloseModal = () => {
    setModalUser(false)
    setUser(undefined)
  }
  const handleGetUsers = async () => {
    const data = await getUsers();

    setUsers(data)
  }
  //efecto
  useEffect(() => {
    if (users.length === 0) {
      handleGetUsers()
    }
  }, [])

  return (
    <Box>
      <Head title={'Usuarios'} subtitle={'Gestion de Usuarios'} textButton={'Agregar Usuario'} handleFunctionButton={()=>handleOpenModal()} />
      <Paper
        sx={{
          p: 2,
          border: "1px solid #dbe0e6",
          borderRadius: 2,
        }}
        elevation={0}
      >
        <Filter message={'Total Usuarios'} totalMessage={users.length} nameSearch="Nombre" changeSearch={setSearchName} valueSearch={searchName} />
        <Divider sx={{ mt: 2 }} />
        <TablaUsuarios paginated={paginatedData} handleOpenModal={handleOpenModal} handleGetUsers={handleGetUsers} isStatus={isStatus} deleteUser={deleteUser}/>
      </Paper>
      <Box display={'flex'} justifyContent={'right'} mt={2}>
        <Pagination
          color="primary"
          count={Math.ceil(filteredEmployees.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
      <ModalUser open={modalUser} handleClose={handleCloseModal} createUser={createUser} handleGetData={handleGetUsers} user={user} updateUser={updateUser} />
    </Box>
  );
};