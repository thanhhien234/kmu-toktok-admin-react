import './WritingSubmit.css';
import backIcon from '../assets/icons/back-icon.png';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getWritingSubmit, patchWritingState } from '../api/writingApi';
import { useCookies } from 'react-cookie';

function WritingSubmit() {
  const { writingId, studentId } = useParams();
  const navigate = useNavigate();
  const [ writing, setWriting ] = useState();
  const [ cookies ] = useCookies(['accessToken']);
  const [ score, setScore ] = useState();

  useEffect(() => {
    getWritingSubmit(writingId, studentId, cookies.accessToken)
    .then((res) => {
      setWriting(res.data.content);
    })
    .catch((err) => {
      alert(err.message);
    })
  }, [])

  const handleConfirmBtnClick = async () => {
    if (!score) {
      alert('점수를 입력해주세요.');
      return ;
    }

    const dataForm = {
      assignmentId: writingId,
      studentId: studentId,
      writingState: 3,
      score: score
    }

    try {
      const res = await patchWritingState(dataForm, cookies.accessToken);
      alert('채점되었습니다.');
    } catch (err) { alert(err.message) }
  }

  const handleModifyBtnClick = async () => {
    if (!score) {
      alert('점수를 입력해주세요.');
      return ;
    }

    const dataForm = {
      assignmentId: writingId,
      studentId: studentId,
      writingState: 3,
      score: score
    }

    try {
      const res = await patchWritingState(dataForm, cookies.accessToken);
      alert('채점되었습니다.');
    } catch (err) { alert(err.message) }
  }

  const handleRejectBtnClick = async () => {
    if (!score) {
      alert('점수를 입력해주세요.');
      return ;
    }

    const dataForm = {
      assignmentId: writingId,
      studentId: studentId,
      writingState: 2,
      score: 0
    }

    try {
      const res = await patchWritingState(dataForm, cookies.accessToken);
      alert('채점되었습니다.');
    } catch (err) { alert(err.message) }
  }

  return (
    <main className="writing-submit">
      <header>
        <span onClick={() => { navigate(-1) }}>
          <img src={backIcon} alt="back-icon" />
          뒤로가기
        </span>
        <span className="chat-header-text">{ studentId }</span>
      </header>
      <section>
        <section>
          <label htmlFor="score" className="title-badge">채점</label>
          <input 
            type="number" 
            id="score" 
            placeholder="점수를 입력해주세요." 
            min={0} 
            onChange={(e) => { setScore(e.target.value) }} />
          <div>
            <button className="btn confirm" onClick={handleConfirmBtnClick}>확인</button>
            {/* <button className="btn modify" onClick={handleModifyBtnClick}>수정하기</button> */}
            <button className="btn reject" onClick={handleRejectBtnClick}>부정제출</button>
          </div>
        </section>
        <section>
          <span className="title-badge">글</span>
          <article>
            2024년 7월 22일 월요일(오후 2:54)
          </article>
          <article>
            { writing || "글을 가져오는 중입니다..." }
          </article>
        </section>
      </section>
    </main>
  )
}

export default WritingSubmit;