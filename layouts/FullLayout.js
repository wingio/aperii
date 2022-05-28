import React, { Component, useState } from 'react';
import Search from '../components/Search';
import ProfileDropdown from '../components/ProfileDropdown';
import SidebarFeedOption from '../components/SidebarFeedOption';
import useLang from '../providers/useLang';
import UserProfile from '../components/UserProfile';
import OpenPostModal from '../components/OpenPostModal';
import { API_BASE_URL, CDN_BASE_URL } from '../constants';

function FullLayout(props) {
  const [open, setOpen] = useState(false)
  const [imgstuff, setBase] = useState('')
  const user = props.user
  const expStore = props.misc
  const post = props.post
  const lang = useLang()
  const [text, setText] = useState(lang)
  function toggleDropdown(e) {
    setOpen(!open)
    e.target.className = `av ${open ? '' : 'clicked'}`
  }

  function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}

  function makePost(e) {
    var reader = new FileReader()
    e.preventDefault()

    if(expStore['textbox_newline_05_17_21'] == 1){
      console.log(e.target.children[0].children[0].innerText)
      fetch(`${API_BASE_URL}/users/${user.id}/posts`, {
        body: JSON.stringify({
          body: e.target.children[0].children[0].innerText
        }),
        headers: {
          'content-type': 'application/json',
          authorization: localStorage.getItem('token')
        },
        method: 'POST'
      }).then(res => res.json()).then(json => {
        if(json.error){
        } else {
          window.location = '/home'
        }
      })
      return
    }
    
    var reader = new FileReader();
    reader.onload = function(){
        var arrayBuffer = this.result;
        console.log(arrayBuffer);
        setBase(_arrayBufferToBase64(arrayBuffer))
    }


    //reader.readAsArrayBuffer(e.target[1].files[0]);
    e.target[2].disabled = true
    fetch(`${API_BASE_URL}/users/${user.id}/posts`, {
      body: JSON.stringify({
        body: e.target[0].value
      }),
      headers: {
        'content-type': 'application/json',
        authorization: localStorage.getItem('token')
      },
      method: 'POST'
    }).then(res => res.json()).then(json => {
      window.location = '/home'
    })
    return false
  }
  return (
    <div className="container">            
    <div className={`ui full`}>
  <div className={`sticky left`}>
    <a href="/home"><span className={`logo`}></span></a>
    <SidebarFeedOption name={text.sidebar.home} current={props.page == "home"} icon="home" goto="/home"></SidebarFeedOption>
    <SidebarFeedOption name={text.sidebar.discover} icon="compass"></SidebarFeedOption>
    {expStore["noti_tab_06_05_21"] == 1 ? <SidebarFeedOption name={text.sidebar.notifications} current={props.page == "notis"} icon="bell" goto="/notifications"></SidebarFeedOption> : ''}
    <SidebarFeedOption name={text.sidebar.profile} current={props.page == "profile"} icon="user" goto={`/@${user.username}`}></SidebarFeedOption>
  </div>
  <div className={`feed`} style={{height: "100vh"}}>
    <Search title={props.title} showBadge={props.showBadge} showPosts={props.showCount} postCount={props.postCount}></Search>
    <div className="content" style={{height: "100%"}}>
      {props.children}
    </div>
  </div>
  <div className={`sticky right`}>
    <div className="av-container">
      <img className={`av`} src={user ? user.avatar ? `${CDN_BASE_URL}/avatars/${user.avatar}` : '/av.png' : '/av.png'} onClick={toggleDropdown}></img>
      {open ? <ProfileDropdown user={user} exp={expStore}/> : ''}
    </div>
    <div className="sidebar-profile">
      <div className="profile"></div>
      <UserProfile user={user}/>
      <div style={{display: "flex"}}>
        <OpenPostModal user={user} post={post}/>
      </div>
    </div>
  </div>  
</div>
</div>

);
}

export default FullLayout;