
import { useEffect, useState } from 'react'
import $, { data } from 'jquery'

import PostList from '../PostList/PostList'

import foodThum1 from '../../assets/images/FoodThumnail/bun.png'
import foodThum2 from '../../assets/images/FoodThumnail/pho.png'
import foodThum3 from '../../assets/images/FoodThumnail/doannhanh.png'
import foodThum4 from '../../assets/images/FoodThumnail/dohan.png'
import foodThum6 from '../../assets/images/FoodThumnail/donhat.png'

import rightArrow from '../../assets/images/icons/right.png'
import leftArrow from '../../assets/images/icons/left.png'

import { fetchProducts } from '../../api'

const LIST_LENGTH = 6;
const MAX_PAGENUMBER_SHOW = 3;

let datapage_callAPI = [
    {img: foodThum1, name: "Bún Đậu Mắm Tôm chuẩn ngon", link: "/item", rating: 4, rvcount: 12.567, price: 89, brand: "Friggitoria"},
    {img: foodThum2, name: "Cơm Tấm Hoàng Diệu 2", link: "/item", rating: 3.5, rvcount: 8.291, price: 25, brand: "Flavour of India"},
    {img: foodThum3, name: "Cá Viên Chiên Makima", link: "/item", rating: 5, rvcount: 163.523, price: 999, brand: "Sunrise Foods"},
    {img: foodThum4, name: "Nem Cuốn Hàn Xẻng", link: "/item", rating: 3.5, rvcount: 1.286, price: 56, brand: "Sunrise Foods"},
    {img: foodThum6, name: "Thập Cẩm Chả Biết Tên", link: "/item", rating: 1, rvcount: 15.927, price: 102, brand: "Panzer Hot"},
    {img: foodThum2, name: "Cơm Chay Chỉ Thiên", link: "/item", rating: 3, rvcount: 26.546, price: 89, brand: "Sunrise Foods"},
    {img: foodThum1, name: "Bún Đậu Mắm Tôm không ngon lắm", link: "/item", rating: 4, rvcount: 12.567, price: 89, brand: "Friggitoria"},
    {img: foodThum2, name: "Cơm Tấm Lê Hồng Phong", link: "/item", rating: 2.5, rvcount: 8.291, price: 25, brand: "Flavour of India"},
    {img: foodThum3, name: "Cá Viên Chiên", link: "/item", rating: 5, rvcount: 163.523, price: 999, brand: "Sunrise Foods"},
    {img: foodThum4, name: "Nem Cuốn Chị Ngọc", link: "/item", rating: 3.5, rvcount: 1.286, price: 56, brand: "Sunrise Foods"},
    {img: foodThum6, name: "Xalach trộn đặc biệt", link: "/item", rating: 4, rvcount: 15.927, price: 102, brand: "Panzer Hot"},
    {img: foodThum2, name: "Cơm Chay số 512", link: "/item", rating: 3, rvcount: 26.546, price: 89, brand: "Sunrise Foods"},
    {img: foodThum2, name: "Cơm Chay Hoàng Diệu 2", link: "/item", rating: 3, rvcount: 26.546, price: 89, brand: "Sunrise Foods"},
    {img: foodThum1, name: "Bún Đậu Mắm Tôm tạm được", link: "/item", rating: 1, rvcount: 12.567, price: 89, brand: "Friggitoria"},
    {img: foodThum2, name: "Cơm Tấm Kha Vạn Cân", link: "/item", rating: 3.5, rvcount: 8.291, price: 25, brand: "Flavour of India"},
    {img: foodThum3, name: "Bò Viên Chiên", link: "/item", rating: 5, rvcount: 163.523, price: 999, brand: "Sunrise Foods"},
    {img: foodThum4, name: "Nem Cuốn Ba Phương", link: "/item", rating: 3.5, rvcount: 1.286, price: 56, brand: "Sunrise Foods"},
    {img: foodThum6, name: "Thập Cẩm Ai Biết Gì", link: "/item", rating: 4, rvcount: 15.927, price: 102, brand: "Panzer Hot"},
    {img: foodThum2, name: "Cơm Chay Kha Vạn Cân", link: "/item", rating: 3, rvcount: 26.546, price: 89, brand: "Sunrise Foods"},
    {img: foodThum6, name: "Salat bò lá lốt", link: "/item", rating: 4, rvcount: 15.927, price: 102, brand: "Panzer Hot"},
    {img: foodThum2, name: "Cơm Sườn Bì Chả", link: "/item", rating: 2, rvcount: 26.546, price: 89, brand: "Sunrise Foods"},
    {img: foodThum2, name: "Cơm Sườn Đặc Biệt", link: "/item", rating: 3, rvcount: 26.546, price: 89, brand: "Sunrise Foods"},
    {img: foodThum1, name: "Bún Đậu Mắm Tôm vô địch", link: "/item", rating: 4, rvcount: 12.567, price: 89, brand: "Friggitoria"},
    {img: foodThum2, name: "Cơm Tấm Sư Vạn Hạnh", link: "/item", rating: 3.5, rvcount: 8.291, price: 25, brand: "Flavour of India"},
    {img: foodThum3, name: "Tôm Viên Chiên", link: "/item", rating: 5, rvcount: 163.523, price: 999, brand: "Sunrise Foods"},
    {img: foodThum4, name: "Nem Cuốn", link: "/item", rating: 3.5, rvcount: 1.286, price: 56, brand: "Sunrise Foods"},
    {img: foodThum6, name: "Thập Cẩm Gì Gì đó", link: "/item", rating: 4, rvcount: 15.927, price: 102, brand: "Panzer Hot"},
    {img: foodThum2, name: "Cơm Chay Tô Ngọc Vân", link: "/item", rating: 1, rvcount: 26.546, price: 89, brand: "Sunrise Foods"}
];

let posts = [
    {img: foodThum1, name: "Bún Đậu Mắm Tôm chuẩn ngon", link: "/item", rating: 4, rvcount: 12.567, price: 89, brand: "Friggitoria"},
    {img: foodThum2, name: "Cơm Tấm Hoàng Diệu 2", link: "/item", rating: 3.5, rvcount: 8.291, price: 25, brand: "Flavour of India"},
    {img: foodThum3, name: "Cá Viên Chiên Makima", link: "/item", rating: 5, rvcount: 163.523, price: 999, brand: "Sunrise Foods"},
    {img: foodThum4, name: "Nem Cuốn Hàn Xẻng", link: "/item", rating: 3.5, rvcount: 1.286, price: 56, brand: "Sunrise Foods"},
    {img: foodThum6, name: "Thập Cẩm Chả Biết Tên", link: "/item", rating: 1, rvcount: 15.927, price: 102, brand: "Panzer Hot"},
    {img: foodThum2, name: "Cơm Chay Chỉ Thiên", link: "/item", rating: 3, rvcount: 26.546, price: 89, brand: "Sunrise Foods"},
    {img: foodThum1, name: "Bún Đậu Mắm Tôm không ngon lắm", link: "/item", rating: 4, rvcount: 12.567, price: 89, brand: "Friggitoria"},
    {img: foodThum2, name: "Cơm Tấm Lê Hồng Phong", link: "/item", rating: 2.5, rvcount: 8.291, price: 25, brand: "Flavour of India"},
    {img: foodThum3, name: "Cá Viên Chiên", link: "/item", rating: 5, rvcount: 163.523, price: 999, brand: "Sunrise Foods"},
    {img: foodThum4, name: "Nem Cuốn Chị Ngọc", link: "/item", rating: 3.5, rvcount: 1.286, price: 56, brand: "Sunrise Foods"},
    {img: foodThum6, name: "Xalach trộn đặc biệt", link: "/item", rating: 4, rvcount: 15.927, price: 102, brand: "Panzer Hot"},
    {img: foodThum2, name: "Cơm Chay số 512", link: "/item", rating: 3, rvcount: 26.546, price: 89, brand: "Sunrise Foods"},
    {img: foodThum2, name: "Cơm Chay Hoàng Diệu 2", link: "/item", rating: 3, rvcount: 26.546, price: 89, brand: "Sunrise Foods"},
    {img: foodThum1, name: "Bún Đậu Mắm Tôm tạm được", link: "/item", rating: 1, rvcount: 12.567, price: 89, brand: "Friggitoria"},
    {img: foodThum2, name: "Cơm Tấm Kha Vạn Cân", link: "/item", rating: 3.5, rvcount: 8.291, price: 25, brand: "Flavour of India"},
    {img: foodThum3, name: "Bò Viên Chiên", link: "/item", rating: 5, rvcount: 163.523, price: 999, brand: "Sunrise Foods"},
    {img: foodThum4, name: "Nem Cuốn Ba Phương", link: "/item", rating: 3.5, rvcount: 1.286, price: 56, brand: "Sunrise Foods"},
    {img: foodThum6, name: "Thập Cẩm Ai Biết Gì", link: "/item", rating: 4, rvcount: 15.927, price: 102, brand: "Panzer Hot"},
    {img: foodThum2, name: "Cơm Chay Kha Vạn Cân", link: "/item", rating: 3, rvcount: 26.546, price: 89, brand: "Sunrise Foods"},
    {img: foodThum6, name: "Salat bò lá lốt", link: "/item", rating: 4, rvcount: 15.927, price: 102, brand: "Panzer Hot"},
    {img: foodThum2, name: "Cơm Sườn Bì Chả", link: "/item", rating: 2, rvcount: 26.546, price: 89, brand: "Sunrise Foods"},
    {img: foodThum2, name: "Cơm Sườn Đặc Biệt", link: "/item", rating: 3, rvcount: 26.546, price: 89, brand: "Sunrise Foods"},
    {img: foodThum1, name: "Bún Đậu Mắm Tôm vô địch", link: "/item", rating: 4, rvcount: 12.567, price: 89, brand: "Friggitoria"},
    {img: foodThum2, name: "Cơm Tấm Sư Vạn Hạnh", link: "/item", rating: 3.5, rvcount: 8.291, price: 25, brand: "Flavour of India"},
    {img: foodThum3, name: "Tôm Viên Chiên", link: "/item", rating: 5, rvcount: 163.523, price: 999, brand: "Sunrise Foods"},
    {img: foodThum4, name: "Nem Cuốn", link: "/item", rating: 3.5, rvcount: 1.286, price: 56, brand: "Sunrise Foods"},
    {img: foodThum6, name: "Thập Cẩm Gì Gì đó", link: "/item", rating: 4, rvcount: 15.927, price: 102, brand: "Panzer Hot"},
    {img: foodThum2, name: "Cơm Chay Tô Ngọc Vân", link: "/item", rating: 1, rvcount: 26.546, price: 89, brand: "Sunrise Foods"}
];

function Posts() {
    let [datapage_callAPI, setInitData] = useState([]);
    let [posts, setPosts] = useState([]);

    let [current_post, setCurrentPosts]= useState([]);
    const [lastpost_index, setLastPostIndex] = useState(1);
    const [page_count, setPageCount] = useState(1);
    
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetchProducts();

                const prods = response.data;

                setInitData(prods);
                setPosts(prods);

                const current_posts = prods.slice(0, LIST_LENGTH);
                setCurrentPosts(current_posts);
                setLastPostIndex(current_posts.length - 1);
                setPageCount(prods.length % LIST_LENGTH !== 0 ? Math.floor(prods.length / LIST_LENGTH) + 1 : Math.floor(prods.length / LIST_LENGTH))

                // setCurrentPost();
            } catch (err) {
                
            }
        };

        getData();
    }, []);
    
    const handleChangePost = (type) => {
        if(type === 'all') {
            posts=datapage_callAPI;
            setPosts(datapage_callAPI);
            let newPageCount = posts.length % LIST_LENGTH !== 0 ? Math.floor(posts.length / LIST_LENGTH) + 1 : Math.floor(posts.length / LIST_LENGTH);
            setPageCount(newPageCount)
            changepagenumber(1, newPageCount);
        }
        else if (type === '1star') {
            let list_1star = [];
            datapage_callAPI.forEach(post => {
                if(post.rating === 1)
                    list_1star.push(post);
            })
            console.log("vcl", list_1star);
            posts=list_1star;
            setPosts(list_1star);
            let newPageCount = list_1star.length % LIST_LENGTH !== 0 ? Math.floor(list_1star.length / LIST_LENGTH) + 1 : Math.floor(list_1star.length / LIST_LENGTH);
            setPageCount(newPageCount)
            changepagenumber(1, newPageCount);
        }
    }
    const countPostByStar = (star) => {
        let number_of_post = 0;
        datapage_callAPI.map(post => {
            if(post.rating === 1) 
                ++number_of_post;
        })
        return number_of_post;
    } 
    const changepagenumber = (index, total) => {
        if(index > 0 && index <= total) {
            let newPostList = [];
            let start = (index - 1) * LIST_LENGTH;
            let end = start + LIST_LENGTH;

            // Move to the head of page
            $('html, body').animate({ scrollTop: 0 }, 'fast');

            if(posts.length <= end)
                end = posts.length;
            for(; start < end; start++) {
                newPostList.push(posts[start]);
            }

            setLastPostIndex(--end);
            setCurrentPosts(newPostList);
        }
        if(total === 0) {
            setLastPostIndex(0);
            setCurrentPosts([]);
        }
    }
    const createPageNumber = (total) => {
        if(total > 1) {
            let current_page = Math.floor(lastpost_index / LIST_LENGTH) + 1;
            let pageNumBtn = [];
            let numberOfNBTN = 0;

            // Create prevpage_btn
            pageNumBtn.push (
                <span className='pe-1' key='prev'>
                    <button type='button' className='page-number-btn' onClick={() => changepagenumber(current_page - 1, total)}>
                        <img src={leftArrow} className='img-fluid' alt='prev'/>
                    </button>
                </span>
            )
            // Create numberpage_btn
            for(let i = 1; i <= total && numberOfNBTN < MAX_PAGENUMBER_SHOW; i++) {
                let class_name = 'page-number-btn';
                if(i === current_page)
                    class_name += ' page-number-btn-active';
                pageNumBtn.push (
                    <span className='pe-1' key={i}>
                        <button 
                            type='button' 
                            className={class_name}
                            onClick={() => changepagenumber(i, total)}
                            id={'page-btn-' + i}
                        >
                            {i}
                        </button>
                    </span>
                )
                ++numberOfNBTN;
                if(numberOfNBTN === MAX_PAGENUMBER_SHOW && current_page >= i && i + 1 <= total) {
                    pageNumBtn.splice(1, 1);
                    --numberOfNBTN;
                }
            }
            // Create nextpage_btn
            pageNumBtn.push (
                <span className='pe-1' key='next'>
                    <button type='button' className='page-number-btn' onClick={() => changepagenumber(current_page + 1, total)}>
                        <img src={rightArrow} className='img-fluid' alt='next'/>
                    </button>
                </span>
            )

            return (
                <div className='d-flex justify-content-center align-items-center'>
                    {pageNumBtn}
                </div>
            )
        }
        else {
            return (<></>);
        }
    }
    const deletePost = (name) => {
        // call api to delete post
        let newList = [];
        for(let i = 0; i < datapage_callAPI.length; i++) {
            if(datapage_callAPI[i].name !== name) {
                newList.push(datapage_callAPI[i]);
            }
        }
        datapage_callAPI = newList;
        posts = newList;
        let newPageCount = posts.length % LIST_LENGTH !== 0 ? Math.floor(posts.length / LIST_LENGTH) + 1 : Math.floor(posts.length / LIST_LENGTH);
        setPageCount(newPageCount)
        changepagenumber(1, newPageCount);
    }
    return (
        <div className='admin-content pt-2'>
            <div className='row bg-white border-radius-smooth'>
                <div className='col-12 p-4'>
                    <p className='formal-font text-lg text-bold'>POST CENTER</p>
                    <hr/>
                </div>
                <div className='col-12 col-md-3'>
                    <div className='d-flex justify-content-center pb-2'>
                        <button 
                            type='button' 
                            className='post-menu-btn w-75'
                            onClick={() => handleChangePost('all')}
                        >
                            <i className="fa-solid fa-caret-right pe-2 opacity-75"></i>
                            <span className='formal-font text-me'>ALL POSTS</span>
                            <div className='post-square-num'>
                                {datapage_callAPI.length}
                            </div>
                        </button>
                    </div>
                    <div className='d-flex justify-content-center pb-4'>
                        <button 
                            type='button' 
                            className='post-menu-btn w-75'
                            onClick={() => handleChangePost('1star')}
                        >
                            <i className="fa-solid fa-caret-right pe-2 opacity-75"></i>
                            <span className='formal-font text-me'>RATED 1 STAR</span>
                            <div className='post-square-num'>
                                {countPostByStar(1)}
                            </div>
                        </button>
                    </div>
                </div>
                <div className='col-12 col-md-9'>
                    <div className='row pe-2'>
                        <PostList posts={current_post} callbackDelete={deletePost}/>
                    </div>
                    <div className='row pb-4'>
                        {createPageNumber(page_count)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Posts;