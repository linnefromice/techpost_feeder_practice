import React from "react"
import { Link } from "gatsby"
import { Card, CardActions, CardContent, Chip } from '@material-ui/core';

import Layout from "../components/layout"
import SEO from "../components/seo"

import { useStaticQuery, graphql } from "gatsby"

const IndexPage = () => {
  const { site, allMarkdownRemark } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            description
          }
        }
        allMarkdownRemark {
          nodes {
            id
            frontmatter {
              title
              path
              date
              tags
            }
            html
          }
        }
      }
    `
  );

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>{site.siteMetadata.description}</p>
      <h1>Blog Post Page</h1>
      {allMarkdownRemark.nodes.map((node) => (
        <Card key={node.id} style={{ padding: `10.0px`, margin: `10.0px` }}>
          <CardContent>
            <h3>{node.frontmatter.title}</h3>
            <p>{node.frontmatter.date}</p>
            {node.frontmatter.tags.map((tag) => (
              <Chip label={tag}/>
            ))}
            <div dangerouslySetInnerHTML={{ __html: node.html}} />
          </CardContent>
          <CardActions></CardActions>
        </Card>
      ))}
      <Link to="/tech_post_page/">Go to Tech Post Page</Link>
    </Layout>
  );
}

export default IndexPage

/*
          
          */