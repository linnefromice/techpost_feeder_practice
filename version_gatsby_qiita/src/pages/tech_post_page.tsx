// Gatsby supports TypeScript natively!
import React, { FunctionComponent, useState, useEffect } from "react"
import { PageProps, Link } from "gatsby"
import axios from "axios";

import Layout from "../components/layout"
import SEO from "../components/seo"

const TechPostPage:FunctionComponent = (props: PageProps) => {
  const [datas, setDatas] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    axios.get(`http://qiita.com/api/v2/items`)
      .then(res => {
        setDatas(res.data);
      })
      .catch(res => {
        console.log(res);
      });
  }, [])

  function changeUserId(event) {
    setUserId(event.target.value)
  }

  function sendRequest(event) {
    let url = `http://qiita.com/api/v2`;
    if (userId == "" || userId == null) {
      url += `/items`;
    } else {
      url += `/users/${userId}/items`
    }
    console.log(url);
    axios.get(url)
      .then(res => {
        setDatas(res.data);
      })
      .catch(res => {
        console.log(res);
      });

    event.preventDefault;
  }

  return <Layout>
    <SEO title="Page two" />
    <h1>Hi from the Tech Post Page</h1>
    <p>Welcome to Tech Post Page ({props.path})</p>
    <Link to="/">Go back to the homepage</Link>
    
    <div>
      UserID: <input type="text" value={userId} onChange={changeUserId} />
      <button onClick={sendRequest}>REQUEST</button>
    </div>

    {datas.map((data) => (
        <div key={data.id}>
          <h3>{data.title}</h3>
          <p>{data.user.name}</p>
          <p>{data.created_at}</p>
          <a href={data.url}>LINK</a>
        </div>
     ))}
  </Layout>
}

export default TechPostPage
