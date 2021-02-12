import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav'

function ScreenSource(props) {

  const [ screenSource, setScreenSource ] = useState([]);
  useEffect(() => {
  async function loadSources() {
        const rawResponse = await fetch(`https://newsapi.org/v2/sources?apiKey=144f98c6a74b45989fc567137d8f4b7c&country=${props.countrySelected}`);
        const response = await rawResponse.json();
        console.log("response", response);
        setScreenSource(response.sources);
      }
      loadSources();
  }, [props.countrySelected]); 

  return (
    <div>
        <Nav/>       

       <div className="Banner">
                <img className="Flag" src='/images/France.png' alt="France flag" onClick={()=>props.selectCountryNews('fr')}/>
                <img className="Flag" src='/images/United_Kingdom.png' alt="UK flag" onClick={()=>props.selectCountryNews('gb')} />
                <img className="Flag" src='/images/Spain.png' alt="Spain flag" onClick={()=>props.selectCountryNews('es')} />
                <img className="Flag" src='/images/USA.jpg' alt="USA flag" onClick={()=>props.selectCountryNews('us')} />
                <img className="Flag" src='/images/Brazil.png' alt="Brazil flag" onClick={()=>props.selectCountryNews('br')} />
      </div>
       <div className="HomeThemes">
              <List
                  itemLayout="horizontal"
                  dataSource={screenSource}
                  renderItem={(source,i) => (
                    <List.Item key={i}>
                      <List.Item.Meta
                        avatar={ <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={<Link to={`/screenarticlesbysource/${source.id}`}>{source.name}</Link>}
                        description={source.description}
                      />
                    </List.Item>
                  )}
                />
          </div>        
      </div>
  );
}

function mapStateToProps(state) {
  return { userToken: state.token, countrySelected: state.country }
}

function mapDispatchToProps(dispatch) {
  return {
    selectCountryNews: function(country) {
      dispatch({type: 'selectCountry', country})
    }
  }}

export default connect(mapStateToProps,mapDispatchToProps)(ScreenSource);