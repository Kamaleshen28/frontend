import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './editFieldForm.css';

export default function EditFieldForm(props) {
  console.log('SSS:', props);
  const [newFieldName, setNewFieldName] = useState({
    contentId: props.id,
    newField: props.currentField.oldField,
    oldField: props.currentField.oldField
  });

  const handleClickCancel = () => {
    props.setIsAddEditFieldOverlay(false);
  };

  const handleChangeFieldName = (event) => {
    setNewFieldName(previousData => ({
      ...previousData,
      newField: event.target.value
    }));
  };

  const handleClickAdd = async () => {
    //     ar axios = require('axios');
    // var data = JSON.stringify({
    //   "id": 3,
    //   "oldField": "changedtestField2",
    //   "newField": "CCtestField2"
    // });

    // var config = {
    //   method: 'put',
    // maxBodyLength: Infinity,
    //   url: 'http://localhost:4000/upadte/contenttype/schema/name',
    //   headers: { 
    //     'Content-Type': 'application/json'
    //   },
    //   data : data
    // };

    // axios(config)
    const response = await axios.put('http://localhost:4000/upadte/contenttype/schema/name',
      {
        newFieldName
      });
    console.log('???', response);
    props.setIsAddEditFieldOverlay(false);
    const result = await axios.get(`http://localhost:4000/data/content/${props.contentName}`);
    props.setCurrentClickedContent(result.data.message);
    props.setCallUseEffectHook(previousData => !previousData);
  };

  return (
    <div className='edit-overlay-wrapper'>
      <div className='edit-overlay-content'>
        <div className='edit-overlay-top'>
          <span className='header-top' >Add Field</span>
        </div>
        <div className='edit-overlay-middle'>
          <span className="edit-overlay-content-name">Content Name</span>
          <input type="text" value={newFieldName.newField} className="add-edit-overlay-content-name" onChange={handleChangeFieldName} />
        </div>
        <div className="edit-overlay-bottom">
          <span className="edit-overlay-cancel-button" onClick={handleClickCancel}>Cancel</span>
          <span className="edit-overlay-add-button" onClick={handleClickAdd} >Add</span>
        </div>
      </div>
    </div>
  );
}

EditFieldForm.propTypes = {
  contentName: PropTypes.string.isRequired,
  currentField: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  oldField: PropTypes.string.isRequired,
  fieldData: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  setIsAddEditFieldOverlay: PropTypes.func.isRequired,
  setCurrentClickedContent: PropTypes.func.isRequired,
  setCallUseEffectHook: PropTypes.func.isRequired
};