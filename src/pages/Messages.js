import React, { useEffect } from "react";
import MyNavbar from "../reusableComponents/Navbar";
import Title from "../reusableComponents/Title";
import SearchBar from "../components/SearchBar";
import Footer from "../reusableComponents/Footer";
import { useFirebase } from "../context/firebase";
import { useState } from "react";
import LoaderDark from "../reusableComponents/LoaderDark";
import MessageComponent from "../components/MessageComponent";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import './styles/Messages.css'
import { GREY } from "../values/Colors";
import { Space, Switch, Table } from 'antd';
import { Button, Popconfirm,message  } from 'antd';
import { CONVERT_TIMESTAMP_TO_DATE_TIME } from "../utils/genericFunctions";
const Messages = ({ category }) => {
  const navigate=useNavigate();
  const [showAfterLG, setshowAfterLG] = useState(window.innerWidth >= 992);
  const firebase = useFirebase();
  const [Messages, setMessages] = useState(null);
  const [LoaderState, setLoaderState] = useState(true);
  const [showAfterMD, setshowAfterMD] = useState(window.innerWidth >= 576);
  const [checkStrictly, setCheckStrictly] = useState(false);
 
  const dataSource = [] ;
  useEffect(() => {
    const fetch = async () => {
      setLoaderState(true);
      let messages=[]
      if (category == "New") {
        messages = await firebase.getNewMessages();
      } else {
         messages = await firebase.getViewedMessages();
      }
      messages.sort((a, b) => b.TimeStamp - a.TimeStamp);
      messages.map((message,key)=>{dataSource.push({key:key,ContactNo:message.ContactNo,
        Description:message.Description,
        Email:message.Email,
        Name:message.Name,
        Status:message.Status,
        TimeStamp:CONVERT_TIMESTAMP_TO_DATE_TIME(message.TimeStamp),
        id:message.id,})})
      setMessages(dataSource);
      setLoaderState(false);
    };
    fetch();
  }, [category]);
  
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setshowAfterMD(true);
        if (window.innerWidth >= 1200) {
          setshowAfterLG(true);
        } else {
          setshowAfterLG(false);
        }
      } else {
        setshowAfterMD(false);
      }
     
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const statusHandler = async (status, id) => {
    console.log('statusHandler')
    if (status === "viewed") {
      await firebase.markMessageAsNew(id);
    } else {
      await firebase.markMessageAsViewed(id);
    }
  
    // Set the 'hidden' property for the specific row
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === id ? { ...message, hidden: true } : message
      )
    );
  };
  
  const columnsBelowLg = [ 
    {title: 'Description', dataIndex: 'Description', key: 'Description', width: '40%',
      render: (text, record) => (
        <span>{text.slice(0, 100)}{text.length > 100 && "..."}</span>
      ),
    },
    {title : 'Email' , dataIndex : 'Email' , key : 'Email' ,width:"20%"} ,
    {title : 'Actions' , dataIndex : '' , key : 'action' ,width:"10%",
    render: (record) => (
      <span>
        <i className="fa-solid me-2 fa-marker contactUs-font" onClick={() => statusHandler(record.Status, record.id)} />
      </span>
    ),
  },
  ] ;

 const columnsAboveLg = [ 
  {title : 'Name' , dataIndex : 'Name' , key : 'Name' ,width:"10%" } ,
  {title : 'ContactNo' , dataIndex : 'ContactNo' , key : 'ContactNo' ,width:"10%" } ,
  {title: 'Description', dataIndex: 'Description', key: 'Description', width: '40%',
  render: (text, record) => (
    <span>{text.slice(0, 100)}{text.length > 100 && "..."}</span>
  ),
},
  {title : 'Email' , dataIndex : 'Email' , key : 'Email' ,width:"10%" } ,
  {title : 'TimeStamp' , dataIndex : 'TimeStamp' , key : 'TimeStamp' ,width:"10%" } ,
  {title : 'Actions' , dataIndex : '' , key : 'action' ,width:"10%",
    render: (record) => (
      <span>
        <i className="fa-solid me-2 fa-marker contactUs-font" onClick={() => statusHandler(record.Status, record.id)} />
      </span>
    ),
  },
];


  return (
    <div style={{ backgroundColor: "#efefef" }}>
      <MyNavbar status={true} />
      <Title name={`${category} Messages`} />
      <div className="row m-0">
        <div className="col-12">
          <div className="row m-0 mb-2">
            <div className="col-12 text-end">
              <a className={`me-3 navbtn ${category=='New'?'navbtn-active':''}`} onClick={()=>navigate('/messages/new')}>New</a>
              <a className={`navbtn ${category=='Viewed'?'navbtn-active':''}`} onClick={()=>navigate('/messages/viewed')}>Viewed</a>
            </div>
          </div>
          <div className="row m-0 justify-content-center">
            <div className="col-12"  style={{minHeight:"500px"}}>
              {LoaderState ? (
                <LoaderDark></LoaderDark>
              ) : (
                <Table
                  columns={showAfterLG ? columnsAboveLg : columnsBelowLg}
                  expandable={{
                    expandedRowRender: (record) => (
                      <MessageComponent data={record}></MessageComponent>
                    ),
                    rowExpandable: (record) => record.name !== 'Not Expandable',
                  }}
                  dataSource={Messages}
                  rowClassName={(record) => record.hidden ? 'd-none' : ''}
                />
                
             
                // <Table responsive="lg" hover >
                //   <thead>
                //     <tr className="message-table-header">
                //       <th>#</th>
                //       <th colSpan="2">Description</th>
                //       <th className={`${!showAfterLG ? "d-none" : ""}`}>Name</th>
                //       <th>Email</th>
                //       <th className={`${!showAfterLG ? "d-none" : ""}`}>Contact</th>
                //       <th className={`${!showAfterLG ? "d-none" : ""}`}>Date</th>
                //       <th className="text-center">Actions</th>
                //     </tr>
                //   </thead>
                //   <tbody className="contactUs-body">
                //   {Messages.map((message, index) => (
                //     <MessageComponent
                //       data={message}
                //       key={index}
                //       index={index}
                //     ></MessageComponent>
                //   ))}
                //   </tbody>
                // </Table>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Messages;
