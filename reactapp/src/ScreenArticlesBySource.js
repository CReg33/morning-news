import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import './App.css';
import { Card, Icon, Modal} from 'antd';
import Nav from './Nav'

const { Meta } = Card;

function ScreenArticlesBySource(props) {
  
  const [articleList, setArticleList] = useState([]);
  // MODAL 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  var showModal = (title, content) => {
    setIsModalVisible(true);
    setTitle(title);
    setContent(content);
  }
  const handleOk = () => {setIsModalVisible(false);};
  const handleCancel = () => {setIsModalVisible(false);};
// END MODAL

let {id} = useParams();
console.log("id", id);

useEffect(() => {
  async function loadArticleListFromAPI() {
        const rawResponse = await  fetch(`https://newsapi.org/v2/top-headlines?sources=${id}&apiKey=144f98c6a74b45989fc567137d8f4b7c`);
        const response = await rawResponse.json();
        setArticleList(response.articles);
      }
      loadArticleListFromAPI();
  }, [id]); 

  return (
    <div>
            <Nav/>
            <div className="Banner"/>
            <div className="Card">
              {articleList.length >0 && articleList.map((article,i) => {
                return (
                <div style={{display:'flex',justifyContent:'center'}}>
                <Card
                  key={i}
                  style={{ 
                  width: 300, 
                  margin:'15px', 
                  display:'flex',
                  flexDirection: 'column',
                  justifyContent:'space-between' }}
                  cover={
                  <img
                      alt={article.title}
                      src={article.urlToImage}
                  />
                  }
                  actions={[
                    <div>
                    <Icon type="read" key="ellipsis2" onClick={()=>showModal(article.title, article.description)}/>
                    <Modal title={title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <p>{content}</p>
                      </Modal>                    
                    </div>,
                     <Icon type="like" key="ellipsis" onClick={ ()=>props.addToWishList(article) }/>,
                  ]}
                  >
                  <Meta
                    title={article.title}
                    description={article.description}
                  />
                </Card>
                </div>
              )})}
           </div> 
      </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addToWishList: function(article) {
      dispatch({type: 'addArticle', article})
    }
  }}
function mapStateToProps(state) {
  return { userToken: state.token }
  }  
  
export default connect(mapStateToProps,mapDispatchToProps)(ScreenArticlesBySource);
