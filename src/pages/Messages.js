import React, { useRef, useState,useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import MyNavbar from "../reusableComponents/Navbar";
import Title from "../reusableComponents/Title";
import SearchBar from "../components/SearchBar";
import Footer from "../reusableComponents/Footer";
import { useFirebase } from "../context/firebase";
import LoaderDark from "../reusableComponents/LoaderDark";
import MessageComponent from "../components/MessageComponent";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import './styles/Messages.css'
import { GREY } from "../values/Colors";
import { Space, Switch, Table,Input } from 'antd';
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
  const [rerenderer, setrerenderer] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8,}} onKeyDown={(e) => e.stopPropagation()}>
        <Input ref={searchInput} placeholder={`Search ${dataIndex}`} value={selectedKeys[0]} onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])} onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)} style={{marginBottom: 8,display: 'block',}}/>
        <Space>
          <Button type="primary" onClick={() => handleSearch(selectedKeys, confirm, dataIndex)} icon={<SearchOutlined />} size="small" style={{   width: 90, }}>Search</Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{   width: 90, }}>Reset</Button>
          <Button type="link" size="small" onClick={() => {confirm({closeDropdown: false,});   setSearchText(selectedKeys[0]);   setSearchedColumn(dataIndex); }}>Filter</Button>
          <Button type="link" size="small" onClick={() => {close()}}>close</Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => ( <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined,}}/>
    ),
    onFilter: (value, record) =>record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter highlightStyle={{backgroundColor: '#ffc069',padding: 0,}} searchWords={[searchText]} autoEscape textToHighlight={text ? text.toString() : ''}/>
      ) : (text),
  });
  
  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
    setFilteredInfo(filters);
  };
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
  }, [rerenderer]);
  const toggleRerender = (data) => {
    const updatedMessages = Messages.filter((message) => message.id !== data.id);
    setMessages(updatedMessages);
  };
  const statusHandler = async (status, id) => {
    console.log('statusHandler')
    if (status === "viewed") {
      await firebase.markMessageAsNew(id);
    } else {
      await firebase.markMessageAsViewed(id);
    }
  
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === id ? { ...message, hidden: true } : message
      )
    );
  };
  
  
  const columnsBelowLg = [ 
    {title: 'Description', dataIndex: 'Description', key: 'Description', width: '50%',
      ...getColumnSearchProps('Description'),
      render: (text, record) => <span>{text.slice(0, 100)}{text.length > 100 && "..."}</span>     
    },
    {title : 'TimeStamp' , dataIndex : 'TimeStamp' , key : 'TimeStamp' ,width:"20%" ,
      sorter: (a, b) => !(a.TimeStamp - b.TimeStamp),
      sortOrder: sortedInfo.columnKey === 'TimeStamp' ? sortedInfo.order : null,
      ellipsis: true,} ,
    {title : 'Actions' , dataIndex : '' , key : 'action' ,width:"10%",
      render: (record) => <span><i className="fa-solid me-2 fa-marker contactUs-font" onClick={() => statusHandler(record.Status, record.id)} /></span>
    },
  ] ;

 const columnsAboveLg = [ 
  {title : 'Name' , dataIndex : 'Name' , key : 'Name' ,width:"10%" ,
      sorter: (a, b) => a.Name.length - b.Name.length,
      sortOrder: sortedInfo.columnKey === 'Name' ? sortedInfo.order : null,
      ellipsis: true,
      sortDirections: ['descend', 'ascend'],...getColumnSearchProps('Name')},
  
  {title : 'ContactNo' , dataIndex : 'ContactNo' , key : 'ContactNo' ,width:"10%",...getColumnSearchProps('ContactNo') } ,
  {title: 'Description', dataIndex: 'Description', key: 'Description', width: '40%',
      ...getColumnSearchProps('Description'),
      render: (text, record) => <span>{text.slice(0, 100)}{text.length > 100 && "..."}</span>
  },
  {title : 'TimeStamp' , dataIndex : 'TimeStamp' , key : 'TimeStamp' ,width:"20%" ,
    sorter: (a, b) => !(a.TimeStamp - b.TimeStamp),
    sortOrder: sortedInfo.columnKey === 'TimeStamp' ? sortedInfo.order : null,
    ellipsis: true,
    sortDirections: ['descend', 'ascend'],} ,
  {title : 'Actions' , dataIndex : '' , key : 'action' ,width:"10%",
    render: (record) => <span><i className="fa-solid me-2 fa-marker contactUs-font" onClick={() => statusHandler(record.Status, record.id)} /> </span>
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
              ) : (<>
                <Table
                  columns={showAfterLG ? columnsAboveLg : columnsBelowLg}
                  expandable={{
                    expandedRowRender: (record) => (
                      <MessageComponent data={record} rerender={toggleRerender}></MessageComponent>
                    ),
                    rowExpandable: (record) => record.name !== 'Not Expandable',
                  }}
                  dataSource={Messages}
                  rowClassName={(record) => record.hidden ? 'd-none' : ''}
                  onChange={handleChange}
                /></>
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
