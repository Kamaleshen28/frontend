import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './addNewEntryOverlay.css';

export default function AddNewEntryOverlay(props) {

  const [instanceData, setInstanceData] = useState(props.contentSchema);

  const handleInstanceDataChange = (event, key) => {
    setInstanceData(previousData => ({
      ...previousData,
      [key]: event.target.value
    }));
  };

  const renderAllField = (Object.keys(props.contentSchema).map((key, index) => {
    return (<div key={index} className="field-input-card">
      <span className="overlay-field-name">{key}</span>
      <input type="text" name={key} value={instanceData.key} onChange={(event) => handleInstanceDataChange(event, key)} className="input-field-value" />
    </div>);
  }));

  const handleClickCancelInAddNewEntry = async () => {
    props.setIsAddNewEntryOn(false);
  };

  const fetchContentData = async () => {
    const response = await axios.get(`http://localhost:4000/all/contenttype/instances/${props.id}`);
    props.setContentInstanceData(response.data.message);
  };

  const handleClickAddInAddNewEntry = async () => {
    const respose = await axios.post('http://localhost:4000/create/instance', {
      contentId: props.id,
      instanceValues: instanceData
    });
    console.log(respose);
    await fetchContentData();
    props.setIsAddNewEntryOn(false);
  };


  return (
    <div className='add-entry-overlay-wrapper'>
      <div className='add-entry-overlay-content'>
        <div className="add-entry-overlay-body-top">
          <div className='add-entry-overlay-top'>
            <span className='header-top' >New {props.contentName}</span>
          </div>
          <div className='add-entry-overlay-middle'>
            {renderAllField}
          </div>
        </div>
        <div className="add-entry-overlay-bottom">
          <span className="add-entry-overlay-cancel-button" onClick={handleClickCancelInAddNewEntry}>Cancel</span>
          <span className="add-entry-overlay-add-button" onClick={handleClickAddInAddNewEntry} >Add</span>
        </div>

      </div>
    </div>
  );
}

AddNewEntryOverlay.propTypes = {
  contentName: PropTypes.string.isRequired,
  contentSchema: PropTypes.array.isRequired,
  setIsAddNewEntryOn: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  setContentInstanceData: PropTypes.func.isRequired
};