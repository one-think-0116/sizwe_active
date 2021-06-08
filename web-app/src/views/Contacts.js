import React, { useState, useEffect, useContext } from 'react';
import MaterialTable from 'material-table';
import { useSelector, useDispatch } from "react-redux";
import CircularLoading from "../components/CircularLoading";
import { SketchPicker } from 'react-color';
import Button from '@material-ui/core/Button';

import {
  features,
  language
} from 'config';
import { FirebaseContext } from 'common';

let globalData = '';
let globalID = '';
let globalEmail = '';
export default function Contacts() {
  const { api } = useContext(FirebaseContext);
  const {
    updateContact,
    deleteContact
  } = api;
  const columns = [
    { title: language.firstName, field: 'firstName' },
    { title: language.lastName, field: 'lastName' },
    { title: language.email, field: 'email' },
    { title: "Check and answer", field: 'read' ,type:'boolean',},
    { title: "Date", field: 'createdAt' },
    { title: "Subject", field: 'subject' },
    { title: "Content", field: 'simpleContent' },
  ];
  const [data, setData] = useState([]);
  const contacts = useSelector(state => state.manageContact);
  const dispatch = useDispatch();
  useEffect(() => {
    if (contacts.contacts) {
        let contactData = contacts.contacts;
        let newData = Object.keys(contactData).map(
            (i) => {
                contactData[i].id = i;
                if(!contactData[i].hasOwnProperty('response'))
                    contactData[i].response = '';
                if(contactData[i].content.length > 20) contactData[i].simpleContent = contactData[i].content.substr(0,20) + ' ...';
                else contactData[i].simpleContent = contactData[i].content;
                return contactData[i]
            }
        )
      setData(newData);
    } else {
      setData([]);
    }
  }, [contacts.contacts]);
  const onsubmit = (e) => {
    let saveData = {response:globalData,read:true};
    dispatch(updateContact(globalID,saveData))
  }
  return (
    contacts.loading ? <CircularLoading /> :
    <MaterialTable
      title="Contacts"
      columns={columns}
      data={data}        
      options={{
        selection: true,
        rowStyle: rowData => ({
          backgroundColor: (rowData.read === true) ? '#8ccc94' : '#FFF'
        })
      }}
      actions={[
        {
          tooltip: 'Remove All Selected Users',
          icon: 'delete',
          onClick: (evt, data) => {window.confirm("Are you sure?") && dispatch(deleteContact(data))}
        }
      ]}
      
      detailPanel={rowData => {
        return (
            <div>
                <div style={{marginTop:30,display:"flex"}}>
                    <div style={{width:"50%",textAlign:"center"}}>
                        <div style={{display:"flex"}}>
                            <div style={{marginLeft:71}}>
                                <label style={{fontSize:25}}>Subject : </label>
                            </div>
                            <div style={{marginTop:4,marginLeft:20}}>
                                <label style={{fontSize:20,color:"Black"}}>{rowData.subject}</label>
                            </div>
                        </div>
                        <div style={{display:"flex"}}>
                            <div style={{marginLeft:66}}>
                                <label style={{fontSize:25}}>Content : </label>
                            </div>
                            <div style={{marginTop:4,marginLeft:20,}}>
                                <textarea defaultValue={rowData.content} rows={5} cols={50} disabled style={{fontSize:15,color:"black"}}></textarea>
                            </div>
                        </div>
                    </div>
                    <div style={{width:"50%",textAlign:"center"}}>
                        <div style={{display:"flex"}}>
                            <div style={{marginLeft:106}}>
                                <label style={{fontSize:25}}>To :</label>
                            </div>
                            <div style={{marginTop:4,marginLeft:20}}>
                                <label style={{fontSize:20,color:"Black"}}>{rowData.email}</label>
                            </div>
                        </div>
                        <div style={{display:"flex"}}>
                            <div style={{marginLeft:23}}>
                                <label style={{fontSize:25}}>Response : </label>
                            </div>
                            <div style={{marginTop:4,marginLeft:20,}}>
                                <textarea defaultValue={rowData.response} onChange={e => {globalData = e.target.value;globalID=rowData.id;globalEmail=rowData.email}} rows={5} cols={50} style={{fontSize:15,color:"black"}}></textarea>
                            </div>
                        </div>
                        <div style={{textAlign:"center"}}>
                            <Button variant="contained" id={rowData.id} color="primary" onClick={onsubmit}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
      }}
      onRowClick={(event, rowData, togglePanel) => {togglePanel();globalData = rowData.response;globalID = rowData.id;globalEmail=rowData.email}}
    />
  )
}
