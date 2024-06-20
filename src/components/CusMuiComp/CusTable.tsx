import { Fragment, ReactNode, memo } from 'react';

import { SxProps, Theme } from '@mui/material';
import Table, { TableProps } from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export interface IColumn {
  key: string;
  label: string | ReactNode;
  minWidth?: number;
  align?: 'right' | 'center' | 'left' | 'inherit' | 'justify';
  headCellSx?: SxProps<Theme>;
  cellSx?: SxProps<Theme>;
  cellProps?: TableCellProps;
  format?: (value: any, row: any, index: number) => string | React.ReactNode;
}

function CusTable({
  rows,
  columns,
  tableContainerSx,
  tableSx,
  bodyRowSx,
  hover = false,
  hideHeader = false,
  tableProps,
}: {
  rows: any[];
  columns: readonly IColumn[];
  tableContainerSx?: SxProps<Theme>;
  tableSx?: SxProps<Theme>;
  bodyRowSx?: SxProps<Theme>;
  hover?: boolean;
  hideHeader?: boolean;
  tableProps?: TableProps;
}) {
  // console.log('CusTable');
  return (
    <TableContainer sx={{ ...tableContainerSx }}>
      <Table stickyHeader sx={{ mb: 8, ...tableSx }} {...tableProps}>
        {!hideHeader && (
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  align={column.align}
                  sx={{
                    bgcolor: 'grey.200',
                    fontWeight: 600,
                    color: 'text.secondary',
                    minWidth: column.minWidth,
                    ...column.headCellSx,
                  }}
                  {...column.cellProps}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {rows.map((row, i) => {
            return (
              <Fragment key={i}>
                <TableRow
                  hover={hover}
                  role='checkbox'
                  tabIndex={-1}
                  sx={{
                    ...bodyRowSx,
                  }}
                >
                  {columns.map((column) => {
                    let value = row?.[column.key];

                    if (!value && column.key.includes('.')) {
                      const keys = column.key.split('.');
                      let nestedObj: any;
                      keys.map((key) => {
                        if (!nestedObj) {
                          nestedObj = row?.[key];
                        } else {
                          value = nestedObj?.[key];
                        }
                        return key;
                      });
                    }

                    return (
                      <TableCell
                        key={column.key}
                        align={column.align}
                        sx={{
                          bgcolor: 'common.white',
                          color: 'text.secondary',
                          minWidth: column.minWidth,
                          ...column.cellSx,
                        }}
                        {...column.cellProps}
                      >
                        {column.format ? column.format(value, row, i) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
                {row.renderRow}
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default memo(CusTable);
