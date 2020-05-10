import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
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
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      {allMarkdownRemark.nodes.map((node) => (
        <div key={node.id}>
          <h3>{node.frontmatter.title}</h3>
          <p>{node.frontmatter.date}</p>
          <p>{node.frontmatter.tags}</p>
          <div dangerouslySetInnerHTML={{ __html: node.html}} />
        </div>
      ))}
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  );
}

export default IndexPage
