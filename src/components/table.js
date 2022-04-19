import React, {Fragment} from "react";
import styled from 'styled-components'
import { Row, Col, Button, OverlayTrigger, Tooltip, Form, ButtonToolbar, ButtonGroup} from 'react-bootstrap';
import { useTable, useSortBy, usePagination, useBlockLayout, useResizeColumns, useRowSelect } from "react-table";
// import { reduceHooks } from "react-table/dist/react-table.development";

const Styles = styled.div`
    /* This is required to make the table full-width */
    display: block;
    max-width: 100%;

    /* This will make the table scrollable when it gets too small */
    .tableWrap {
        display: block;
        max-width: 100%;
        overflow-x: scroll;
        overflow-y: hidden;
    }

    table {
        /* Make sure the inner table is always as wide as needed */
        width: 100%;
        font-size: 13px;

        tr {
            text-align: center;
            padding: 0.4rem;
            height: fit-content;
            :nth-child(even){
                background-color: #f7f7f7;
            }
            :hover {
                background-color: rgba(221, 221, 221, 0.603);
                border-bottom: rgba(221, 221, 221, 0.603);
            }
        }

        th{
            border-bottom: 1px solid #bbb9b9;
            padding: .2rem;
            width: fit-content;
        },
        td {
            margin: 0;

            /* The secret sauce */
            /* Each cell should grow equally */
            width: 1%;
            /* But "collapsed" cells should be as small as possible */
            &.collapse {
                width: 0.0000000001%;
            }
            }
    }
    `

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef

    React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
        <>
            <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
        )
    }
)

const TableContainer = ({columns, data, onRowSelectStateChange}) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        // rows, -> we change 'rows' to 'page'
        page,
        prepareRow,
        // below new props related to 'usePagination' hook
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize, selectedRowIds }
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0, 
                        pageSize: 20,
                        sortBy: [
                        {
                            id: 'positive_risk',
                            desc: true
                        }
                        ]
                    }
    },
        useSortBy,
        usePagination,
        useBlockLayout,
        useResizeColumns,
        useRowSelect,
        hooks => {
        hooks.visibleColumns.push(columns => [
            {
            id: 'selection',
            width: 40,
            tipText: 'Select rows to download',
            Header: ({ getToggleAllRowsSelectedProps }) => (
                <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()}/>
                </div>
            ),
            Cell: ({ row }) => (
                <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()}/>
                </div>
            ),
            },
            ...columns,
        ])
        }
    );

    const onChangeInSelect = event => {
        setPageSize(Number(event.target.value))
    }
    
    React.useEffect(() => onRowSelectStateChange?.(selectedRowIds), [
        onRowSelectStateChange,
        selectedRowIds
    ]);

    // const onChangeInInput = event => {
    //   const page = event.target.value ? Number(event.target.value) - 1 : 0
    //   gotoPage(page)
    // }

    const generateSortingIndicator = (column) => {
        return column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : '';
    };
    /* 
        Render the UI for your table
        - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
    */
    return (
        <Fragment>
        <Styles>
        <Row>
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        //className='tooltip'
                        <OverlayTrigger  
                            placement='top' 
                            overlay={
                            <Tooltip id={`tooltip-${column.Header}`}>
                                    {column.tipText}
                            </Tooltip>
                        }> 
                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                            {column.render("Header")}    
                            {generateSortingIndicator(column)}
                        </th>
                        </OverlayTrigger>
                        
                        
                    ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                    prepareRow(row);
                    return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                        })}
                    </tr>
                    );
                })}
                </tbody>
            </table>
        </Row>
        <br/>
        <>
            <Row className='justify-content-md-center'>
                <Col xs lg="2"/>
                <Col md='auto'>
                    <ButtonToolbar>
                        <ButtonGroup size='sm' className='padding'>
                            <Button as="input" className='custom' variant="outline" onClick={() => gotoPage(0)} defaultValue = "<<" disabled={!canPreviousPage}></Button>
                            <Button as="input" className='custom' variant="outline" onClick={previousPage} defaultValue = "<" disabled={!canPreviousPage}/>
                        </ButtonGroup>
                    
                        <div className='padding'>Page <strong>{pageIndex + 1} of {pageOptions.length}</strong> {' '}</div>
                        
                        <ButtonGroup size='sm' className='padding'> 
                            <Button as='input' className='custom' variant="outline" onClick={nextPage} defaultValue = '>' disabled={!canNextPage}/> {' '}
                            <Button as='input' className='custom' variant="outline" onClick={() => gotoPage(pageCount - 1)} defaultValue='>>' disabled={!canNextPage}/>{' '}
                        </ButtonGroup>
                    </ButtonToolbar>
                </Col>
                <Col xs lg="2"/>
            </Row>

            <Row className='justify-content-md-center'>
                <Col xs lg="2"/>
                <Col md='auto'>
                    <Form.Select value={pageSize} onChange={onChangeInSelect}>
                        
                        {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                        ))}
                    </Form.Select>
                </Col>
                <Col xs lg="2"/>
            </Row>
        
        </>
        </Styles>
        </Fragment>
    );
}

export default TableContainer;