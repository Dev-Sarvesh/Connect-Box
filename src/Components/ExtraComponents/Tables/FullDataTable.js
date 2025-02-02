import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { CardActionArea } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';
import Switch from '@mui/material/Switch';


const FullDataTable = ({ styles, label, columns, rows, keyField, pagination1, rowStyle }) => {

    // //  No Data Image
 


    const handleEdit = (row) => {
        // Handle edit action
        console.log('Edit row:', row);
    };

    const handleDelete = (row) => {
        // Handle delete action
        console.log('Delete row:', row);
    };




    return (
        <>
            <div style={{ height: '100%', width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    checkboxSelection
                />
            </div>
        </>
    );
}


export default FullDataTable
