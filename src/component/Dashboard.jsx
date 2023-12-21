import '../component/css/dashboard.css';
import 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js';
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import Lottie from 'lottie-react';
import myLoad from '../asset/Load.json'



function Dashboard() {
    const [token, setToken] = useState(Cookies.get('token'));
    const [user, setUser] = useState(null);
    const [pageSlice, setPageSlice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    useEffect(function () {
        // Panggil getDataFeedback saat komponen di-mount
        redirectLogin(token, false);
        load(2).then(() => {
            setUser(JSON.parse(Cookies.get('detailUser')));
            setLoading(false);
            console.log(user);
        })
    }, []);

    //distract
    function clickAvatar(){
        const icon = document.getElementById('avatar');
        icon.click(); // click
    }

    //API
    function changeImage(e) {
        const inputAvatar = document.getElementById('avatar');
        setFile(e.target.files[0]); //gabisa
        console.log(e.target.files[0]);
        console.log(file);
        if(file){
            console.log('sudh ada file. kirim api')
        }
    }

    async function load(second) {
        await new Promise((prom) => setTimeout(prom, second * 1000));
    }
    function setActive(i) {
        const navTab = document.getElementsByClassName('nav-tab');
        Array.from(navTab).forEach(function (data, index) {
            data.classList.remove('nav-tab-active');
        });

        navTab[i].classList.add('nav-tab-active');

        setPage(i);
    }

    function setPage(page) {
        setPageSlice(page);
    }

    function page(page) {
        if (page === 0) {
            return <DashboardSlice />
        } else if (page === 1) {
            return <HistorySlice />
        } else if (page === 2) {
            return <SearchSlice />
        } else if (page === 3) {
            return <DeletedSlice />
        } else if (page === 4) {
            return <AboutUs />
        } else if (page === 5) {
            return <Community />
        } else if (page === 6) {
            return <ExploreQoute />
        } else if (page === 7) {
            return <Account />
        } else if (page === 8) {
            //logout
            // return <Account />
        } else {
            return <DashboardSlice />
        }
    }

    function redirectLogin(data, showAlert = true) {
        if (!data && showAlert === true) {
            Swal.fire({
                title: "Malfunction",
                text: 'Kamu belum login. permintaan dibatalkan.',
                icon: "error"
            }).then(() => {
                navigate('/login');

            })
        } else if (!data && showAlert === false) {
            navigate('/login');
        }
    }
    return (
        <div>
            {loading ? (
                <div className="vh-100 row justify-content-center align-items-center">
                    <Lottie
                        animationData={myLoad} // Animasi JSON
                        speed='2'
                        loop={true}
                        autoplay={true}
                        style={{ width: '50%', height: '50%' }}
                    />
                </div>
            ) : (
                <div className="row" style={{ minHeight: 100 + 'vh' }}>
                    <div className="col-lg-3 left-bar py-4">
                        <div className="fs40 text-center">inMoney.</div>
                        <div className="container mt-5">
                            <div className=''>
                                <span className="chip mb-4">Overview</span>

                                <div className="nav-tab nav-tab-active ms-4 mt-4 mb-2" onClick={() => { setActive(0) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path className='fill' d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z" fill="" />
                                    </svg>
                                    <span className="fs18">
                                        Dashboard
                                    </span>
                                </div>

                                <div className="nav-tab ms-4 mb-2" onClick={() => { setActive(1) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path className='stroke' d="M1 9.08796C1.22409 6.88802 2.25026 4.84757 3.88273 3.35593C5.5152 1.86428 7.63969 1.02584 9.85088 1.00059C12.0621 0.975332 14.2052 1.76502 15.8713 3.21899C17.5374 4.67296 18.6099 6.68944 18.8842 8.88369C19.1585 11.0779 18.6153 13.2964 17.3584 15.1157C16.1014 16.9351 14.2186 18.228 12.0693 18.7478C9.91992 19.2676 7.65441 18.9779 5.705 17.934C3.75558 16.8901 2.25872 15.1651 1.5 13.088M1 18.088V13.088H6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <span className="fs18">
                                        History
                                    </span>
                                </div>

                                <div className="nav-tab ms-4 mb-2" onClick={() => { setActive(2) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path className='fill' fill-rule="evenodd" clip-rule="evenodd" d="M11 2C9.56238 2.00016 8.14571 2.3447 6.86859 3.00479C5.59146 3.66489 4.49105 4.62132 3.65947 5.79402C2.82788 6.96672 2.28933 8.32158 2.08889 9.74516C1.88844 11.1687 2.03194 12.6196 2.50738 13.9764C2.98281 15.3331 3.77634 16.5562 4.82154 17.5433C5.86673 18.5304 7.13318 19.2527 8.51487 19.6498C9.89656 20.0469 11.3533 20.1073 12.7631 19.8258C14.1729 19.5443 15.4947 18.9292 16.618 18.032L20.293 21.707C20.4816 21.8892 20.7342 21.99 20.9964 21.9877C21.2586 21.9854 21.5094 21.8802 21.6948 21.6948C21.8802 21.5094 21.9854 21.2586 21.9877 20.9964C21.99 20.7342 21.8892 20.4816 21.707 20.293L18.032 16.618C19.09 15.2939 19.7526 13.6979 19.9435 12.0138C20.1344 10.3297 19.8459 8.62586 19.1112 7.0985C18.3764 5.57113 17.2253 4.28228 15.7904 3.38029C14.3554 2.47831 12.6949 1.99985 11 2ZM5 11C5 10.2121 5.1552 9.43185 5.45673 8.7039C5.75825 7.97595 6.20021 7.31451 6.75736 6.75736C7.31451 6.20021 7.97595 5.75825 8.7039 5.45672C9.43186 5.15519 10.2121 5 11 5C11.7879 5 12.5682 5.15519 13.2961 5.45672C14.0241 5.75825 14.6855 6.20021 15.2426 6.75736C15.7998 7.31451 16.2418 7.97595 16.5433 8.7039C16.8448 9.43185 17 10.2121 17 11C17 12.5913 16.3679 14.1174 15.2426 15.2426C14.1174 16.3679 12.5913 17 11 17C9.4087 17 7.88258 16.3679 6.75736 15.2426C5.63214 14.1174 5 12.5913 5 11Z" fill="" />
                                    </svg>
                                    <span className="fs18">
                                        Search
                                    </span>
                                </div>

                                <div className="nav-tab ms-4 mb-2" onClick={() => { setActive(3) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <g clip-path="url(#clip0_128_2)">
                                            <path className='fill' d="M19.9999 6C20.2547 6.00028 20.4999 6.09788 20.6852 6.27285C20.8706 6.44782 20.9821 6.68695 20.997 6.94139C21.012 7.19584 20.9292 7.44638 20.7656 7.64183C20.602 7.83729 20.37 7.9629 20.1169 7.993L19.9999 8H19.9189L18.9999 19C18.9999 19.7652 18.7075 20.5015 18.1826 21.0583C17.6576 21.615 16.9398 21.9501 16.1759 21.995L15.9999 22H7.99987C6.40187 22 5.09587 20.751 5.00787 19.25L5.00287 19.083L4.07987 8H3.99987C3.74499 7.99972 3.49984 7.90212 3.3145 7.72715C3.12916 7.55218 3.01763 7.31305 3.0027 7.05861C2.98776 6.80416 3.07054 6.55362 3.23413 6.35817C3.39772 6.16271 3.62977 6.0371 3.88287 6.007L3.99987 6H19.9999ZM13.9999 2C14.5303 2 15.039 2.21071 15.4141 2.58579C15.7892 2.96086 15.9999 3.46957 15.9999 4C15.9996 4.25488 15.902 4.50003 15.727 4.68537C15.5521 4.8707 15.3129 4.98223 15.0585 4.99717C14.804 5.01211 14.5535 4.92933 14.358 4.76574C14.1626 4.60214 14.037 4.3701 14.0069 4.117L13.9999 4H9.99987L9.99287 4.117C9.96277 4.3701 9.83715 4.60214 9.6417 4.76574C9.44625 4.92933 9.19571 5.01211 8.94126 4.99717C8.68682 4.98223 8.44769 4.8707 8.27272 4.68537C8.09775 4.50003 8.00015 4.25488 7.99987 4C7.99971 3.49542 8.19028 3.00943 8.53337 2.63945C8.87646 2.26947 9.34671 2.04284 9.84987 2.005L9.99987 2H13.9999Z" fill="" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_128_2">
                                                <rect width="24" height="24" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span className="fs18">
                                        Deleted
                                    </span>
                                </div>


                            </div>
                            <div className='mt-5'>
                                <span className="chip mb-4">Other More</span>

                                <div className="nav-tab mt-4 ms-4 mb-2" onClick={() => { setActive(4) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path className='fill' d="M13 9H11V7H13M13 17H11V11H13M12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2Z" fill="" />
                                    </svg>
                                    <span className="fs18">
                                        About us
                                    </span>
                                </div>

                                <div className="nav-tab ms-4 mb-2" onClick={() => { setActive(5) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path className='fill' d="M4.5 4.5C4.5 3.70435 4.81607 2.94129 5.37868 2.37868C5.94129 1.81607 6.70435 1.5 7.5 1.5C8.29565 1.5 9.05871 1.81607 9.62132 2.37868C10.1839 2.94129 10.5 3.70435 10.5 4.5C10.5 5.29565 10.1839 6.05871 9.62132 6.62132C9.05871 7.18393 8.29565 7.5 7.5 7.5C6.70435 7.5 5.94129 7.18393 5.37868 6.62132C4.81607 6.05871 4.5 5.29565 4.5 4.5ZM14.6685 6.876L14.7315 6.924C15.3679 7.39576 16.1651 7.59663 16.9491 7.48277C17.7331 7.36891 18.4403 6.94956 18.9162 6.31625C19.3922 5.68294 19.5983 4.88708 19.4896 4.10235C19.3809 3.31762 18.9663 2.60774 18.3361 2.12762C17.7059 1.6475 16.9115 1.43612 16.126 1.53963C15.3406 1.64313 14.628 2.0531 14.1437 2.68007C13.6595 3.30705 13.4428 4.10012 13.5412 4.88621C13.6395 5.67231 14.0447 6.3876 14.6685 6.876ZM9.402 9C9.5904 8.64325 9.84883 8.32816 10.1618 8.07359C10.4748 7.81901 10.8359 7.63019 11.2236 7.5184C11.6112 7.40662 12.0174 7.37417 12.4179 7.42301C12.8184 7.47184 13.2049 7.60095 13.5544 7.80262C13.9038 8.00428 14.2089 8.27436 14.4516 8.59668C14.6942 8.91901 14.8694 9.28696 14.9665 9.67854C15.0637 10.0701 15.0808 10.4773 15.017 10.8756C14.9532 11.274 14.8096 11.6554 14.595 11.997C14.1821 12.6542 13.5305 13.1258 12.7772 13.3127C12.0239 13.4996 11.2275 13.3872 10.5552 12.9993C9.88301 12.6113 9.3873 11.9779 9.17225 11.2322C8.9572 10.4864 9.03955 9.68632 9.402 9ZM3.75 9H7.755C7.48841 9.76134 7.43045 10.5801 7.58712 11.3714C7.7438 12.1627 8.10941 12.8977 8.646 13.5H8.25C7.47666 13.4999 6.72217 13.7388 6.08983 14.184C5.45748 14.6292 4.97817 15.2589 4.7175 15.987C4.214 15.7847 3.74257 15.5104 3.318 15.1725C2.19 14.265 1.5 12.924 1.5 11.25C1.5 10.6533 1.73705 10.081 2.15901 9.65901C2.58097 9.23705 3.15326 9 3.75 9ZM15.75 13.5C17.3775 13.5 18.7635 14.5365 19.2825 15.987C19.7925 15.7785 20.2635 15.507 20.682 15.1725C21.81 14.265 22.5 12.924 22.5 11.25C22.5 10.6533 22.2629 10.081 21.841 9.65901C21.419 9.23705 20.8467 9 20.25 9H16.245C16.41 9.4695 16.5 9.975 16.5 10.5C16.5014 11.6072 16.0932 12.6757 15.354 13.5H15.75ZM17.8305 16.392C17.94 16.656 18 16.947 18 17.25C18 18.924 17.3115 20.265 16.182 21.1725C15.0705 22.065 13.5795 22.5 12 22.5C10.4205 22.5 8.9295 22.065 7.818 21.1725C6.69 20.265 6 18.924 6 17.25C5.99921 16.9543 6.05687 16.6614 6.16966 16.388C6.28245 16.1147 6.44815 15.8663 6.65724 15.6572C6.86633 15.4482 7.11469 15.2825 7.38803 15.1697C7.66137 15.0569 7.9543 14.9992 8.25 15H15.75C16.1957 14.9999 16.6313 15.1321 17.0017 15.38C17.3721 15.6278 17.6606 15.98 17.8305 16.392Z" fill="" />
                                    </svg>
                                    <span className="fs18">
                                        Community
                                    </span>
                                </div>

                                <div className="nav-tab ms-4 mb-2" onClick={() => { setActive(6) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                        <path className='fill' d="M10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88333 18.6867 3.825 17.9743 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.263333 12.6833 0.000666667 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31333 4.88333 2.02567 3.825 2.925 2.925C3.825 2.025 4.88333 1.31267 6.1 0.788C7.31667 0.263333 8.61667 0.000666667 10 0C12.4333 0 14.5627 0.762667 16.388 2.288C18.2133 3.81333 19.3507 5.72567 19.8 8.025H17.75C17.4333 6.80833 16.8623 5.721 16.037 4.763C15.2117 3.805 14.1993 3.084 13 2.6V3C13 3.55 12.8043 4.021 12.413 4.413C12.0217 4.805 11.5507 5.00067 11 5H9V7C9 7.28333 8.904 7.521 8.712 7.713C8.52 7.905 8.28267 8.00067 8 8H6V10H8V13H7L2.2 8.2C2.15 8.5 2.10433 8.8 2.063 9.1C2.02167 9.4 2.00067 9.7 2 10C2 12.1833 2.76667 14.0583 4.3 15.625C5.83333 17.1917 7.73333 17.9833 10 18V20ZM19.1 19.5L15.9 16.3C15.55 16.5 15.175 16.6667 14.775 16.8C14.375 16.9333 13.95 17 13.5 17C12.25 17 11.1877 16.5627 10.313 15.688C9.43833 14.8133 9.00067 13.7507 9 12.5C9 11.25 9.43767 10.1877 10.313 9.313C11.1883 8.43833 12.2507 8.00067 13.5 8C14.75 8 15.8127 8.43767 16.688 9.313C17.5633 10.1883 18.0007 11.2507 18 12.5C18 12.95 17.9333 13.375 17.8 13.775C17.6667 14.175 17.5 14.55 17.3 14.9L20.5 18.1L19.1 19.5ZM13.5 15C14.2 15 14.7917 14.7583 15.275 14.275C15.7583 13.7917 16 13.2 16 12.5C16 11.8 15.7583 11.2083 15.275 10.725C14.7917 10.2417 14.2 10 13.5 10C12.8 10 12.2083 10.2417 11.725 10.725C11.2417 11.2083 11 11.8 11 12.5C11 13.2 11.2417 13.7917 11.725 14.275C12.2083 14.7583 12.8 15 13.5 15Z" fill="" />
                                    </svg>
                                    <span className="fs18">
                                        Explore Qoute
                                    </span>
                                </div>

                                <div className="nav-tab ms-4 mb-2" onClick={() => { setActive(7) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path className='fill' d="M3 4.995C3 3.893 3.893 3 4.995 3H19.005C20.107 3 21 3.893 21 4.995V19.005C21 19.5341 20.7898 20.0415 20.4157 20.4157C20.0415 20.7898 19.5341 21 19.005 21H4.995C4.46589 21 3.95846 20.7898 3.58432 20.4157C3.21019 20.0415 3 19.5341 3 19.005V4.995ZM6.357 18H17.847C17.2026 17.0734 16.3435 16.3166 15.3431 15.7942C14.3427 15.2717 13.2306 14.9993 12.102 15C10.9734 14.9993 9.86134 15.2717 8.86091 15.7942C7.86048 16.3166 7.00137 17.0734 6.357 18ZM12 13C12.4596 13 12.9148 12.9095 13.3394 12.7336C13.764 12.5577 14.1499 12.2999 14.4749 11.9749C14.7999 11.6499 15.0577 11.264 15.2336 10.8394C15.4095 10.4148 15.5 9.95963 15.5 9.5C15.5 9.04037 15.4095 8.58525 15.2336 8.16061C15.0577 7.73597 14.7999 7.35013 14.4749 7.02513C14.1499 6.70012 13.764 6.44231 13.3394 6.26642C12.9148 6.09053 12.4596 6 12 6C11.0717 6 10.1815 6.36875 9.52513 7.02513C8.86875 7.6815 8.5 8.57174 8.5 9.5C8.5 10.4283 8.86875 11.3185 9.52513 11.9749C10.1815 12.6313 11.0717 13 12 13Z" fill="" />
                                    </svg>
                                    <span className="fs18">
                                        Account
                                    </span>
                                </div>

                                <div className="nav-tab ms-4 mb-2" onClick={() => { setActive(8) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <g clip-path="url(#clip0_38_374)">
                                            <path className='fill' d="M15.3335 2.66669H4.66683C4.31321 2.66669 3.97407 2.80716 3.72402 3.05721C3.47397 3.30726 3.3335 3.6464 3.3335 4.00002V20C3.3335 20.3536 3.47397 20.6928 3.72402 20.9428C3.97407 21.1929 4.31321 21.3334 4.66683 21.3334H15.3335C15.6871 21.3334 16.0263 21.1929 16.2763 20.9428C16.5264 20.6928 16.6668 20.3536 16.6668 20V16H10.4202C10.2434 16 10.0738 15.9298 9.94876 15.8048C9.82373 15.6797 9.7535 15.5102 9.7535 15.3334C9.7535 15.1565 9.82373 14.987 9.94876 14.8619C10.0738 14.7369 10.2434 14.6667 10.4202 14.6667H16.6668V4.00002C16.6668 3.6464 16.5264 3.30726 16.2763 3.05721C16.0263 2.80716 15.6871 2.66669 15.3335 2.66669Z" fill="" />
                                            <path className='fill' d="M18.7732 11.52C18.6456 11.4108 18.4816 11.3537 18.3138 11.3602C18.146 11.3667 17.9869 11.4362 17.8681 11.5549C17.7494 11.6737 17.6798 11.8328 17.6734 12.0006C17.6669 12.1684 17.724 12.3325 17.8332 12.46L20.0865 14.6667H16.6665V16H20.0865L17.8332 18.3067C17.7634 18.3664 17.7067 18.44 17.6667 18.5227C17.6267 18.6054 17.6042 18.6955 17.6006 18.7873C17.5971 18.8791 17.6126 18.9707 17.6461 19.0562C17.6796 19.1418 17.7304 19.2194 17.7954 19.2844C17.8604 19.3494 17.9381 19.4002 18.0236 19.4337C18.1092 19.4673 18.2007 19.4827 18.2925 19.4792C18.3844 19.4756 18.4744 19.4532 18.5572 19.4131C18.6399 19.3731 18.7134 19.3164 18.7732 19.2467L22.6665 15.38L18.7732 11.52Z" fill="" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_38_374">
                                                <rect width="24" height="24" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span className="fs18">
                                        Logout
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 main-content">
                        {page(pageSlice)}
                    </div>
                    <div className="col-lg-3 right-bar">
                        <div className="container mt-4">
                            <span className="chip mb-4">Infomasi akun</span>
                            <div className="account my-5">
                                <div className="avatar text-center position-relative">
                                    <img src={user.image} alt="" />
                                    <div onClick={clickAvatar} className="position-absolute translate-middle img-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.8523 29.75H20.148C24.5694 29.75 26.7808 29.75 28.3689 28.7087C29.0541 28.2596 29.6443 27.6801 30.1057 27.0031C31.1668 25.4447 31.1668 23.273 31.1668 18.9323C31.1668 14.5902 31.1668 12.4199 30.1057 10.8616C29.6443 10.1846 29.0542 9.605 28.3689 9.15591C27.3489 8.48583 26.0711 8.24641 24.1147 8.16141C23.1811 8.16141 22.3778 7.46725 22.1951 6.56766C22.0554 5.90873 21.6925 5.31822 21.1678 4.89593C20.643 4.47364 19.9886 4.24548 19.315 4.25H14.6853C13.2857 4.25 12.0801 5.22041 11.8052 6.56766C11.6225 7.46725 10.8192 8.16141 9.88566 8.16141C7.93066 8.24641 6.65283 8.48725 5.63141 9.15591C4.94662 9.60509 4.35694 10.1847 3.896 10.8616C2.8335 12.4199 2.8335 14.5902 2.8335 18.9323C2.8335 23.273 2.8335 25.4433 3.89458 27.0031C4.35358 27.6774 4.94291 28.2568 5.63141 28.7087C7.2195 29.75 9.43091 29.75 13.8523 29.75ZM17.0002 13.1367C13.7404 13.1367 11.0969 15.7307 11.0969 18.9309C11.0969 22.1326 13.7404 24.7279 17.0002 24.7279C20.2599 24.7279 22.9034 22.1326 22.9034 18.9323C22.9034 15.7307 20.2599 13.1367 17.0002 13.1367ZM17.0002 15.4544C15.0452 15.4544 13.4585 17.0113 13.4585 18.9323C13.4585 20.8519 15.0452 22.4088 17.0002 22.4088C18.9552 22.4088 20.5418 20.8519 20.5418 18.9323C20.5418 17.0113 18.9552 15.4544 17.0002 15.4544ZM23.6897 14.2956C23.6897 13.6552 24.2181 13.1367 24.8712 13.1367H26.4437C27.0953 13.1367 27.6252 13.6552 27.6252 14.2956C27.6222 14.6057 27.4962 14.9019 27.2749 15.1192C27.0537 15.3365 26.7552 15.4571 26.4451 15.4544H24.8712C24.7175 15.4559 24.565 15.4271 24.4225 15.3697C24.2799 15.3123 24.1501 15.2273 24.0404 15.1197C23.9307 15.0121 23.8432 14.8839 23.7831 14.7425C23.7229 14.6011 23.6911 14.4493 23.6897 14.2956Z" fill="black" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="row justify-content-center align-items-center text-center my-3">
                                    <span className="name fs18 b">
                                        {user.name}
                                        <span>
                                            <svg className='ms-2' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M20.625 19.5938H3.375C2.96016 19.5938 2.625 19.9289 2.625 20.3438V21.1875C2.625 21.2906 2.70937 21.375 2.8125 21.375H21.1875C21.2906 21.375 21.375 21.2906 21.375 21.1875V20.3438C21.375 19.9289 21.0398 19.5938 20.625 19.5938ZM6.03984 17.625C6.08672 17.625 6.13359 17.6203 6.18047 17.6133L10.1227 16.9219C10.1695 16.9125 10.2141 16.8914 10.2469 16.8563L20.182 6.92109C20.2038 6.89941 20.221 6.87366 20.2328 6.8453C20.2445 6.81695 20.2506 6.78656 20.2506 6.75586C20.2506 6.72516 20.2445 6.69477 20.2328 6.66642C20.221 6.63806 20.2038 6.61231 20.182 6.59063L16.2867 2.69297C16.2422 2.64844 16.1836 2.625 16.1203 2.625C16.057 2.625 15.9984 2.64844 15.9539 2.69297L6.01875 12.6281C5.98359 12.6633 5.9625 12.7055 5.95312 12.7523L5.26172 16.6945C5.23892 16.8201 5.24707 16.9493 5.28545 17.071C5.32384 17.1927 5.39132 17.3032 5.48203 17.393C5.63672 17.543 5.83125 17.625 6.03984 17.625Z" fill="black" />
                                            </svg>
                                        </span>
                                    </span>
                                    <div className="mt-2 fs14 b tGray">
                                        Role Admin
                                    </div>
                                    <div className="des mt-3 p-3">
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore neque earum debitis id similique maxime, provident veniam inventore nemo. Voluptatibus ea molestiae id quo molestias veniam maiores minima atque magnam?
                                    </div>
                                </div>

                                <hr />

                                <div className="tips-daily d-flex justify-content-center mt-2">
                                    <div className="tab position-relative">
                                        <div className="author fs14 tGray mb-1">
                                            ~ Leviathan
                                        </div>
                                        <div className="text fs14">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto corrupti facilis magni aliquam totam deleniti!
                                        </div>
                                        <div className="selengkapnya mt-3 fs16 b">
                                            <a href="">
                                                Selengkapnya
                                            </a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* form-input */}
                    <div className="formhide">
                        <form onSubmit={changeImage} action="" method='POST' encType='multipart/form-data'>
                            <input type="file" name="image" id="avatar" onChange={changeImage} />
                            <input type="submit" id='submit-avatar' hidden/>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

function DashboardSlice() {
    console.log('dashboard');
    return (
        <>
            <h1>Dashboard</h1>
        </>
    );
}
function HistorySlice() {
    return (
        <h1>History</h1>
    );
}
function SearchSlice() {
    return (
        <h1>Search</h1>
    );
}
function DeletedSlice() {
    return (
        <h1>Delete</h1>
    );
}
function AboutUs() {
    return (
        <h1>Delete</h1>
    );
}
function Community() {
    return (
        <h1>Delete</h1>
    );
}
function ExploreQoute() {
    return (
        <h1>Delete</h1>
    );
}
function Account() {
    return (
        <h1>Delete</h1>
    );
}

// function formFile(props){
//     const {handle} = props;
//     return (

//     )
// }
export default Dashboard;