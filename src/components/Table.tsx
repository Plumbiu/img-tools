import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid'
import type { FC } from 'react'

const columns: GridColDef[] = [
  { field: 'id', headerName: '序号', width: 180 },
  {
    field: 'name',
    headerName: '图片名称',
    flex: 1,
  },
  {
    field: 'size',
    headerName: '原始大小',
    width: 360,
  },
  {
    field: 'zipedSize',
    headerName: '压缩大小',
    type: 'number',
    width: 360,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'rate',
    headerName: '减少',
    width: 360,
  },
]

interface Props {
  rows: WebpFile[]
  rowClick?: GridEventListener<'rowClick'>
}

const Table: FC<Props> = ({ rows, rowClick }) => {
  return (
    <DataGrid
      columns={columns}
      disableColumnSelector
      disableRowSelectionOnClick
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      onRowClick={rowClick}
      rows={rows}
      sx={{
        my: 2,
      }}
    />
  )
}

export default Table
