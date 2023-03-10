import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './addFieldForm.css';

export default function AddEditFieldForm(props) {
  const [newFieldName, setNewFieldName] = useState({
    contentId: props.id,
    field: ''
  });
  console.log('12345', newFieldName);

  const handleClickCancel = () => {
    props.setIsAddEditFieldOverlay(false);
    props.setIsAdd(false);
  };

  const handleChangeFieldName = (event) => {
    setNewFieldName(previousData => ({
      ...previousData,
      field: event.target.value
    }));
  };

  const handleClickAdd = async () => {
    const response = await axios.put('http://localhost:4000/upadte/contenttype/schema/add',
      {
        newFieldName
      },
      {
        headers: { 'token': localStorage.getItem('token') }
      });
    console.log('???', response);
    props.setIsAddEditFieldOverlay(false);
    props.setIsAdd(false);
    const result = await axios.get(`http://localhost:4000/data/content/${props.contentName}`, {
      headers: { 'token': localStorage.getItem('token') }
    });
    props.setCurrentClickedContent(result.data.message);
    props.setCallUseEffectHook(previousData => !previousData);

  };

  return (
    <div className='add-edit-overlay-wrapper'>
      <div className='add-edit-overlay-content'>
        <div className='add-edit-overlay-top'>
          <span className='header-top' >Add Field</span>
        </div>
        <div className='add-edit-overlay-middle'>
          <span className="add-edit-overlay-content-name">Content Name</span>
          <input type="text" value={newFieldName.field} className="add-edit-overlay-content-name" onChange={handleChangeFieldName} />
        </div>
        <div className="add-edit-overlay-bottom">
          <span className="add-edit-overlay-cancel-button" onClick={handleClickCancel}>Cancel</span>
          <span className="add-edit-overlay-add-button" onClick={handleClickAdd} >Add</span>
        </div>
      </div>
    </div>
  );
}

AddEditFieldForm.propTypes = {
  contentName: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  fieldData: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  setIsAddEditFieldOverlay: PropTypes.func.isRequired,
  setIsAdd: PropTypes.func.isRequired,
  setCurrentClickedContent: PropTypes.func.isRequired,
  setCallUseEffectHook: PropTypes.func.isRequired
};