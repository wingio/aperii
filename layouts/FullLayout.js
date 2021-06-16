import React, { Component, useState } from 'react';
import Search from '../components/Search'
import ProfileDropdown from '../components/ProfileDropdown'
import SidebarFeedOption from '../components/SidebarFeedOption'
import RichTextbox from '../components/RichTextbox'

function FullLayout(props) {
  const [open, setOpen] = useState(false)
  const [imgstuff, setBase] = useState('')
  const user = props.user
  const expStore = props.misc
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
      fetch(`https://aperii.com/api/v1/users/${user.id}/posts`, {
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
    fetch(`https://aperii.com/api/v1/users/${user.id}/posts`, {
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
    <a href="/home"><SidebarFeedOption name="Home" current={props.page == "home"} icon="home"></SidebarFeedOption></a>
    <SidebarFeedOption name="Discover" icon="compass"></SidebarFeedOption>
    {expStore["noti_tab_06_05_21"] == 1 ? <a href="/notifications"><SidebarFeedOption name="Notifications" current={props.page == "notis"} icon="bell"></SidebarFeedOption></a> : ''}
    <a href={`/p/${user.username}`}><SidebarFeedOption name="Profile" current={props.page == "profile"} icon="user"></SidebarFeedOption></a>
  </div>
  <div className={`feed`} style={{height: "100vh"}}>
    <Search></Search>
    <div className="content">
      {props.children}
    </div>
  </div>
  <div className={`sticky right`}>
    <div className="av-container">
      <img className={`av`} src={user ? user.avatar ? user.avatar : '/av.png' : '/av.png'} onClick={toggleDropdown}></img>
      {open ? <ProfileDropdown user={user} exp={expStore}/> : ''}
    </div>
    <div className="sidebar-profile">
      <div className="profile"></div>
      <div className="post-form">
        <form onSubmit={makePost}>
          {expStore['textbox_newline_05_17_21'] == 1 ? <RichTextbox /> : <input type="text"></input>}
          <input type="file"></input>
          <input type="submit"></input>
          <img src={`data:image/png;base64, ${imgstuff}`}></img>
        </form>
      </div>
    </div>
  </div>  
</div>
</div>

);
}

export default FullLayout;