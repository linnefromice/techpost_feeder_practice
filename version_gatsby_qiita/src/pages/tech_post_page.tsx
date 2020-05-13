// Gatsby supports TypeScript natively!
import React, { FunctionComponent, useState, useEffect } from "react"
import { PageProps, Link } from "gatsby"
import axios from "axios";
import { Card, CardActions, CardContent, Button, Grid } from '@material-ui/core';

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
    <SEO title="Tech Post Page" />
    <h1>Welcome to Tech Post Page ({props.path})</h1>
    <Link to="/">Go back to the homepage</Link>
    
    <div>
      UserID: <input type="text" value={userId} onChange={changeUserId} />
      <button onClick={sendRequest}>REQUEST</button>
    </div>

    <Grid container spacing={3}>
    {datas.map((data) => (
      <Grid item xs={6}>
        <Card key={data.id} style={{ padding: `10.0px`, margin: `10.0px` }}>
          <CardContent>
            <h3>{data.title}</h3>
            <p>{data.user.name} / {data.created_at}</p>
          </CardContent>
          <CardActions>
            <a href={data.url}><Button size="small">LINK</Button></a>
          </CardActions>
        </Card>
      </Grid>
     ))}
    </Grid>
  </Layout>
}

export default TechPostPage
