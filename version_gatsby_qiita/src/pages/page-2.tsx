// Gatsby supports TypeScript natively!
import React, { FunctionComponent, useState, useEffect } from "react"
import { PageProps, Link } from "gatsby"
import axios from "axios";

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage:FunctionComponent = (props: PageProps) => {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    axios.get(`http://qiita.com/api/v2/items`)
      .then(res => {
        setDatas(res.data);
      })
      .catch(res => {
        console.log(res);
      });
  }, [])

  return <Layout>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2 ({props.path})</p>
    <Link to="/">Go back to the homepage</Link>
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

/*
const userId = 'ko2ic';
axios.get(`http://qiita.com/api/v2/users/${userId}/items`)
  .then(res => console.log(res))
  .catch(res => console.log(res));
*/

export default SecondPage
