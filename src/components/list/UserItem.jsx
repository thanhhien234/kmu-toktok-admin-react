import { Link, useNavigate } from "react-router-dom";
import arrowIcon from '../../assets/icons/arrow-icon.png';
import useSeletectUserStore from "../../store/useSeletedUserStore";
import './UserItem.css';

function UserItem(props) {
  const { num, studentId, role } = props;
  const setSelectedUser = useSeletectUserStore((state) => state.setSelectedUser);
  const navigate = useNavigate();
  return (
    <tr className='manage-user-list-item'>
      <td>{num}</td>
      <td>{studentId}</td>
      <td>
        <button className='manage-user-list-redirect-btn' onClick={() => {
          navigate('/manage/' + studentId);
        }}>챗봇과의 대화기록 보기</button>
      </td>
      <td>
        <button className='manage-user-list-redirect-btn'>나와의 대화기록 보기</button>
      </td>
      <td>
        <Link className="manage-user-detail" onClick={(e) => {
          e.preventDefault();
          setSelectedUser(studentId, role);
        }}>
          자세히 보기 <img src={arrowIcon} alt="arrow-icon" />
        </Link>
      </td>
    </tr>
  )
}

export default UserItem;