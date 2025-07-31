import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchBlogDetails = async (_id) => {
  const response = await axios.get(`/api/blogs/${_id}`);
//   console.log(response)
    if (!response.data) {
        throw new Error('Blog not found');
    }
    return response.data;
}
const BlogDetails = () => {

    const { _id } = useParams();
    // console.log(_id);
    const {data} = useQuery({
        queryKey: ['blogDetails', _id],
        queryFn: () => fetchBlogDetails(_id),
    })
    console.log(data);

  return (
    <div>
        hello
    </div>
  )
}

export default BlogDetails