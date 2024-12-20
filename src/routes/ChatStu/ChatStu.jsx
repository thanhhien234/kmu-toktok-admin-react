import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './ChatStu.css';
import sendIcon from '../../assets/icons/send-icon.svg';
import backIcon from '../../assets/icons/back-icon.svg';
import mobileDownArrow from '../../assets/icons/mobile-down-arrow.svg';
import mobileUpArrow from '../../assets/icons/mobile-up-arrow.svg';
import useChatStu from './hooks/useChatStu';
import { formatDate, formatTime } from '../../utils/dateAndTime';
import useIsMobile from '../../hooks/useIsMobile';
import ChatStuMenu from '../../components/Aside/ChatStuMenu/ChatStuMenu';
import LoadingModal from '../../components/LoadingModal/LoadingModal';

function ChatStu() {
  let { studentId } = useParams();  
  const navigate = useNavigate();
  const {
    chatContent,
    newMessage,
    handleInputChange,
    handleSend,
    handleKeyDown,
    handleKeyUp,
    inputRef,
    chatContentRef,
    sendRef,
    isLoading,
    setChatRead
  } = useChatStu();
  const isMobile = useIsMobile();
  const [isHeaderExtend, setIsHeaderExtend] = useState(false);

  useEffect(() => {
    if (!isMobile)
      setIsHeaderExtend(false);
  },[isMobile]);

  if (!studentId){
    if (isMobile)
      studentId = '목록보기';
    else
      return null;
  }

  const handleBack = () => {
    navigate('/chatstu');
  };

  return (
    <main className="chat-container">
      <LoadingModal show={isLoading} />
      <section className='chat-header'>
        <article className='chat-header-inner'>
          {!isMobile && <img src={backIcon} alt="" onClick={handleBack} className='backIcon'/>}
          <span className='chat-header-text' 
            onClick={() => {
              if(isMobile) 
                setIsHeaderExtend(!isHeaderExtend)
            }}>
            {studentId}
          </span>
          {isMobile && (
            <img 
              src={isHeaderExtend ? mobileUpArrow : mobileDownArrow} 
              alt="" 
              className='mobileArrow' 
            />
          )}
          <button className='last-chatting-btn' onClick={() => setChatRead(studentId)}>
            <span>이 채팅방을 아래로 내리기</span>
            <img src={mobileDownArrow} alt=""/> 
          </button>
        </article>
        {isHeaderExtend && <ChatStuMenu isMobile={isMobile} setIsHeaderExtend={setIsHeaderExtend} />}
      </section>
      <section className='chat-wrapper' ref={chatContentRef}>
        {chatContent.map((chat, index) => (
          <section key={index}>
            {(index === 0 || formatDate(chat.localDateTime) !== formatDate(chatContent[index - 1].localDateTime)) && (
              <div className="date-wrapper">{formatDate(chat.localDateTime)}</div>
            )}
            <article className={`message ${chat.question ? 'answer' : 'question'}`}>
              <div className={`message-content ${chat.question ? 'answer' : 'question'}`}>
                {chat.comment}
              </div>
              {(index === chatContent.length - 1 || formatDate(chat.localDateTime) !== formatDate(chatContent[index + 1].localDateTime) || chat.question !== chatContent[index + 1].question) && (
                <span className="message-time">{formatTime(chat.localDateTime)}</span>
              )}
            </article>
          </section>
        ))}
      </section>

      <section className="input-wrapper">
        <div className='input-wrapper-inner'>
          <textarea
            rows={1}
            className="input-text"
            placeholder="메시지를 입력해주세요"
            value={newMessage}
            onChange={handleInputChange}
            onKeyDown = {handleKeyDown}
            onKeyUp = {handleKeyUp}
            ref = {inputRef}
          />
          <button type='submit' className='send-btn' onClick={handleSend} ref={sendRef}>
            <img src={sendIcon} alt="Send" />
          </button>
        </div>
      </section>
    </main>
  );
}

export default ChatStu;