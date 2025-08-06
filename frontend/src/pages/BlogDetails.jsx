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
    console.log("hello",data);

  return (
    <div>
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold mb-6 text-center">{data?.title}</h2>
        <p className="text-gray-600 mb-4">{data?.description}</p>
        <p className="text-gray-500 text-sm">
          By {data?.author?.username} on{" "}
          {new Date(data?.date).toLocaleDateString()}
        </p>
        <div className="mt-4">
          <p className="text-gray-700">{data?.content}</p>
        </div>
      </div>
    </div>
  )
}

export default BlogDetails