import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './editContentTypeName.css';

export default function EditContentTypeName(props) {

  const [contentName, setContentName] = useState(props.contentName);

  const handleClickCancel = () => {
    props.setIsChangeContentNameUp(false);
  };

  const handleChangeFieldName = (event) => {
    setContentName(event.target.value);
  };

  const handleClickAdd = async () => {
    const response = await axios.put('http://localhost:4000/update/contenttype/name', {
      contentName,
      id: props.id
    }, {
      headers: { 'token': localStorage.getItem('token') }
    }
    );
    const result = await axios.get(`http://localhost:4000/data/content/${contentName}`, {
      headers: { 'token': localStorage.getItem('token') }
    });
    props.setCurrentClickedContent(result.data.message);
    props.setIsChangeContentNameUp(false);
    props.setCallUseEffectHook(previousValue => !previousValue);

    console.log(response);
  };

  return (
    <div className='edit-overlay-wrapper'>
      <div className='edit-overlay-content'>
        <div className='edit-overlay-top'>
          <span className='header-top' >Edit Content Name</span>
        </div>
        <div className='edit-overlay-middle'>
          <span className="edit-overlay-content-name">Content Name</span>
          <input type="text" value={contentName} className="add-edit-overlay-content-name" onChange={handleChangeFieldName} />
        </div>
        <div className="edit-overlay-bottom">
          <span className="edit-overlay-cancel-button" onClick={handleClickCancel}>Cancel</span>
          <span className="edit-overlay-add-button" onClick={handleClickAdd} >Add</span>
        </div>
      </div>
    </div>
  );
}

EditContentTypeName.propTypes = {
  contentName: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  setIsChangeContentNameUp: PropTypes.func.isRequired,
  setCurrentClickedContent: PropTypes.func.isRequired,
  setCallUseEffectHook: PropTypes.func.isRequired,
};