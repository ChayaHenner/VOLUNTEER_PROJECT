import React from 'react'

const Post = ({post}) => {
  return (
    <div>
    <div>{Post}</div>
    <h2>{post.title}</h2>
    <div>{post.description}</div>
    <div>{post.like_nums}</div>
{/* <button>like</button> */}
    </div>
  )
}

export default Post