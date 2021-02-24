
  import React,{useState,useEffect} from 'react';
  import { render } from 'react-dom';
  import 'carbon-components/css/carbon-components.min.css';
  import {
    Delete16 as Delete,
    Save16 as Save,
    Download16 as Download,
  } from '@carbon/icons-react';
  import { Table,
    DataTable,
    TableBatchAction,
    TableBatchActions,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableHeader,
    TableRow,
    TableSelectAll,
    TableSelectRow,
    TableToolbar,
    TableToolbarAction,
    TableToolbarContent,
    TableToolbarSearch,
    TableToolbarMenu, } from 'carbon-components-react';
import styled from 'styled-components'

const InputWrapper = styled.td`
  input{
    width:100%;
}

`
  const Carbon = () =>{
   const [rowdata,updatedRowData] =useState([]);

   /* table headers*/
   const [headerData]=useState([
    {
      key: 'name',
      header: 'Name',
    },
    {
      key: 'email',
      header: 'Email',
    },
    {
      key: 'body',
      header: 'Description',
    },
  ])

   const [dataid,updatedid] =useState([]);
   const [edit,updateedit] =useState(false);
   const [name,updatedname] =useState([]);
   console.log("updatedRowData",rowdata)
   const nameChangehandler =(e,name)=>{
    updatedname(e.target.value)
    console.log(name)
   }

  /* fetching table data from api */
   useEffect(() => {
     fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
     .then(response => response.json())
     .then(json => updatedRowData(json))
   }, [])

   /* row deletion */
   useEffect(() => {
       console.log(dataid.length)
      const fv =  dataid.length>0 && rowdata.filter(data=>!dataid.includes(data.id))
      console.log('fv', fv)
      dataid.length && updatedRowData(fv)
   }, [dataid])


   /* fetching id of selected rows*/
    const batchActionClick=(selecteddata)=>{
        const dataId =  selecteddata.map(data =>data.id)
        updatedid(dataId);
    }
  /* enabling editing */
      const batchActionClick1=(selecteddata)=>{
        updateedit(true);
      console.log("selecteddata",selecteddata)
    }

  /* disabling editing */
    const savedata=(selecteddata)=>{
      updateedit(false);
    console.log("edit",edit)
  }

  const setRowData =(a)=>{
    console.log('hhh',a)
  }
      return (
      
        <DataTable rows={rowdata} headers={headerData}>
        {({   rows,
            headers,
            getHeaderProps,
            getRowProps,
            getSelectionProps,
            getToolbarProps,
            getBatchActionProps,
            onInputChange,
            selectedRows,
            getTableProps,
            getTableContainerProps, }) => (
              <TableContainer
              title="DataTable"
              description="With batch actions"
              {...getTableContainerProps()}>
              <TableToolbar {...getToolbarProps()}>
                <TableBatchActions {...getBatchActionProps()}>
                  <TableBatchAction
                    tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
                    renderIcon={Delete}
                    onClick={()=>batchActionClick(selectedRows)}>
                    Delete
                  </TableBatchAction>
                  <TableBatchAction
                    tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
                    renderIcon={Save}
                    onClick={()=>batchActionClick1(selectedRows)}>
                   
                    Edit
                  </TableBatchAction>
                  <TableBatchAction
                    tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
                    renderIcon={Save}
                    onClick={()=>savedata(selectedRows)}>
                    Save
                  </TableBatchAction>
                  <TableBatchAction
                    tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
                    renderIcon={Download}
                    onClick={()=>savedata(selectedRows)}>
                    
                    Download
                  </TableBatchAction>
                </TableBatchActions>
                <TableToolbarContent>
                  <TableToolbarSearch
                    defaultExpanded
                    tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                    onChange={onInputChange}
                  />
                  <TableToolbarMenu
                    tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}>
                    <TableToolbarAction onClick={() => alert('Alert 1')}>
                      Action 1
                    </TableToolbarAction>
                    <TableToolbarAction onClick={() => alert('Alert 2')}>
                      Action 2
                    </TableToolbarAction>
                    <TableToolbarAction onClick={() => alert('Alert 3')}>
                      Action 3
                    </TableToolbarAction>
                  </TableToolbarMenu>
                </TableToolbarContent>
              </TableToolbar>
              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    <TableSelectAll {...getSelectionProps()} />
                    {headers.map((header, i) => (
                      <TableHeader key={i} {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, i) => (
                    <TableRow key={i} {...getRowProps({ row })}>
                      <TableSelectRow {...getSelectionProps({ row , onClick: () => setRowData(row),})} />
                      {console.log("row.cells",row.cells)}
                      {row.cells.map((cell) =>  row.isSelected == false ? (
                        <TableCell  editable ="true" key={cell.id}>{cell.value}</TableCell>) :
                    edit == true ? <InputWrapper><input type ='text' name ={cell.value} onChange = {(e,name)=>nameChangehandler(e,cell.value)} value ={cell.value} /></InputWrapper>
                    :  <TableCell  editable ="true" key={cell.id}>{cell.value}</TableCell>  
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        )}
      </DataTable>
        );
  } 

 
export default Carbon;