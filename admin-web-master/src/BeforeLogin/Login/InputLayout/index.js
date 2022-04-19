import React, { useEffect, useState } from 'react'
import active from '../../../@static/icon/active.svg';
import inactive from '../../../@static/icon/inactive.svg';

function InputLayout({ title, hint, onChange = (value) => {}, password }) {

    const [pwVisible, setPwVisible] = useState(false)
    
    return (
        <>
            <div style={{ 
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{
                    color: '#9FA2B4',
                    fontWeight: 'bold',
                }}>{title}</div>

                <div style={{
                    background: '#FCFDFE',
                    borderColor: '#F0F1F7',
                    borderWidth: 1,
                    width: '100%',
                    height: '20%',
                    marginTop: 5,
                    marginBottom: 30,
                    borderRadius: 10,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderStyle: 'solid',
                    padding: 10
                }}>
                    <input style={{
                        background: 'transparent',
                        border: 'transparent',
                        placeholder: '',
                        width: password ? '90%' : '100%',
                        fontSize: 14,
                        padding: 0
                    }} 
                    type={pwVisible ? 'text' : (password ? 'password' : 'text')}
                    placeholder={hint}
                    onChange={(t) => onChange(t.target.value)} />
                    {password ?
                        (pwVisible ? 
                            <img 
                                src={active}
                                style={{ 
                                    cursor: 'pointer',
                                    width: 18,
                                    height: 14
                                }}
                                onClick={() => {
                                    setPwVisible(!pwVisible)
                                }}/> : 
                            <img 
                                src={inactive}
                                style={{ 
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    setPwVisible(!pwVisible)
                                }}/>
                        ): 
                        <></>
                    }
                </div>
            </div>
        </>
    )
}

export default InputLayout