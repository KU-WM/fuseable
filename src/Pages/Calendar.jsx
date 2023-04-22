import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/Logo.png';
import { useState } from 'react';
import MyCalendar from './CalendarTest';
import { useRecoilState } from 'recoil';
import { userInProjectState } from '../recoil';
import '../css/Calendar.css'
import NoticeBanner from '../Notice/NoticeBanner';


function CalendarDisplay () {
  const [modalOpen, setModalOpen] = useState(false);
  const [crewsOpen, setcrewsOpen] = useState(false);
  const [userInproject, setUserInProject] = useRecoilState(userInProjectState);

  const selectedProjectTitle = window.localStorage.getItem("selectedProjectTitle");

  const Crews = (props) => {
    const { open, close } = props;

    const userDataHandler = () => {
      return userInproject
      .map((user) => <div className='UserInProject' key={user.userId}>{user.userName} <img className='UserInProjectProfileImg' src={user.userPicture} alt="User Image" ></img> </div>)
    }
  
    return (
      <div className={open ? 'openedCrew' : 'crew'}>
        {open ? (
          <section>
            <div>
              <button className="close" onClick={close}>
                close
              </button>
            </div>
            <main>
              {userDataHandler()}
            </main>
            <footer>
              
            </footer>
          </section>
        ) : null}
      </div>
    )
  }

  const openCrews = () => {
    setcrewsOpen(true);
  };

  const closeCrews = () => {
    setcrewsOpen(false);
  };

  const Modal = (props) => {
    const { open, close } = props;
  
    return (
      <div className={open ? 'openedModal' : 'modal'}>
        {open ? (
          <section>
            <div>
              <button className="close" onClick={close}>
                close
              </button>
            </div>
            <main>
              <ul>
                <li>
                  인원 초대
                </li>
                <li>
                  기능 추가 대기 2
                </li>
                <li>
                  기능 추가 대기 3
                </li>
                <li>
                  기능 추가 대기 4
                </li>
              </ul>
            </main>
            <footer>
              
            </footer>
            <a href={process.env.REACT_APP_LogoutURL} id="logout-btn">Logout</a>
          </section>
        ) : null}
      </div>
    )
  }

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };


  return (
    <React.Fragment>
    <header>
      <div className='header'>
        <div className='logo'>
          <Link className='textLink' to="/main">
            <img src={Logo} alt="Logo" className='logo'/>
          </Link>
        </div>
        <div className='crewmate'>
          <button className='showCrawmate' onClick={openCrews}>참여 인원</button>
        </div>
        <Crews open={crewsOpen} close={closeCrews} header="참여 인원"></Crews>
        <div className='sidebarBtn'>
          <button className='sidebar' onClick={openModal}>
            Side
          </button>
          <Modal open={modalOpen} close={closeModal} header="Modal heading"></Modal>
        </div>
      </div>
      <div className='mainbody'>
        <div className='interface'>
          <div className='notice'>
            <Link className='textLink' to="/main/notice">공지사항</Link>
          </div>
          <div className='calendar'>
            <Link className='textLink' to="/main/calendar">일정</Link>
          </div>
          <div className='mydocument'>
            <Link className='textLink' to="/main/mydocument">내가 작성한 문서</Link>
          </div>
          <div className='myproject'>
            <Link className='textLink' to="/start">진행중인 프로젝트</Link>
          </div>
          <div className='notice-banner'>
            <NoticeBanner className='NoticeBanner' />
          </div>
        </div>
        <div className='main'>
          <div className='projectname'>
            <Link className='textLink' to="/main">{selectedProjectTitle}</Link>
          </div>
          <MyCalendar className="calendar"></MyCalendar>
        </div>
      </div>
    </header>
    </React.Fragment>
  )
}


export default CalendarDisplay;