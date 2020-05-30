import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Card,Spinner} from 'react-bootstrap'
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

import fetchBlogList from '../../actions/blogActions'

function Blogs() {
    useBottomScrollListener(handlePagination,50);
    const dispatch = useDispatch()
    const blogList = useSelector(state => state.blogList)
    const [page, handlePage] = useState(1)
    const [isScroll,handleIsScrolling] = useState(false)

    async function handlePagination() {
        if(blogList.next !==null && !isScroll){
            handleIsScrolling(true)
            await dispatch(fetchBlogList(page+1))
            handlePage(page+1)
            handleIsScrolling(false)
        }
    }

    useEffect(() => {
        async function callFetchBlogList() {
            await dispatch(fetchBlogList())
        }
        callFetchBlogList()
    }, [dispatch])

    return (
        <div  className='p-4'>
            <h3 className='blog-heading'>What's happening?</h3>
            <div className='d-flex flex-column'>
            {blogList.blogs.map((blog,key) => (
                <Card className='blog-card mb-2' key={key}>
                    <Card.Header>
                        <div className='d-flex'>
                            <img width="70px" src='./mark.png' alt='user' />
                            <div className='d-flex flex-column justify-content-center'>
                                <span>{blog.author.first_name} {blog.author.last_name}</span>
                                <span className='time-in-card'>4 hours ago</span>
                            </div>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        {/* <Card.Subtitle className="mb-2 text-muted">{blog.title}</Card.Subtitle> */}
                        <Card.Text>
                        {blog.content}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
            <div className='text-center'>
            {isScroll && <Spinner className='spinner' animation="border" />}
            </div>
            </div>
        </div>
    )
}

export default Blogs