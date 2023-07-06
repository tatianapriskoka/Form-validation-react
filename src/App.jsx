import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const [array, setArray] = useState([]);
  const [comment, setComment] = useState({
    userName: '',
    userPhoto: '',
    userText: '',
    checked: false,
  })


  const checkName = () => {
    const { userName } = comment;
    const reg = new RegExp(/(^|\s)\S/g);
    const cleanWords = userName.toLowerCase().trim();
    const checkedName = cleanWords.replace(reg, function (uppercase) {
      return uppercase.toUpperCase()
    })

    return checkedName;
  }

  const onChangeHandler = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setComment(
      { ...comment, [e.target.name]: value }
    )
  }

  const commentFilter = () => {
    const filter = comment.userText.replace(/fool|XXX/ig, "***");
    return filter;
  }

  const handleChange = (e) => {
    const text = commentFilter(comment.userText);
    const name = checkName(comment.userName);
    if (!comment.checked) {
      setArray(current => [...current, { ...comment, userName: 'username', userText: text }])
    } else {
      setArray(current => [...current, { ...comment, userName: name, userText: text }])
    }
    e.preventDefault();
    setComment({ userName: '', userText: '', userPhoto: '' })
  };




  return (
    <div className="container">
      <h1 className="header">Сервис комментариев</h1>
      <div className="main">
        <form className="comment-form form">
          <h3 className="form__heading">Оставьте ваш комментарий</h3>
          <fieldset className="agreement">
            <div className="agreement__question question">
              <legend className="question__label">Показывать ваше имя?</legend>
            </div>
            <div className="agreement__answer">
              <input onChange={onChangeHandler} className="answer--1" type="checkbox" id="yes" name="checked" checked={comment.checked || ''} />
            </div>
          </fieldset>
          <div className="form__body">
            <div className="username">
              <label className="username__label" htmlFor="usernameInput">Введите ваше имя:</label>
              <input className="username__input" value={comment.userName} onChange={onChangeHandler} type="text" id="usernameInput" name="userName" />
            </div>
            <div className="userpic">
              <label className="userpic__label" htmlFor="userpicInput">Введите ссылку вашего фото:</label>
              <input className="userpic__input" value={comment.userPhoto} onChange={onChangeHandler} type="url" id="userpicInput" name='userPhoto' />
            </div>
            <div className="text">
              <label className="text__label" htmlFor="textInput">Оставьте комментарий</label>
              <textarea className="text__input" value={comment.userText} onChange={onChangeHandler} name="userText" id="textInput" maxLength="800"></textarea>
            </div>
            <div className="comment-button">
              <button onClick={handleChange} className="button">Отправить</button>
            </div>
          </div>
        </form>
        <section className="chat">
          <h3 className="chat__heading">Чат</h3>
          <div className="chat-block">
            {
              array.reverse().map((item, index) => {
                return (
                  <div key={index} className={index === 0 ? 'chat__comment first-comment' : 'chat__comment'}>
                    <div className='comment__image'>

                      {item.userPhoto &&
                        <img className='avatar' src={item.userPhoto} alt="userImage" />}
                      {!item.userPhoto &&
                        <img className='avatar' src='https://cs13.pikabu.ru/post_img/2023/03/26/11/1679854435170653553.jpg' alt="userImage" />
                      }
                    </div>
                    <div className='comment__username'>{item.userName}</div>
                    <div className='comment__content'>{item.userText}</div>
                  </div>
                )
              })
            }
          </div>
        </section>

      </div>

    </div>
  );
}

export default App;
