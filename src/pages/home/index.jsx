import React, { useEffect, useState } from 'react';
import './home.css';
import axios from 'axios';
import '@blueprintjs/core/lib/css/blueprint.css';
import { Overlay, Classes } from '@blueprintjs/core';
import editIcon from '../../assets/user-edit-text-message-note_2023-03-09/user-edit-text-message-note.png';
import deleteIcon from '../../assets/trash-delete-recycle-bin-bucket-waste_2023-03-09/trash-delete-recycle-bin-bucket-waste@3x.png';
import searchIconDark from '../../assets/icon-search-dark_2023-03-09/icon-search-dark@3x.png';
import searchIconLight from '../../assets/icon-search-dark_2023-03-09/icon-search-dark@2x.png';
import AllInstances from '../../components/allInstances/allInstances';
import AddEditFieldForm from '../../components/addFieldForm/addFieldForm';
import EditFieldForm from '../../components/editFieldForm/editFieldForm';

export default function Home() {

  // const [currentField, setCurrentField] = useState('');
  const [callUseEffectHook, setCallUseEffectHook] = useState(true);
  const [isAddEditFieldOverlay, setIsAddEditFieldOverlay] = useState(false);
  const [isAllInstancePage, setIsAllInstancePage] = useState(false);
  const [currentAllInstanceContentData, setCurrentAllInstanceContentData] = React.useState();

  const [allContentNames, setAllContentName] = useState([]);
  const [allContentNamesMiddleSection, setAllContentNameMiddleSection] = useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [newContentData, setNewContentData] = React.useState({
    contentName: '',
    contentSchema: {}
  });
  const [currentClickedContent, setCurrentClickedContent] = useState({
    id: 0,
    contentName: '',
    contentSchema: {}
  });

  const [currentField, setcurrentField] = useState(
    {
      id: currentClickedContent.id,
      oldField: '',
      newField: ''
    }
  );

  // const dummyhandle = async () => {
  //   console.log('SHIT', localStorage.getItem('token'));
  //   var data = JSON.stringify({
  //     'name': 'kamal----',
  //     'age': 22,
  //     'role': 'ceo'
  //   });
  //   const response = await axios.post(
  //     'http://localhost:4000/user',
  //     { data },
  //     {
  //       headers: { 'token': localStorage.getItem('token') }
  //     }
  //   );

  // var config = {
  //   method: 'post',
  //   maxBodyLength: Infinity,
  //   url: 'http://localhost:4000/user',
  //   headers: { 
  //     'token': localStorage.getItem('token')
  //   },
  //   data : data
  // };

  //   console.log('RESRESRES', response);
  // };

  const fetchAllContentTypes = async () => {
    const response = await axios.get('http://localhost:4000/all/contenttype');
    setAllContentName(response.data.message);
    setAllContentNameMiddleSection(response.data.message);
  };
  useEffect(() => {
    fetchAllContentTypes();
  }, [callUseEffectHook]);

  const changeToAllInstance = (contentData) => {
    setIsAllInstancePage(true);
    setCurrentAllInstanceContentData(contentData);
  };

  const handleClickContentBuilder = () => {
    setIsAllInstancePage(false);
  };

  const renderContentName = allContentNames.map(eachContentData => {
    return (<li onClick={() => changeToAllInstance(eachContentData)} className='content-name-text' key={eachContentData.id} >{eachContentData.contentName}</li>);
  });
  const renderMiddleSectionContentName = allContentNamesMiddleSection.map(eachContentData => {
    return (<li onClick={() => handleCurrentContentClick(eachContentData)} className='content-name-text' key={eachContentData.id} >{eachContentData.contentName}</li>);
  });

  const handleCurrentContentClick = async (contentData) => {
    const response = await axios.get(`http://localhost:4000/data/content/${contentData.contentName}`);
    setCurrentClickedContent(response.data.message);
  };

  const handleCreateNewContentClick = () => {
    setIsOpen(true);
  };

  const handleContentNameChange = (event) => {
    setNewContentData(previousData => ({
      ...previousData,
      contentName: event.target.value
    }));
  };

  const handleClickCancel = () => {
    setNewContentData({
      contentName: '',
      contentSchema: {}
    });
    setIsOpen(false);
  };

  const handleClickCreate = async () => {
    setIsOpen(false);
    //post the content
    const respose = await axios.post('http://localhost:4000/create/contenttype', {
      contentName: newContentData.contentName,
      contentSchema: {}
    });
    console.log('RESPOPO: ', respose);
    setAllContentNameMiddleSection(data => ([
      newContentData,
      ...data
    ]));
  };

  const handleClickCardDelete = async (fieldD) => {
    await axios.put('http://localhost:4000/upadte/contenttype/schema/delete', {
      contentId: currentClickedContent.id,
      field: fieldD
    });
    const result = await axios.get(`http://localhost:4000/data/content/${currentClickedContent.contentName}`);
    setCurrentClickedContent(result.data.message);
    setCallUseEffectHook(previousData => !previousData);
  };
  ///////////////////////////---------------
  const handleClickCardEdit = async (fieldD) => {
    setcurrentField(previousData => ({
      ...previousData,
      oldField: fieldD,
      id: currentClickedContent.id
    }));
    setIsAddEditFieldOverlay(true);
  };

  const renderContentSchema = Object.keys(currentClickedContent.contentSchema).map((key, index) => {
    return (
      <div key={index} className='content-schema-card'>
        <div className="content-schema-card-left">
          <div className="Ab-text">Ab</div>
          <div className='schema-name'>{key}</div>
          {/* <div className='schema-name'>{currentClickedContent.contentSchema[key]}</div> */}
          <span className="datatype-text">Text</span>
        </div>
        <div className="content-schema-card-right">
          {/* <img src={editIcon} onClick={handleClickCardEdit} alt="" className="content-schema-card-edit" /> */}
          <img src={editIcon} alt="" className="content-schema-card-edit" onClick={() => handleClickCardEdit(key)} />
          <img src={deleteIcon} onClick={() => handleClickCardDelete(key)} alt="" className="content-schema-card-delete" />
        </div>



      </div>
    );
  });

  const handleClickAddAnotherField = async () => {
    // setCurrentField('');
    setIsAddEditFieldOverlay(true);

    // await axios.put('http://localhost:4000/upadte/contenttype/schema/add', {
    //   contentId: currentClickedContent.id,
    //   field: 'testField'
    // });
  };

  console.log('&&', renderContentSchema);

  return (
    <div>
      {isAddEditFieldOverlay &&
        <AddEditFieldForm
          {...currentClickedContent}
          setIsAddEditFieldOverlay={setIsAddEditFieldOverlay}
          setCurrentClickedContent={setCurrentClickedContent}
          setCallUseEffectHook={setCallUseEffectHook}


        />}
      {isAddEditFieldOverlay &&
        <EditFieldForm
          {...currentClickedContent}
          setIsAddEditFieldOverlay={setIsAddEditFieldOverlay}
          setCurrentClickedContent={setCurrentClickedContent}
          currentField={currentField}
          setCallUseEffectHook={setCallUseEffectHook}

        />}

      <div className="main-body">
        <div className="sidebar">
          <div className="sidebar-header">
            CMS+
          </div>
          <div className="sidebar-body">
            <div className="sidebar-body-header">
              <div className="sidebar-body-header-text">COLLECTION  TYPES</div>
              <img src={searchIconLight} alt="" className="search-icon" />
            </div>

            <div className="sidebar-body-list">
              <ul className='content-name-list'>
                {renderContentName}
              </ul>
            </div>
          </div>
          <div className="sidebar-content-type-builder-text" onClick={handleClickContentBuilder}>
            CONTENT TYPE BUILDER
          </div>



        </div>
        <div className="main-content">
          <div className="main-content-header">
            Content Types
          </div>
          {isAllInstancePage && <AllInstances {...currentAllInstanceContentData} />}
          {!isAllInstancePage && <div className="main-content-body">

            {/* MIDDLE SECTION */}
            <div className="middle-section">

              <div className="middle-section-header">
                <div className="middle-section-types-number">{allContentNames.length} Types</div>
                <img src={searchIconDark} alt="" className="search-icon" />
              </div>

              <div className="middle-section-button" onClick={handleCreateNewContentClick}>
                <span className="new-type-button" >+ New Type</span>
              </div>

              <div className="middle-section-content-name-list">
                <ul className='middle-section-content-name-list'>
                  {renderMiddleSectionContentName}
                </ul>
              </div>

              {/* OVER LAY */}
              <div className='overlay-create-content' >
                <Overlay className={Classes.OVERLAY_SCROLL_CONTAINER}
                  isOpen={isOpen}>
                  <div className="test">
                    <div className="overlay-form">
                      <div className="overlay-form-top">
                        Create a new content type
                      </div>

                      <div className="overlay-form-middle">
                        <span className="name-of-content-text">Name of the content type</span>
                        <input type="text" onChange={handleContentNameChange} className="content-name-input" />
                      </div>

                      <div className="overlay-form-bottom">
                        <span className="overlay-cancel-button" onClick={handleClickCancel}>Cancel</span>
                        <span className="overlay-submit-button" onClick={handleClickCreate}>Create</span>
                      </div>

                    </div>
                  </div>
                </Overlay>
              </div >

            </div>

            {/* RIGHT SECTION */}
            <div className="right-section">
              {currentClickedContent.contentName != '' && <div className="right-section-content-container">

                <div className="right-section-top">
                  <span className="right-section-current-content-name">{currentClickedContent.contentName}</span>
                </div>

                <div className="right-section-middle">
                  <span className="add-another-field-button" onClick={handleClickAddAnotherField}>Add another field</span>
                </div>

                <div className="right-section-bottom">
                  <div className="card-container">
                    {renderContentSchema}
                  </div>
                </div>

              </div>}
            </div>
          </div>}

        </div>
      </div>
    </div >
  );
}