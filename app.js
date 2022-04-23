const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// biến lấy ra ngoài 
const Player_Storage_Key = 'Key_Player'
const player = $('.player')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')// lấy kích thước cd
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playList = $('.playlist')
//song
const app = {
    currentIndex : 0,//vị trí hiện tại chỉ mục đầu tiên
    isPlaying : false,
    isRandom : false,
    isRepeat : false,
    config : JSON.parse(localStorage.getItem(Player_Storage_Key)) || {},
    songs : [
        {
        name: "Anh Ơi Tình Yêu Là Gì ? Là gì nhỉ :)))",
        singer: "Diệp Anh",
        path: "./asset/music/Anh Oi Tinh Yeu La Gi.mp3",
        image: "./asset/img/img1.jpg"
        },
        {
        name: "Anh Sẽ Mạnh Mẽ Yêu Em Nhaaa  ",
        singer: "Mr Siro",
        path: "./asset/music/AnhSeManhMeYeuEm-MrSiro.mp3",
        image:
                "./asset/img/img2.jpg"
        },
        {
        name: "Bức Tranh Từ Nước Mắttt",
        singer: "Mr Siro ",
        path:"./asset/music/BucTranhTuNuocMat.mp3",
        image: "./asset/img/img3.jpg"
        },
        {
        name: "Càng Níu Giữ Càng Dễ Mất Thôiii",
        singer: "Mr Siro",
        path: "./asset/music/Càng Níu Giữ Càng Dễ Mất.mp3",
        image:
            "./asset/img/img4.jpg"
        },
        {
        name: "Chạm Đáy Nỗi Đau Nàyyy",
        singer: "Erik",
        path: "./asset/music/Chạm Đáy Nỗi Đau.mp3",
        image:
            "./asset/img/img5.jpg"
        },
        {
        name: "Có Anh Ở Đây Rồi Đừng Sợ ",
        singer: "Anh Quân Idol",
        path:
            "./asset/music/CoAnhODayRoi.mp3",
        image:
            "./asset/img/img6.jpg"
        },
        {
        name: "Đã Từng Vô Giáaaa",
        singer: "Mr Siro",
        path: "./asset/music/DaTungVoGia-MrSiro-4891849.mp3",
        image:
            "./asset/img/img7.jpg"
        },
        {
            name: "Day Dứt Nỗi Đauuu -.-",
            singer: "Mr Siro",
            path: "./asset/music/DayDutNoiDau-MrSiro.mp3",
            image:
            "./asset/img/img8.jpg"
        },
        {
            name: "Dòng Thời Giannn",
            singer: "Hoàng Yến Chibi",
            path: "./asset/music/DongThoiGian.mp3",
            image:
            "./asset/img/img9.jpg"
        },
        {
            name: "Đừng Ai Nhắc Về Anh Ấy Nữa Mà",
            singer: "Bích Phương",
            path: "./asset/music/Dung-Ai-Nhac-Ve-Anh-Ay-Mr-Siro.mp3",
            image:
            "./asset/img/img10.jpg"
        },
        {
            name: "Dưới Những Cơn Mưaaa >.>",
            singer: "Mr Siro",
            path: "./asset/music/Duoi-Nhung-Con-Mua-Mr-Siro.mp3",
            image:
            "./asset/img/img11.jpg"
        },
        {
            name: "Em Say Anh Rồiii",
            singer: "Thương Võ",
            path: "./asset/music/Em Say Roi.mp3",
            image:
            "./asset/img/img1.jpg"
        },
        {
            name: "Giúp Anh Trả Lời Những Câu Hỏi ",
            singer: "Vương Anh Tú",
            path: "./asset/music/GiupAnhTraLoiNhungCauHoi.mp3",
            image:
            "./asset/img/img9.jpg"
        },
        {
            name: "Sống Như Những Đóa Hoaaa",
            singer: "Hoàng Yến Chibi",
            path: "./asset/music/SongNhuNhungDoaHoa.mp3",
            image:
            "./asset/img/img9.jpg"
        },
        {
            name: "Tìm Được Nhau Khó Thế Nàooo",
            singer: "Mr Siro",
            path: "./asset/music/Tim-Duoc-Nhau-Kho-The-Nao-Mr-Siro.mp3",
            image:
            "./asset/img/img9.jpg"
        },
        {
            name: "Tình Yêu Chắp Vá",
            singer: "Mr Siro",
            path: "./asset/music/Tinh-Yeu-Chap-Va-Mr-Siro.mp3",
            image:
            "./asset/img/img9.jpg"
        },
        {
            name: "Vô Hình Trong Tim Em",
            singer: "Mr Siro",
            path: "./asset/music/Vo-Hinh-Trong-Tim-Em-Piano-Version-Mr-Siro.mp3",
            image:
            "./asset/img/img9.jpg"
        },

    ],
    setconnfig :function (key , value){
        this.config[key] = value;
        localStorage.setItem(Player_Storage_Key , JSON.stringify( this.config))
    },
    // show các bài hát lên màn hình
    render: function(){
            const htmls = this.songs.map((song , index ) => {
                return `                
                <div class="song ${ index === this.currentIndex ? 'active' :'' } " data-index= "${index}">
                <div class="thumb" 
                    style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>               
                `
                
        })
        playList.innerHTML = htmls.join('');  
        },
  
    //Định nghĩa thuộc tính tên bài hát 
    defineProperties : function(){
        Object.defineProperty (this , 'currentSong', {
            get : function(){
                return this.songs[this.currentIndex]
            }
        })
    },
    //xử lí sự kiện trong DOM 
    handleEvent: function(){
            const cdWidth = cd.offsetWidth // lấy cd width chiều ngang hiện tại = offsetWidth chiều ngang 
            
            //xử lý cd quay 
            const cdThumbAnimate = cdThumb.animate([
                { transform : 'rotate(360deg)'  } // quay 360 độ

            ],{
                duration : 10000,//10000 giây
                iterations : Infinity // quay vô hạn
            })
            cdThumbAnimate.pause()
            //xử lý phóng to thu nhỏ cd
            document.onscroll = function(){
                const scrollTop = window.scrollY || document.documentElement.scrollTop
                // kéo lên kéo xuốn list và độ dài của list khi kéo lên kéo xuống
                const newcdWidth = cdWidth - scrollTop// độ dài cdWidth mới
                cd.style.width = newcdWidth> 0 ? newcdWidth + 'px' : 0
                cd.style.opacity = newcdWidth / cdWidth // mờ avt 
            }

            //xử lí nút Play
            playBtn.onclick = function(){
                if(app.isPlaying){
                    audio.pause()                              
                }
                else{
                audio.play()                         
            }
            //khi song được play 
            audio.onplay = function(){
                app.isPlaying = true
                player.classList.add('playing')
                cdThumbAnimate.play()
            }
            //khi song được pause
            audio.onpause = function(){
                app.isPlaying = false
                player.classList.remove('playing')
                cdThumbAnimate.pause() 
            }
            //Khi tiến đọ bài hát thay đổi
            audio.ontimeupdate= function(){
                if(audio.duration){
                    const progressPersent = Math.floor(audio.currentTime / audio.duration * 100)
                    progress.value = progressPersent
                }

            }
            // xử lí tua 
            progress.onchange = function(e){
                const seekTime = audio.duration / 100 *e.target.value
                audio.currentTime = seekTime
            }
            //xử lý nút next
            nextBtn.onclick = function(){
                if (app.isRandom){
                    app.PlayRandomSong()
                }else{
                        app.nextSong()
                }
                audio.play()  
                app.render()    
                app.scrollToActiveSong()                    
            }

            //xử lý nút prev
            prevBtn.onclick = function(){
                if (app.isRandom){
                    app.PlayRandomSong()
                }else{
                    app.prevSong()
                }                       
                audio.play()
                app.render()  
                app.scrollToActiveSong()
            }
            //xử lý nút Random
            randomBtn.onclick = function(e){
                app.isRandom = !app.isRandom
                app.setconnfig('isRandom ' ,app.isRandom)
                randomBtn.classList.toggle('active' , app.isRandom)                       
            }
              //xử lý lặp lại bài hát
            repeatBtn.onclick = function(e){
                app.isRepeat = !app.isRepeat
                app.setconnfig('isRepeat ' ,app.isRepeat)
                repeatBtn.classList.toggle('active' , app.isRepeat)   
            }
        
            //xử lý khi phát tới cuối audio
            audio.onended = function(){// chuyển bài tiếp theo 
                if(app.isRepeat){
                    audio.play()
                }else{
                    nextBtn.click()
                }
            }
            // lắng nghe click vào list danh sách
            playList.onclick = function (e){
                const songNode = e.target.closest('.song:not(.active)')
                // xử lí khi click vào song
                if(songNode || e.target.closest('.option')){
                    //xử lý click vào song
                    if(songNode){
                        app.currentIndex = Number(songNode.dataset.index)
                        app.loadCurrentSong()
                        app.render()
                        audio.play()
                    }
                    if(e.target.closest('.option')){

                    }
                }        
            }
        }  
    
                               
    }, 

    //lấy bài đang phát hiện lên có background màu hồng
    scrollToActiveSong : function(){
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior : 'smooth',
                block : 'nearest',
            })
        }, 300)
    },
    // load lấy ra tên bà hát avt vs audio
    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name// current song đã lấy từ defineProperties
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    scrollToActiveSong : function(){
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior : 'smooth',
                block : 'nearest',
            })
        }, 300)
    },
    //nextSong
    nextSong : function(){
        this.currentIndex++ 
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    loadconfig :function(){
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat

    },
    prevSong : function(){
        this.currentIndex-- 
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length -1 //trả về phần tử cuois mảng
        }
        this.loadCurrentSong()
    },
    PlayRandomSong : function(){
            let newIndex
        do{
            newIndex = Math.floor(Math.random() * this.songs.length)
        }while (newIndex === this.currentIndex)// điều kiể trùng lặp ko bằng cái cũ 
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    
                   
    start : function(){
        //gán cấu hình từ config vào ứng dụng
        this.loadconfig()
        //Định nghĩa thuộc tính cho Object
        this.defineProperties()

        //Lắng nghe Sự kiện cho DOM event
        this.handleEvent()
       
        //Tải thông tin bài hát vào giao diện(UI ) khi chạy 
        this.loadCurrentSong()
        
        //Render danh sách bài hát 
        this.render()
        //Hiển thì trạng thái random vs repeat  
        randomBtn.classList.toggle('active' , app.isRandom)   
        repeatBtn.classList.toggle('active' , app.isRepeat)   
}
}
app.start();