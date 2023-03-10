import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './editInstanceValue.css';

export default function EditInstanceValue(props) {
  const getInstanceValue = () => {
    const instanceValues = props.contentInstanceData.filter(data => data.id === props.instanceId);
    return instanceValues[0].instanceValues;
  };

  const [instanceData, setInstanceData] = useState(getInstanceValue());
  const handleInstanceDataChange = (event, key) => {
    setInstanceData(previousData => ({
      ...previousData,
      [key]: event.target.value
    }));
  };
  const renderAllField = (Object.keys(instanceData).map((key, index) => {
    return (<div key={index} className="field-input-card">
      <span className="overlay-field-name">{key}</span>
      <input type="text" name={key} value={instanceData[key]} onChange={(event) => handleInstanceDataChange(event, key)} className="input-field-value" />
    </div>);
  }));

  const handleClickCancelInAddNewEntry = async () => {
    props.setIsAddNewEntryOn(false);
    props.setIsEdit(false);

  };

  const fetchContentData = async () => {
    const response = await axios.get(`http://localhost:4000/all/contenttype/instances/${props.id}`, {
      headers: { 'token': localStorage.getItem('token') }
    });
    props.setContentInstanceData(response.data.message);
  };

  const handleClickAddInAddNewEntry = async () => {
    const response = await axios.put(`http://localhost:4000/upadte/instance/${props.instanceId}`, {
      instanceValues: instanceData
    }, {
      headers: { 'token': localStorage.getItem('token') }
    }
    );
    console.log(response);
    await fetchContentData();
    props.setIsAddNewEntryOn(false);
    props.setIsEdit(false);
  };


  return (
    <div className='add-entry-overlay-wrapper'>
      <div className='add-entry-overlay-content'>
        <div className="add-entry-overlay-body-top">
          <div className='add-entry-overlay-top'>
            <span className='header-top' >Edit {props.contentName}</span>
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

EditInstanceValue.propTypes = {
  instanceId: PropTypes.number.isRequired,
  contentInstanceData: PropTypes.array.isRequired,
  contentName: PropTypes.string.isRequired,
  setIsAddNewEntryOn: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  setContentInstanceData: PropTypes.func.isRequired,
  setIsEdit: PropTypes.func.isRequired
};