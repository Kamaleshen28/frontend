import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './addEditFieldForm.css';

export default function AddEditFieldForm(props) {

  const [newFieldName, setNewFieldName] = useState({
    contentId: props.id,
    field: ''
  });

  const handleClickCancel = () => {
    props.setIsAddEditFieldOverlay(false);
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
      });
    console.log('???', response);
    props.setIsAddEditFieldOverlay(false);
    const result = await axios.get(`http://localhost:4000/data/content/${props.contentName}`);
    props.setCurrentClickedContent(result.data.message);
  };

  return (
    <div className='add-edit-overlay-wrapper'>
      <div className='add-edit-overlay-content'>
        <div className='add-edit-overlay-top'>
          <span className='header-top' >Add Field</span>
        </div>
        <div className='add-edit-overlay-middle'>
          <span className="add-edit-overlay-content-name">Content Name</span>
          <input type="text" className="add-edit-overlay-content-name" onChange={handleChangeFieldName} />
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
  // contentSchema: PropTypes.array.isRequired,
  // setIsAddNewEntryOn: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  setIsAddEditFieldOverlay: PropTypes.func.isRequired,
  setCurrentClickedContent: PropTypes.func.isRequired
};