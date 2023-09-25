import {useState} from "react";

function MyBooklist(){
    const[newPost, setNewPost] = useState({title : '', author : '', date : '', plot : ''});
    const[posts, setPosts] = useState([]);
    const[toggleStates1, setToggleStates1] = useState([]);
    const hstateChange = (index)=>{
        const newCopy = [...toggleStates1];
        newCopy[index] = !newCopy[index];
        setToggleStates1(newCopy);
    }
    
    const[toggleStates2, setToggleStates2] = useState([]);
    const lstateChange = (index)=>{
        const newCopy = [...toggleStates2];
        newCopy[index] = !newCopy[index];
        setToggleStates2(newCopy);
    }

    return(
        <>
            <div className="green-nav">
                <h1>My Book List</h1>
            </div>
            <div className="typeColumn">
                <h2>도서 정보 입력</h2>
            </div>
            <div className="typeRow">
                <div className="typeColumn">
                    <div className="inputList">책제목</div>
                    <div className="inputList">저자</div>
                    <div className="inputList">출간일</div>
                </div>
                <div className="typeColumn">
                    <input type="text" placeholder="제목을 입력하세요" value={newPost.title}
                            onChange={(e)=>{
                                setNewPost({...newPost, title : e.target.value});
                            }}>
                    </input>
                    <input type="text" placeholder="저자를 입력하세요" value={newPost.author}
                            onChange={(e)=>{
                                setNewPost({...newPost, author : e.target.value});
                            }}>
                    </input>
                    <input type="text" placeholder="출간일을 입력하세요" value={newPost.date}
                            onChange={(e)=>{
                                setNewPost({...newPost, date : e.target.value});
                            }}>
                    </input>
                </div>
            </div>
            <div className="typeColumn">
                <div className="inputList" style={{width : "300px"}}>줄거리</div>
                <textarea placeholder="내용을 입력하세요" value={newPost.plot}
                            onChange={(e)=>{
                                setNewPost({...newPost, plot : e.target.value});
                            }}>
                </textarea><br></br>

                <button className="post" onClick={()=>{
                    if(newPost.title && newPost.author && newPost.date && newPost.plot){
                        const updatePosts = [...posts, {...newPost, id : Date.now()}]
                        setPosts(updatePosts);
                        setNewPost({title : '', author : '', date : '', plot : ''});
                    }

                }}>게시</button>
            </div>
            <p></p>
            <div className="typeColumn grid-Container">
                    <h2>도서 목록</h2>
                    
                    {
                        posts.map((post, i)=>{
                            return(
                            <>
                                <div className="bgArea">
                                    {/* src 속성에 대한 조건부 설정 */}
                                    <img src={toggleStates1[i] === true ? `${process.env.PUBLIC_URL}/heart.png`
                                            : `${process.env.PUBLIC_URL}/emptyheart.png`}
                                            onClick={()=>{hstateChange(i)}} /><p></p>
                                            
                                    <div>
                                    <span key={posts.id}>
                                        <div className="postInfo">
                                            <div className="titleArea" onClick={()=>{lstateChange(i)}}>{posts[i].title}</div>
                                            {
                                                toggleStates2[i] === true ? <Detail author={posts[i].author} date={posts[i].date} 
                                                plot={posts[i].plot}></Detail> : null
                                            }
                                        </div>
                                    </span><p></p>
                                    </div>

                                    <button className="delete" onClick={(e)=>{
                                        e.stopPropagation();
                                        let copy = [...posts];
                                        copy.splice(i,1);
                                        setPosts(copy);
                                    }}>삭제</button>
                                </div><p></p>
                            </>
                            )
                        })
                    }
                </div>
        </>
    )
}

function Detail(props){
    return(
        <>
            <span key={props.id}>
                <span>저자 : {props.author} | 출간일 : {props.date}</span>
                <div className="postPlot">{props.plot}</div>
            </span><p></p>
        </>
    )
}

export default MyBooklist;