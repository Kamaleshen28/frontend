import React, { useEffect, useState } from 'react';
import './allInstances.css';
import axios from 'axios';
import PropTypes from 'prop-types';

import editIcon from '../../assets/user-edit-text-message-note_2023-03-09/user-edit-text-message-note.png';
import deleteIcon from '../../assets/trash-delete-recycle-bin-bucket-waste_2023-03-09/trash-delete-recycle-bin-bucket-waste@3x.png';
import AddNewEntryOverlay from '../addNewEntryOverlay/addNewEntryOverlay';


export default function AllInstances(props) {
  const [contentInstanceData, setContentInstanceData] = useState([]);
  const [isAddNewEntryOn, setIsAddNewEntryOn] = useState(false);

  const fetchContentData = async () => {
    const response = await axios.get(`http://localhost:4000/all/contenttype/instances/${props.id}`);
    setContentInstanceData(response.data.message);
  };
  useEffect(() => {
    fetchContentData();
  }, [props]);


  const handleClickDeleteInstance = async (id) => {
    const response = await axios.delete(`http://localhost:4000/delete/instance/${id}`);
    console.log(response);
    fetchContentData();
  };

  const handleClickEditInstance = async (id) => {
    console.log(id);
  };

  const renderFieldName = Object.keys(props.contentSchema).map((key, index) => {
    return (
      <div key={index} >
        <div className='field-name'>{key}</div>
      </div>
    );
  });

  console.log('HEREHEREHERE: ', contentInstanceData);
  let renderAllInstanceData = [];

  if (contentInstanceData.length != 0) {

    renderAllInstanceData = contentInstanceData.map((data, index) => {
      return (<div className='each-instance' key={index}>
        <div className="each-instance-right">
          {(Object.keys(data.instanceValues).map((key, index) => {
            return (
              <div className='wrapper' key={index} >
                {/* <div className='value-text'>{key}</div> */}
                <div className='value-text'>{data.instanceValues[key]}</div>
              </div>
            );
          }))}
        </div>
        <div className="each-instance-left">
          <img src={editIcon} alt="" className="each-instance-edit-icon" onClick={() => handleClickEditInstance(data.id)} />
          <img src={deleteIcon} alt="" className="each-instance-delete-icon" onClick={() => handleClickDeleteInstance(data.id)} />
        </div>
      </div>);
    });
  }

  const handleClickAddNewEntry = () => {
    setIsAddNewEntryOn(true);
  };




  return (
    <div className="allinstances-wrapper">
      <div className="allinstances-top-section">
        <span className="number-of-instances">13 Entries Found</span>
        {/* <span className="add-new-entry-text" >Add a new entry</span> */}
        <span className="add-new-entry-text" onClick={handleClickAddNewEntry}>Add a new entry</span>
      </div>
      {isAddNewEntryOn && <AddNewEntryOverlay {...props} setIsAddNewEntryOn={setIsAddNewEntryOn} setContentInstanceData={setContentInstanceData} />}
      {/* <AddNewEntryOverlay /> */}

      <div className="allinstances-middle-section">
        <div className="allinstances-middle-section-left">
          {/* <span className="id-field">ID</span> */}
          {renderFieldName}
        </div>
        <div className="allinstances-middle-section-right">
          <span className="action-text">Actions</span>
        </div>
      </div>

      <div className="allinstances-botton-section">
        {renderAllInstanceData}
      </div>
    </div>
  );
}


AllInstances.propTypes = {
  id: PropTypes.number.isRequired,
  contentSchema: PropTypes.object.isRequired
  // name: PropTypes.string.isRequired,
  // description: PropTypes.string.isRequired,
  // venue: PropTypes.string.isRequired,
  // imgUrl: PropTypes.string.isRequired,
  // isBookmarked: PropTypes.bool.isRequired,
  // isRegistered: PropTypes.bool.isRequired,
  // areSeatsAvailable: PropTypes.bool.isRequired,
  // handleOnClickBookmark: PropTypes.func.isRequired,
  // handleRegisterButtonClick: PropTypes.func.isRequired,
  // id: PropTypes.number.isRequired,

  // datetime: PropTypes.string.isRequired
};

