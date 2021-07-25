import React, {useState,useEffect} from 'react';
import {List,Image,Search} from 'semantic-ui-react';
import axios from 'axios';
import cookie from 'js-cookie';
import Router from 'next/router';
import baseUrl from '../../utils/baseUrl';

let cancel;


const SearchComponent=()=>{

    const [text,setText]=useState('');
    const [loading,setLoading]=useState(false);
    const [results,setResults]=useState([]);


    const handleChange = async e => {
        const { value } = e.target;
        setText(value);
        setLoading(true);
        if(value.length===0) return setText(value);
        
    
        //trim will remove white spaces.
      if (value.trim().length === 0) {
        return;
      }

        try {
          cancel && cancel();
          const CancelToken = axios.CancelToken;
          const token = cookie.get("token");
    
          const res = await axios.get(`${baseUrl}/api/search/${value}`, {
            headers: { Authorization: token },
            cancelToken: new CancelToken(canceler => {
              cancel = canceler;
            })
          });
    
          if (res.data.length === 0) {
            results.length > 0 && setResults([]);            
            return setLoading(false);
          }
    
          setResults(res.data);
        } catch (error) {
         console.log('catch-error',error);
        }
    
        setLoading(false);
      };

      useEffect(()=>{
        if(text.length === 0 && loading) {
          setLoading(true)
        }
      },[text])


      return (
        <Search
          onBlur={() => {
            results.length > 0 && setResults([]);
            loading && setLoading(false);
            setText('');
          }}
          loading={loading}
          value={text}
          resultRenderer={ResultRenderer}
          results={results}
          onSearchChange={handleChange}
          minCharacters={1}
          onResultSelect={(e, data) => Router.push(`/${data.result.username}`)}
        />
      );
}

const ResultRenderer=({_id,profilePicUrl,name})=>{
    return(
        <List key={_id}>
            <List.Item>
                <Image src={profilePicUrl} alt="ProfilePic" avatar />
                <List.Content header={name} as ='a'/>
            </List.Item>
        </List>
    )
}
export default SearchComponent;