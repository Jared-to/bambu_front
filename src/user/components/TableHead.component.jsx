import { TableCell, TableHead, TableRow } from '@mui/material';



const styleTableCellHead =
{
  fontWeight: 'bold', backgroundColor: 'white', color: 'Black', fontFamily: 'Nunito'
}

export const TableHeadComponent = ({ columns }) => {


  return (
    <TableHead>
      <TableRow sx={{ borderRadius: '8px' }}>
        {columns.map((columnName, index) => (
          <TableCell
            key={index}
            sx={{
              ...styleTableCellHead,
              borderRadius: index === 0 ? '15px 0 0 0' : '0',
            }}
            align="center"
          >
            {columnName}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};


