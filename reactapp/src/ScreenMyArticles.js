import React from 'react';
import {connect} from 'react-redux';
import './App.css';
import { Card, Icon} from 'antd';
import Nav from './Nav';

const { Meta } = Card;

function ScreenMyArticles(props) {

  const displayMyArticles = props.myArticles.map((article, i) => { 
    return(
        <div style={{display:'flex', justifyContent:'center'}}>
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
              alt="example"
              src={article.urlToImage}
          />
          }
          actions={[
            <Icon type="read" key="ellipsis2" />,
            <Icon type="delete" key="ellipsis" onClick={ ()=>props.deleteToWishList(i) } />
          ]}
          >
          <Meta
            title={article.title}
            description={article.description}
          />           
        </Card>
      </div>
 ) });

  return (
    <div>
        {console.log("ScreenMyArticles > Props my articles", props.myArticles , " props token ", props.userToken)}
            <Nav/>
            <div className="Banner"/>
            <div className="Card">
              {props.myArticles.length ===0 ? <p>No articles.</p> : displayMyArticles}
             </div>
      </div>
  );
}

function mapStateToProps(state) {
  return { myArticles: state.article, userToken: state.token }
}
function mapDispatchToProps(dispatch) {
  return {
    deleteToWishList: function(index) {
      dispatch({type: 'deleteArticle', index})
    }
}}

export default connect(mapStateToProps,mapDispatchToProps)(ScreenMyArticles);