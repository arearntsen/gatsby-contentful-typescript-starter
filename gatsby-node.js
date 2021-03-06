const path = require(`path`)
// const { createFilePath } = require(`gatsby-source-filesystem`)
/*
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
*/
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allContentfulBlogPost {
        edges {
          node {
            slug
          }
        }
      }
    }
  `).then(result => {
    result.data.allContentfulBlogPost.edges.forEach(({ node }) => {
      createPage({
        path: node.slug,
        component: path.resolve(`./src/templates/blogpost.tsx`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.slug,
        },
      })
    })
  })
}