import React from 'react';
import {
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Button,
} from '@mui/material';

const StocksTable = ({ companies, getGraphicData }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Обозначение</TableCell>
                        <TableCell>Название</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {companies.map((company) => (
                        <TableRow key={company.symbol}>
                            <TableCell>{company.name}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="error" onClick={() => getGraphicData()}>
                                    График
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default StocksTable;