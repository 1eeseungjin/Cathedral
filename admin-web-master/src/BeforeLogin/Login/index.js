import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilCallback, useRecoilState } from 'recoil';
import { userInfoState } from '../../@store/userInfo';
import InputLayout from './InputLayout';
import Storage from '../../@plugins/Storage';
import authApi from '../../@api/authApi';
import userInfoApi from '../../@api/userInfoApi';

function Login() {
    const [id, setId] = useState("")
    const [pw, setPw] = useState("")
    const navigate = useNavigate()

    const postAdminLogin = () => {
        authApi.postAdminLogin(id, pw)
            .then((response) => {
                // 로그인 성공 시 토큰값을 넣는다.
                if (response.success) {
                    Storage.token.set(response.token)
                    navigate('/')
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }

    useEffect(() => {
        if (Storage.token.get()) {
            navigate('/')
        }
    }, [])
    
    return (
        <>
            <div style={{
                background: '#062D47',
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div style={{
                    background: '#FFF',
                    borderRadius: 8,
                    width: '20%',
                    height: '60%',
                    paddingBlock: 40,
                    paddingInline: 30,
                }}>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}>
                        <div style={{
                            width: 40,
                            height: 40,
                            background: 'grey'
                        }}/>
                        <div style={{
                            width: 80,
                            height: 20,
                            background: 'grey'
                        }}/>

                        <div style={{
                            color: '#252733',
                            fontWeight: '700',
                            fontSize: 24,
                            marginTop: 30
                        }}>굿뉴스 관리자웹</div>

                        <div style={{
                            color: '#9FA2B4',
                            fontSize: 14,
                            marginTop: 13
                        }}>관리자 계정의 아이디와 패스워드를 입력해주세요</div>
                    </div>

                    <div style={{
                        width: '100%',
                        marginTop: 40
                    }}>
                        <InputLayout
                            title='ID'
                            hint='아이디 입력'
                            password={false}
                            onChange={(value) => setId(value)}
                        />
                        <InputLayout
                            title='PASSWORD'
                            hint='Password 입력'
                            password={true}
                            onChange={(value) => setPw(value)}
                        />

                        <div style={{
                            background: '#062D47',
                            borderRadius: 8,
                            boxShadow: '0px 4px 12px #3751ff3d',
                        }}>
                            <button 
                                style={{
                                    width: '100%',
                                    height: 48,
                                    cursor: 'pointer',
                                    color: 'white',
                                    fontWeight: '600',
                                    background: 'transparent',
                                    borderColor: 'transparent'
                                }}
                                onClick={() => {
                                    postAdminLogin()
                                }}
                            >
                                로그인
                            </button>
                        </div>

                        <div style={{
                            width: '100%',
                            display: 'flex',
                            marginTop: 14,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <button
                                style={{
                                    textDecoration: 'underline',
                                    color: '#9FA2B4',
                                    fontSize: 14,
                                    cursor: 'pointer',
                                    background: 'transparent',
                                    borderColor: 'transparent'
                                }}
                                onClick={() => navigate("/findAccount")}
                            >
                                아이디 찾기/비밀번호 재설정
                            </button>
                        </div>

                        <div style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <button
                                style={{
                                    textDecoration: 'underline',
                                    color: '#9FA2B4',
                                    fontSize: 14,
                                    cursor: 'pointer',
                                    background: 'transparent',
                                    borderColor: 'transparent'
                                }}
                                onClick={() => navigate("/register")}
                            >
                                회원가입
                            </button>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Login;