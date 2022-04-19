import React, { useEffect, useState } from 'react';
import './Modal.scss';
import Input from './Input/Input.js'
import adminApi from '../../../../../@api/adminApi';

function Modal({ idx, onClickClose = () => {} }) {

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [baptisaml, setBaptisaml] = useState('')
  const [baptismalBirth, setBaptisamlBirth] = useState('')
  const [residence, setResidence] =useState('')
  const [temple, setTemple] = useState('')
  const [birth, setBirth] = useState('')
  const [permission, setPermission] = useState('')

  useEffect(() => {
    adminApi.getAdmin(idx)
      .then((value) => {
        console.log(value.admin)
        setId(value.admin.id)
        setName(value.admin.name)
        setPhone(value.admin.phone)
        setEmail(value.admin.email)
        setBaptisaml(value.admin.baptismal)
        setBaptisamlBirth(value.admin.baptismal_birth)
        setResidence(value.admin.residence)
        setTemple(value.admin.temple)
        setBirth(value.admin.birth)
        setPermission(value.admin.permission)
      })
      .catch((e) => {
        console.error(e)
      })
  }, [])
  
  return (
    <>
      <div className='admin-manage-modal'>
        <div className='admin-manage-modal-background'
          onClick={() => {
            onClickClose()
          }}/>
        <div className='admin-manage-modal-wrap'>
          <div className='admin-manage-modal-header'>
            <div className='admin-manage-modal-header-title'>개별 관리자 상세 내용</div> 
            <div className='admin-manage-modal-header-button'
              onClick={() => {
                onClickClose()
              }}>뒤로가기</div> 
          </div>
          <Input title='아이디' value={id} setValue={setId}/>
          <Input title='이름' value={name} setValue={setName}/>
          <Input title='전화번호' value={phone} setValue={setPhone}/>
          <Input title='이메일 주소' value={email} setValue={setEmail}/>
          <Input title='세례명' value={baptisaml} setValue={setBaptisaml}/>
          <Input title='축일' value={baptismalBirth} setValue={setBaptisamlBirth}/>
          <Input title='교구' value={residence} setValue={setResidence}/>
          <Input title='본당' value={temple} setValue={setTemple}/>
          <Input title='생년월일' value={birth} setValue={setBirth}/>
          <Input title='권한' value={permission} setValue={setPermission}/>
          <div className='admin-manage-modal-footer'>
              <div className='admin-manage-modal-footer-button'
                onClick={() => {
                  onClickClose()
                }}>반려하기</div>

              <div className='admin-manage-modal-footer-button'
                onClick={() => {
                  onClickClose()
                }}>승인하기</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
